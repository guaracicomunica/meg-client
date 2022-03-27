import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SkillClaimedType } from '../../types/StoreSkill';

import styles from './styles.module.css';

type CardSkillsProps = {
  skills: SkillClaimedType[];
}

export default function CardSkills(props: CardSkillsProps) {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`card-style p-4 mb-5 ${styles["card-skills"]} ${styles[`card-skills-${theme}`]}`}>
      <div className={`pb-2 border-bottom ${styles["skills-header"]}`}>
        <img src="/images/skills.svg" />
        <h4 className='text-center'>Suas habilidades especiais</h4>
      </div>

      {props.skills?.length > 0 && props.skills?.map(skill => {
        return (
          <div key={skill.id} className={`p-3 mt-3 ${styles.skill}`}>
            <img src="/icons/skill.svg" alt="Ícone da habilidade" />
            <div className={`${styles["skill-name"]} px-3`}>{skill.name}</div>
            <button className='pl-3 border-left'>Reivindicar</button>
          </div>
        )
      })}
      {props.skills?.length === 0 && <p className='mt-3'>Nenhuma habilidade comprada.</p>}
    </div>
  );
}