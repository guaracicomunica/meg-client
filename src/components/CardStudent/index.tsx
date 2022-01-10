import { useEffect, useState } from 'react';
import { StudentType } from '../../types/Participant';
import ModalShowStudent from '../ModalShowStudent';

import styles from './styles.module.css';

type CardStudentProps = {
  student: StudentType;
}

export default function CardStudent(props: CardStudentProps) {
  const [showModalSeeStudent, setShowModalSeeStudent] = useState(false);
  const [bannerURL, setBannerURL] = useState("");

  const { student } = props;
  
  useEffect(() => {
    if (student.avatar !== null) {
      let bannerFileName = student.avatar.replace("public", "storage");
      setBannerURL(`http://localhost:8000/${bannerFileName}`);
    }
    else {
      setBannerURL("/icons/user-student.svg");
    }
  }, []);

  return (
    <>
      <div className="card-style p-4">
        <div className={styles["info-user"]}>
          <img src={bannerURL} alt="Imagem do aluno" />
          <h5>{student.name}</h5>
        </div>
        <div className={styles["score-user"]}>
          <div className={styles["points-user"]}>
            <img src="/icons/crown.svg" />
            <span>{student.points} pontos</span>
          </div>
          <div className={styles["level-user"]}>
            <img src="/icons/level.svg" />
            <span>Nível {student.level} | {student.levelName}</span>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-4 w-100">
          <button
            onClick={() => setShowModalSeeStudent(true)}
            className="button button-blue-dark-outline text-uppercase"
          >Detalhar</button>
        </div>
      </div>

      <ModalShowStudent
        student={{
          ...student,
          avatar: bannerURL
        }}
        show={showModalSeeStudent}
        onHide={() => setShowModalSeeStudent(false)}
      />
    </>
    
  );
}