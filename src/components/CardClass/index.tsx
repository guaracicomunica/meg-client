import Link from 'next/link';

import { RoleUser } from '../../enums/enumRoleUser';

import styles from './styles.module.css';

type CardClassType = {
  id: number;
  name: string;
  nickname: string;
  teacher: string;
  roleUser: number;
  bannerFile: string;
  code: string;
}

export default function CardClass(props: CardClassType) {
  return (
    <div className={`${styles["card-class"]} card-style`}>
      <div className={styles.banner}>
        <img
          src={`./images/${props.bannerFile}.svg`}
          alt="Banner da turma"
          className={styles.banner}
        />

        <div className={`${styles["info-class"]} p-4`}>
          <h4 className='text-uppercase'>{props.name}</h4>
          <h5>{props.nickname}</h5>
          <hr className='my-2 w-50' />
          <p>Prof. {props.teacher}</p>
        </div>

        <div className={styles["link-class"]}>
          Código da turma
        </div>
      </div>
      
      <div className={`p-4 ${styles["card-class-footer"]}`}>
        <hr className='mb-2 w-100' />
        <div className='w-100 d-flex justify-content-around flex-wrap'>
          <Link href="#">
            <a className='text-uppercase button button-blue mt-2 py-3 px-4'>Acessar turma</a>
          </Link>
          {props.roleUser === RoleUser.teacher && (
            <Link href="#">
              <a className='text-uppercase button button-blue-dark-outline mt-2 py-3 px-4'>Editar turma</a>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}