import { useContext, useState } from 'react';
import { useRouter } from "next/router";
import { Nav, Row, Tab } from 'react-bootstrap';
import { parseCookies } from "nookies";
import { toast, ToastOptions } from "react-toastify";

import { ThemeContext } from '../../contexts/ThemeContext';
import { api } from "../../services/api";
import { SkillToBuy } from '../../types/StoreSkill';
import { genericMessageError, options } from "../../utils/defaultToastOptions";

import styles from './styles.module.css';

export default function SkillStore(props) {
  const router = useRouter();
  const { ['meg.token']: token } = parseCookies();
  const { theme, isHighContrast } = useContext(ThemeContext);
  const [skillsFiltered, setSkillsFiltered] = useState<SkillToBuy[]>([]);
  const [isClassSelected, setIsClassSelected] = useState(false);

  const toastOptions: ToastOptions = {
    ...options,
    hideProgressBar: isHighContrast ? true : false,
    theme: isHighContrast ? "dark" : "light"
  }

  function filterSkills(activeKey: string) {
    const filter = props.skills.filter(skill => skill.classroomId === Number(activeKey));
    setIsClassSelected(true);
    setSkillsFiltered(filter);
  }

  async function buySkill(id: number) {
    try {
      await api.post(`store/skills/${id}/buy`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(function (success) {
        router.push('minha-conta', undefined, {scroll: false});
        toast.success(success.data.message, toastOptions);
        const filter = skillsFiltered.filter(skill => skill.id !== id);
        setSkillsFiltered(filter);
      });
    }
    catch(error) {
      if (!error.response) {
        // network error
        return toast.error(genericMessageError, toastOptions);
      }
      switch (error.response.status) {
        case 401:
          return {
            redirect: {
              destination: '/sessao-expirada',
              permanent: false,
            }
          }
        
        case 400:
          toast.error(error.response.data.errors.coins, toastOptions);
          break;

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], toastOptions);
          });
          break;

        case 500:
          toast.error(genericMessageError, toastOptions);
          break;

        default:
          toast.error(genericMessageError, toastOptions);
          break;
      }
    }
  }

  return (
    <div className={`card-style p-4 ${styles["skill-store"]} ${styles[`skill-store-${theme}`]}`}>
      <div className={`pb-2 border-bottom ${styles["skills-header"]}`}>
        <img src="/images/skills-store.svg" />
        <h4 className='text-center'>Loja de habilidades especiais</h4>
      </div>

      <div className={`mt-3 ${styles["choose-class"]}`}>
        <Tab.Container id="classes-list" onSelect={filterSkills}>
          <Row className='flex-column'>
            <h5 className={styles["title-gray"]}>Escolha a turma:</h5>
            <Nav variant="pills" className={styles["list-classes"]}>
              {props.classes.map(classroom => {
                return (
                  <Nav.Item key={classroom.id}>
                    <Nav.Link className="p-0" bsPrefix={styles.classroom} eventKey={classroom.id}>
                      <div className={styles.banner}>
                        <img src={classroom.banner ?? "/images/banner-class.svg"} alt="Banner da turma" />
                        <div className={`${styles["info-class"]} p-3`}>
                          <h6 className='text-uppercase mb-1'>{classroom.name}</h6>
                          <span className='nickname'>{classroom.nickname}</span>
                          <hr className='my-1 w-50' />
                          <small>Prof. {classroom.teacher}</small>
                        </div>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                )
              })}
            </Nav>
          </Row>
          <Row>
            <Tab.Content className="w-100">
              {skillsFiltered.length > 0 && skillsFiltered.map(skill => {
                return (
                  <Tab.Pane eventKey={skill.classroomId} key={skill.id}>
                    <div className={`p-3 mt-3 ${styles.skill}`}>
                      <img src={skill.path ?? "/icons/skill.svg"} alt="Ícone da habilidade" />
                      <div className={`${styles["skill-name"]} px-3`}>{skill.name}</div>
                      <div className='pl-3 border-left'>
                        <div className={`py-1 px-3 ${styles.coins}`} onClick={() => buySkill(skill.id)}>
                          $ {skill.coins}
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>
                )
              })}
              {isClassSelected && skillsFiltered.length === 0 && (
                <p className='mt-3'>Não há habilidades disponíveis para compra.</p>
              )}
            </Tab.Content>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}