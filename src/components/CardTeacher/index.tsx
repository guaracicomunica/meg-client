import { useEffect, useState } from 'react';
import { TeacherType } from '../../types/Participant';
import styles from './styles.module.css';

type CardTeacherProps = {
  teacher: TeacherType;
}

export default function CardTeacher(props: CardTeacherProps) {
  const [bannerURL, setBannerURL] = useState("");
  
  useEffect(() => {
    if (props.teacher.avatar !== null) {
      let bannerFileName = props.teacher.avatar.replace("public", "storage");
      setBannerURL(`http://localhost:8000/${bannerFileName}`);
    }
    else {
      setBannerURL("/icons/user.svg");
    }
  }, []);

  return (
    <div className={`card-style p-4 ${styles["card-teacher"]}`}>
      <img src={bannerURL} alt="Imagem do professor" />
      <h5>{props.teacher.name}</h5>
    </div>
  );
}