import { Modal } from 'react-bootstrap';

type ModalAddClassType = {
  show: boolean;
  onHide: () => void;
}

export default function ModalAddClass(props: ModalAddClassType) {
  return (
    <Modal
      id="modal-add-class-student"
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="modal-title"
      centered
      className="modal-style"
      backdrop="static"
    >
      <Modal.Header closeButton className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Entrar em uma nova turma
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-input w-100"
              id="code"
              placeholder="Código da turma"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-end p-4 border-top-0'>
        <button className="modal-button">Entrar</button>
      </Modal.Footer>
    </Modal>
  );
}