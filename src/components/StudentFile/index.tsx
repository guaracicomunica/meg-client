import { compareAsc, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

import { ActivityStudent } from '../../types/Post';

import styles from './styles.module.css';

type StudentFileProps = {
  student: ActivityStudent;
  activityDeadline: string;
}

export default function StudentFile(props: StudentFileProps) {
  const { student } = props;

  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const deadline = parseISO(props.activityDeadline);
    const deliveryAt = parseISO(student.delivery_at);

    //Compare the two dates and return 1 if the deliveryAt is after the deadline
    if (compareAsc(deliveryAt, deadline) === 1) {
      setIsOverdue(true);
    }
    else {
      setIsOverdue(false);
    }
  }, [props]);

  return (
    <div className={`py-2 px-3 ${styles["card-file"]}`}>
      <div className={styles["info-user"]}>
        <img src={student.avatar ?? "/icons/user-gray.svg"} alt="Avatar do aluno" />
        <h5>{student.name}</h5>
      </div>
      {student.files.length > 0 ? (
        student.files.map((file, index) => {
          <a href={file} className={styles.file}>
            <img src="/icons/download.svg" />
            <span>Baixar arquivo {index}</span>
          </a>
        })
      ) : (
        <p>Nenhum arquivo enviado</p>
      )}
      
      <div className={isOverdue ? `${styles.status} ${styles.overdue}` : `${styles.status} ${styles["on-time"]}`}>
        {isOverdue ? "Entregue com atraso" : "Entregue no prazo"}
      </div>
    </div>
  );
}