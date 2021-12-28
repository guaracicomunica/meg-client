import { Modal } from 'react-bootstrap';

import styles from './styles.module.css';

type ModalSeeClassCodeType = {
  code: string;
  show: boolean;
  onHide: () => void;
}

export default function ModalSeeClassCode(props: ModalSeeClassCodeType) {
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
          Código da turma
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <div className={styles.title}>{props.code}</div>
      </Modal.Body>
    </Modal>
  );
}