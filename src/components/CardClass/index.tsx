import Link from 'next/link';
import { useState } from 'react';

import ModalSeeClassCode from '../ModalSeeClassCode';
import { RoleUser } from '../../enums/enumRoleUser';
import { ClassStatus } from '../../enums/enumClassStatus';

import styles from './styles.module.css';

type CardClassType = {
  id: number;
  name: string;
  nickname: string;
  teacher: string;
  roleUser: number;
  bannerFile: string;
  code: string;
  status: number;
}

export default function CardClass(props: CardClassType) {
  const [showModalSeeCode, setShowModalSeeCode] = useState(false);

  return (
    <div className={`${styles["card-class"]} card-style`}>
      <div className={styles.banner}>
        <img
          src={`./images/${props.bannerFile}.svg`}
          alt="Banner da turma"
          className={props.status === ClassStatus.inactive ? styles["banner-inactive"] : ""}
        />

        <div className={`${styles["info-class"]} p-4`}>
          <h4 className='text-uppercase'>{props.name}</h4>
          <h5>{props.nickname}</h5>
          <hr className='my-2 w-50' />
          <p>Prof. {props.teacher}</p>
        </div>

        {props.status === ClassStatus.active && (
          <div className={styles["link-class"]} onClick={() => setShowModalSeeCode(true)}>
            Código da turma
          </div>
        )}
      </div>
      
      <div className={`p-4 ${styles["card-class-footer"]}`}>
        <hr className='mb-2 w-100' />
        <div className='w-100 d-flex justify-content-around flex-wrap'>
          {props.status === ClassStatus.inactive && (
            <Link href="#">
              <a className='text-uppercase button button-blue mt-2 py-3 px-4'>Voltar para edição</a>
            </Link>
          )}
          
          {props.status === ClassStatus.active && props.roleUser === RoleUser.student && (
            <Link href="#">
              <a className='text-uppercase button button-blue mt-2 py-3 px-4'>Acessar turma</a>
            </Link>
          )}

          {props.status === ClassStatus.active && props.roleUser === RoleUser.teacher && (
            <>
              <Link href="#">
                <a className='text-uppercase button button-blue mt-2 py-3 px-4'>Acessar turma</a>
              </Link>
              <Link href="#">
                <a className='text-uppercase button button-blue-dark-outline mt-2 py-3 px-4'>Editar turma</a>
              </Link>
            </>
          )}
        </div>

        <ModalSeeClassCode
          code={props.code}
          show={showModalSeeCode}
          onHide={() => setShowModalSeeCode(false)}
        />
      </div>
    </div>
  );
}