import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext, useEffect, useState } from 'react';
import { toast, ToastOptions } from 'react-toastify';

import { ThemeContext } from '../../contexts/ThemeContext';
import { enumTheme } from '../../enums/enumTheme';
import { api } from '../../services/api';
import { SkillClaimedType } from '../../types/StoreSkill';
import { genericMessageError, options } from '../../utils/defaultToastOptions';

import styles from './styles.module.css';

type CardSkillsProps = {
  skills: SkillClaimedType[];
}

export default function CardSkills(props: CardSkillsProps) {
  const router = useRouter();
  const { ['meg.token']: token } = parseCookies();
  const { theme } = useContext(ThemeContext);
  const isHighContrast = theme === enumTheme.contrast;
  const [claimedSkills, setClaimedSkills] = useState<SkillClaimedType[]>([]);
  const [unclaimedSkills, setUnclaimedSkills] = useState<SkillClaimedType[]>([]);

  const toastOptions: ToastOptions = {
    ...options,
    hideProgressBar: isHighContrast ? true : false,
    theme: isHighContrast ? "dark" : "light"
  }

  useEffect(() => {
    setClaimedSkills(props.skills?.filter(skill => skill.claimed === 1));
    setUnclaimedSkills(props.skills?.filter(skill => skill.claimed === 0));
  }, [props]);

  async function claimSkill(idSkill: number) {
    try {
      await api.post(`store/skills/${idSkill}/claim`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(function (success) {
        router.push('minha-conta', undefined, {scroll: false});
        toast.success(success.data.message, toastOptions);
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
          toast.error(error.response.data.errors.skill, toastOptions);
          break;

        case 403:
          toast.error(
            "Você não tem permissão para essa ação. Verifique se você faz parte da turma que possui essa habilidade.",
            toastOptions
          );
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
    <div className={`card-style p-4 mb-5 ${styles["card-skills"]} ${styles[`card-skills-${theme}`]}`}>
      <div className={`pb-2 border-bottom ${styles["skills-header"]}`}>
        <img src="/images/skills.svg" />
        <h4 className='text-center'>Suas habilidades especiais</h4>
      </div>

      {unclaimedSkills.length > 0 && unclaimedSkills.map(skill => {
        return (
          <div key={skill.id} className={`p-3 mt-3 ${styles.skill}`}>
            <img src="/icons/skill.svg" alt="Ícone da habilidade" />
            <div className={`${styles["skill-name"]} px-3`}>{skill.name}</div>
            <button className='pl-3 border-left' onClick={() => claimSkill(skill.id)}>Reivindicar</button>
          </div>
        )
      })}
      {claimedSkills.length > 0 && claimedSkills.map(skill => {
        return (
          <div key={skill.id} className={`p-3 mt-3 ${styles.skill} ${styles["skill-claimed"]}`}>
            <img src="/icons/skill.svg" alt="Ícone da habilidade" />
            <div className={`${styles["skill-name"]} px-3`}>{skill.name}</div>
            <span className='pl-3 border-left'>Reivindicada</span>
          </div>
        )
      })}
      {props.skills?.length === 0 && <p className='mt-3'>Nenhuma habilidade comprada.</p>}
    </div>
  );
}