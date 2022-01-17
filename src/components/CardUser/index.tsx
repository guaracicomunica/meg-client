import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { RoleUser } from '../../enums/enumRoleUser';

import styles from './styles.module.css';

export default function CardUser() {
  const { user, logoff } = useContext(AuthContext);
  
  return (
    <div className={`card-style p-4 col-4 ${styles["card-user"]}`}>
      <div className={styles["user-img"]}>
        <div className={styles["edit-user-img"]}>
          <img src="/icons/edit.svg" />
        </div>
        <img src="/icons/user-gray.svg" alt="Minha foto de perfil" />
      </div>
      <div className={`${styles["user-info"]} my-4 pb-2 border-bottom`}>
        <h4>{user?.name}</h4>
        <p><strong className='mr-2'>Email:</strong>{user?.email}</p>
        {user?.role === RoleUser.student && (
          <div className={`${styles.coins} mb-2`}>
            <img src="/icons/coins.svg" alt="Moedas" />
            <span>22 moedas</span>
          </div>
        )}
      </div>
      <button
        onClick={logoff}
        className='button button-blue-dark-outline text-uppercase'
      >Sair da conta</button>
    </div>
  );
}