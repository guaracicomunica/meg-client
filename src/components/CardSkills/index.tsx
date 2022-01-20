import { SkillClaimedType } from '../../types/StoreSkill';

import styles from './styles.module.css';

type CardSkillsProps = {
  skills: SkillClaimedType[];
}

export default function CardSkills(props: CardSkillsProps) {
  return (
    <div className={`card-style mb-5 order-2 order-xl-1 p-4 col-xl-6 ${styles["card-skills"]}`}>
      <div className={`pb-2 border-bottom ${styles["skills-header"]}`}>
        <img src="/images/skills.svg" />
        <h4>Suas habilidades especiais</h4>
      </div>

      {props.skills.length > 0 ? props.skills.map(skill => {
        return (
          <div key={skill.id} className={`p-3 mt-3 ${styles.skill}`}>
            <img src="/icons/skill.svg" alt="Avatar da habilidade" />
            <div className={`${styles["skill-name"]} px-3`}>{skill.name}</div>
            <button className='px-3 border-left'>Reivindicar</button>
          </div>
        )
      }) : (
        <p className='mt-3'>Nenhuma habilidade comprada.</p>
      )}
    </div>
  );
}