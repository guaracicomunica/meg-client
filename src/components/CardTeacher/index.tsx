import styles from './styles.module.css';

export default function CardTeacher() {
  return (
    <div className={`card-style p-4 ${styles["card-teacher"]}`}>
      <img src="/icons/user.svg" alt="Imagem do professor" />
      <h5>Marjorie Ramos da Silva</h5>
    </div>
  );
}