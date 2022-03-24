import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { FontContext } from '../../contexts/FontContext';

import styles from './styles.module.css';

type ModalSeeClassCodeType = {
  theme: string;
  code: string;
  show: boolean;
  onHide: () => void;
}

export default function ModalSeeClassCode(props: ModalSeeClassCodeType) {
  const { font } = useContext(FontContext);
  const isLargeFont = font >= 3;

  return (
    <Modal
      id="modal-add-class-student"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="modal-title"
      size={isLargeFont ? "lg" : ""}
      centered
      className={`modal-style bg-${props.theme} font-${font}`}
      backdrop="static"
    >
      <Modal.Header closeButton className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Código da turma
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <div className={styles[`code-class-${props.theme}`]}>{props.code}</div>
      </Modal.Body>
    </Modal>
  );
}