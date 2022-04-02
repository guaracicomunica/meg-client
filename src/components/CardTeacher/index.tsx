import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { TeacherType } from '../../types/Participant';

import styles from './styles.module.css';

type CardTeacherProps = {
  teacher: TeacherType;
}

export default function CardTeacher(props: CardTeacherProps) {
  const { theme, isHighContrast } = useContext(ThemeContext);

  return (
    <div className={`card-style p-4 ${styles["card-teacher"]}`}>
      <img src={props.teacher.avatar ?? "/icons/user.svg"} alt="Imagem do professor" />
      <h5 style={!isHighContrast ? { color: 'var(--gray-title)' } : {}}>{props.teacher.name}</h5>
    </div>
  );
}