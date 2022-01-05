import { Modal } from "react-bootstrap";

type ModalAddTopicProps = {
  show: boolean;
  onHide: () => void;
}

export default function ModalAddTopic(props: ModalAddTopicProps) {
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
          Criar novo tópico
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-input w-100"
              id="name"
              placeholder="Nome do tópico"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-end p-4 border-top-0'>
        <button className="modal-button">Salvar</button>
      </Modal.Footer>
    </Modal>
  );
}