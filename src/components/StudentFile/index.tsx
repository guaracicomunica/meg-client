import styles from './styles.module.css';

export default function StudentFile() {
  return (
    <div className={`py-2 px-3 ${styles["card-file"]}`}>
      <div className={styles["info-user"]}>
        <img src="/icons/user-gray.svg" alt="Avatar do aluno" />
        <h5>Fabiana Pereira Duarte</h5>
      </div>
      <a href="#" className={styles.file}>
        <img src="/icons/download.svg" />
        <span>Baixar arquivo</span>
      </a>
      <div className={`${styles.status} ${styles.pending}`}>
        Entregue com atraso
      </div>
    </div>
  );
}