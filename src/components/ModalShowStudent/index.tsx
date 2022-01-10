import Link from 'next/link';
import { Modal } from 'react-bootstrap';

import styles from './styles.module.css';

type ModalShowStudentType = {
  show: boolean;
  onHide: () => void;
}

export default function ModalShowStudent(props: ModalShowStudentType) {
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
        <div className="card-style px-2">
          <div className={styles["info-user"]}>
            <img src="/icons/user-student.svg" alt="Imagem do aluno" />
            <h5>Higor do Nascimento Guilhermino</h5>
          </div>
          <div className={styles["email-user"]}>
            <strong className='mr-2'>Email:</strong>
            <span>higornascimento@gmail.com</span>
          </div>
          <div className={styles["score-user"]}>
            <div className={styles["points-user"]}>
              <img src="/icons/crown.svg" />
              <span>164 pontos</span>
            </div>
            <div className={styles["coins-user"]}>
              <img src="/icons/coins.svg" />
              <span>22 moedas</span>
            </div>
            <div className={styles["level-user"]}>
              <img src="/icons/level.svg" />
              <span>Nível 04 | Senhor Lobo</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center mt-4 w-100">
            <Link href="#">
              <a className="button button-blue text-uppercase">Remover aluno da turma</a>
            </Link>
          </div>
      </Modal.Footer>
    </Modal>
  );
}