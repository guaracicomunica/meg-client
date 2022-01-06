import Link from "next/link";

import styles from './styles.module.css';

export default function CardStudent() {
  return (
    <div className={`card-style p-4 ${styles["card-student"]}`}>
      <div className={styles["info-user"]}>
        <img src="/icons/user-student.svg" alt="Imagem do aluno" />
        <h5>Higor do Nascimento Guilhermino</h5>
      </div>
      <div className={styles["score-user"]}>
        <div className={styles["points-user"]}>
          <img src="/icons/crown.svg" />
          <span>164 pontos</span>
        </div>
        <div className={styles["level-user"]}>
          <img src="/icons/level.svg" />
          <span>Nível 04 | Senhor Lobo</span>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4 w-100">
        <Link href="#">
          <a className="button button-blue-dark-outline text-uppercase">Detalhar</a>
        </Link>
      </div>
    </div>
  );
}