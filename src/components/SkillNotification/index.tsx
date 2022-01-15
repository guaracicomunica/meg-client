import styles from './styles.module.css';

export default function SkillNotification() {
  return (
    <div className={`card-style p-4 col-5 ${styles.notifications}`}>
      <div className={`border-bottom pb-3 ${styles["card-header"]}`}>
        <img src="/icons/notification.svg" alt="Notificações" />
        <h4>Notificações</h4>
      </div>
      <div className={`p-3 mt-3 ${styles.notification}`}>
        <img src="/icons/user-gray.svg" alt="Avatar do estudante" />
        <div className={`${styles["student-name"]} px-3 border-right`}>Júlia Ribeiro</div>
        <div className={`${styles["class"]} px-3 border-right`}>Turma 03</div>
        <div className={`${styles["skill"]} pl-3`}>
          <strong>Reivindicou a habilidade</strong>
          <span>20 pontos em sua nota mais baixa.</span>
        </div>
      </div>
      <div className={`p-3 mt-3 ${styles.notification}`}>
        <img src="/icons/user-gray.svg" alt="Avatar do estudante" />
        <div className={`${styles["student-name"]} px-3 border-right`}>Júlia Ribeiro</div>
        <div className={`${styles["class"]} px-3 border-right`}>Turma 03</div>
        <div className={`${styles["skill"]} pl-3`}>
          <strong>Reivindicou a habilidade</strong>
          <span>20 pontos em sua nota mais baixa.</span>
        </div>
      </div>
    </div>
    
  );
}