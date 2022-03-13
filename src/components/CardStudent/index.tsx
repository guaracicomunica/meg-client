import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { enumTheme } from '../../enums/enumTheme';
import { RoleUser } from '../../enums/enumRoleUser';
import { StudentType } from '../../types/Participant';
import ModalShowStudent from '../ModalShowStudent';

import styles from './styles.module.css';

type CardStudentProps = {
  student: StudentType;
}

export default function CardStudent(props: CardStudentProps) {
  const [showModalSeeStudent, setShowModalSeeStudent] = useState(false);
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isHighContrast = theme === enumTheme.contrast;
  const isTeacher = user?.role === RoleUser.teacher

  const { student } = props;

  return (
    <>
      <div className={`card-style p-4 ${styles[`card-student-${theme}`]}`}>
        <div className={styles["info-user"]}>
          <img src={student.avatar ?? "/icons/user.svg"} alt="Imagem do aluno" />
          <h5 style={!isHighContrast ? { color: 'var(--gray-title)' } : {}}>{student.name}</h5>
        </div>
        <div className={styles["score-user"]}>
          <div className={styles["points-user"]}>
            <img src="/icons/crown.svg" />
            <span>{student.points} pontos</span>
          </div>
          <div className={styles["level-user"]}>
            <img src="/icons/level.svg" />
            <span>{student.level ? `Nível ${student.level} - ${student.levelName}` : "Nível inicial"}</span>
          </div>
        </div>
        {isTeacher && (
          <div className="d-flex justify-content-center mt-4 w-100">
            <button
              onClick={() => setShowModalSeeStudent(true)}
              className="button button-blue-dark-outline text-uppercase"
            >Detalhar</button>
          </div>
        )}
      </div>

      <ModalShowStudent
        student={student}
        show={showModalSeeStudent}
        onHide={() => setShowModalSeeStudent(false)}
      />
    </>
    
  );
}