import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import ModalSeeClassCode from '../ModalSeeClassCode';
import ModalCreateNewClass from '../ModalCreateNewClass';
import { RoleUser } from '../../enums/enumRoleUser';
import { ClassStatus } from '../../enums/enumClassStatus';
import { ClassCard } from '../../types/Class';
import styles from './styles.module.css';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function CardClass(props: ClassCard) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalSeeCode, setShowModalSeeCode] = useState(false);
  const [bannerURL, setBannerURL] = useState("");
  const { theme } = useContext(ThemeContext);
  const isClassroomActive = props.status === ClassStatus.active
  const isTeacher = props.roleUser === RoleUser.teacher
  const isStudent = props.roleUser === RoleUser.student

  useEffect(() => {
    if (props.banner !== null) {
      setBannerURL(`${props.banner}`);
    }
    else {
      setBannerURL("./images/banner-class.svg");
    }
  }, [props.banner]);

  return (
    <div className={`${styles["card-class"]} card-style`}>
      <div className="banner">
        <img
          src={bannerURL}
          alt="Banner da turma"
          className={!isClassroomActive ? "banner-inactive" : ""}
        />
        <div className="banner-content">
          <div className="info-class pt-4 pl-4 pr-0">
            <h4 className='text-uppercase title'>{props.name}</h4>
            <h5 className='nickname'>{props.nickname}</h5>
            <hr className='my-2 w-50' />
            <p className='teacher'>Prof. {props.teacher}</p>
          </div>

          {isClassroomActive && (
            <div className="link-class m-4" onClick={() => setShowModalSeeCode(true)}>
              Código da turma
            </div>
          )}
        </div>
      </div>
      
      <div className={`p-4 ${styles["card-class-footer"]}`}>
        <hr className='mb-2 w-100' />
        <div className='w-100 d-flex justify-content-around flex-wrap'>
          {!isClassroomActive && isTeacher && (
            <button
              onClick={() => setShowModalEdit(true)}
              className='text-uppercase button button-blue mt-2 py-3 px-4'
            >
              Voltar para edição
            </button>
          )}
          
          {isClassroomActive && isStudent && (
            <Link href={`/turmas/${props.id}`}>
              <a className='text-uppercase button button-blue mt-2 py-3 px-4'>Acessar turma</a>
            </Link>
          )}

          {isClassroomActive && isTeacher && (
            <>
              <Link href={`/turmas/${props.id}`}>
                <a className='text-uppercase button button-blue mt-2 py-3 px-4'>Acessar turma</a>
              </Link>
              <button
                onClick={() => setShowModalEdit(true)}
                className='text-uppercase button button-blue-dark-outline mt-2 py-3 px-4'
              >
                Editar turma
              </button>
            </>
          )}
        </div>

        <ModalSeeClassCode
          theme={theme}
          code={props.code}
          show={showModalSeeCode}
          onHide={() => setShowModalSeeCode(false)}
        />

        <ModalCreateNewClass
          theme={theme}
          type="edit"
          formData={{
            id: props.id,
            name: props.name,
            nickname: props.nickname,
            levels: props.levels,
            skills: props.skills,
            partners: props.partners,
            file: props.banner
          }}
          show={showModalEdit}
          onHide={() => setShowModalEdit(false)}
        />
      </div>
    </div>
  );
}