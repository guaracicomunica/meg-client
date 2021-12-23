import Link from 'next/link';

import styles from './styles.module.css';

export default function CardClass() {
  return (
    <div className={`${styles["card-class"]} card-style`}>
      <div className={styles.banner}>
        <img
          src="./images/banner-class.svg"
          alt="Banner da turma"
          className={styles.banner}
        />

        <div className={`${styles["info-class"]} p-4`}>
          <h4 className='text-uppercase'>Turma 01</h4>
          <h5>As aventuras dos Jovens Sonhadores</h5>
          <hr className='my-2 w-50' />
          <p>Profa. Marjorie Ramos</p>
        </div>

        <div className={styles["link-class"]}>
          Link da turma
        </div>
      </div>
      
      <div className={`p-4 ${styles["card-class-footer"]}`}>
        <hr className='mb-3 w-100' />
        <Link href="#">
          <a className='text-uppercase button button-blue py-3 px-5'>Acessar turma</a>
        </Link>
      </div>
    </div>
  );
}