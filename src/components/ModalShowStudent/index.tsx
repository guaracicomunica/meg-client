import Link from 'next/link';
import { Modal } from 'react-bootstrap';
import { StudentType } from '../../types/Participant';

import styles from './styles.module.css';

type ModalShowStudentType = {
  student: StudentType;
  show: boolean;
  onHide: () => void;
}

export default function ModalShowStudent(props: ModalShowStudentType) {
  const { student } = props;

  return (
    <Modal
      id="modal-add-class-student"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="modal-title"
      centered
      className="modal-style"
      backdrop="static"
    >
      <Modal.Header closeButton className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Ver aluno
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="px-2">
          <div className={styles["info-user"]}>
            <img src={student.avatar} alt="Imagem do aluno" />
            <h5>{student.name}</h5>
          </div>
          <div className={styles["email-user"]}>
            <strong className='mr-2'>Email:</strong>
            <span>{student.email}</span>
          </div>
          <div className={styles["score-user"]}>
            <div className={styles["points-user"]}>
              <img src="/icons/crown.svg" />
              <span>{student.points} pontos</span>
            </div>
            <div className={styles["coins-user"]}>
              <img src="/icons/coins.svg" />
              <span>{student.coins} moedas</span>
            </div>
            <div className={styles["level-user"]}>
              <img src="/icons/level.svg" />
              <span>Nível {student.level} | {student.levelName}</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center my-3 w-100">
          <Link href="#">
            <a className="button button-blue text-uppercase">Remover aluno da turma</a>
          </Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
}