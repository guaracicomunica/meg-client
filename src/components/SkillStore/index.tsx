import styles from './styles.module.css';

export default function SkillStore() {
  return (
    <div className={`card-style mb-5 order-2 order-xl-1 p-4 col-xl-6 ${styles["skill-store"]}`}>
      <div className={`pb-2 border-bottom ${styles["skills-header"]}`}>
        <img src="/images/skills-store.svg" />
        <h4>Loja de habilidades especiais</h4>
      </div>

      <div className={`pb-3 my-3 border-bottom ${styles["choose-class"]}`}>
        <h5 className={styles["title-gray"]}>Escolha a turma:</h5>

        <div className={styles["list-classes"]}>
          <div className={styles.banner}>
            <img src="/images/banner-class.svg" alt="Banner da turma" />
            <div className={`${styles["info-class"]} p-3`}>
              <h6 className='text-uppercase mb-0'>Turma 01</h6>
              <p>Lorem ipsum dolor</p>
              <hr className='my-1 w-50' />
              <small>Prof. Marjorie Ramos</small>
            </div>
          </div>

          <div className={styles.banner}>
            <img src="/images/banner-class.svg" alt="Banner da turma" />
            <div className={`${styles["info-class"]} p-3`}>
              <h6 className='text-uppercase mb-0'>Turma 01</h6>
              <p>Lorem ipsum dolor</p>
              <hr className='my-1 w-50' />
              <small>Prof. Marjorie Ramos</small>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-3 mt-3 ${styles.skill}`}>
        <img src="/icons/skill.svg" alt="Avatar do estudante" />
        <div className={`${styles["skill-name"]} px-3`}>Nome da habilidade aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
        <div className='px-3 border-left'>
          <div className={`py-1 px-3 ${styles.coins}`}>$ 22</div>
        </div>
      </div>

      <div className={`p-3 mt-3 ${styles.skill}`}>
        <img src="/icons/skill.svg" alt="Avatar do estudante" />
        <div className={`${styles["skill-name"]} px-3`}>Nome da habilidade</div>
        <div className='px-3 border-left'>
          <div className={`py-1 px-3 ${styles.coins}`}>$ 22</div>
        </div>
      </div>
    </div>
  );
}