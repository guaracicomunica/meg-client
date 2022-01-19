import styles from './styles.module.css';

export default function CardSkills() {
  return (
    <div className={`card-style mb-5 order-2 order-xl-1 p-4 col-xl-6 ${styles["card-skills"]}`}>
      <div className={`pb-2 border-bottom ${styles["skills-header"]}`}>
        <img src="/images/skills.svg" />
        <h4>Suas habilidades especiais</h4>
      </div>

      <div className={`p-3 mt-3 ${styles.skill}`}>
        <img src="/icons/user.svg" alt="Avatar do estudante" />
        <div className={`${styles["skill-name"]} px-3`}>Nome da habilidade aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <button className='px-3 border-left'>Reivindicar</button>
      </div>
      <div className={`p-3 mt-3 ${styles.skill}`}>
        <img src="/icons/user.svg" alt="Avatar do estudante" />
        <div className={`${styles["skill-name"]} px-3`}>Nome da habilidade</div>
        <button className='px-3 border-left'>Reivindicar</button>
      </div>
    </div>
  );
}