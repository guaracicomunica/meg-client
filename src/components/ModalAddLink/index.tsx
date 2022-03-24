import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { FontContext } from '../../contexts/FontContext';

type ModalAddLinkType = {
  theme: string;
  show: boolean;
  onHide: () => void;
  addLink: (data: LinkForm) => void;
}

type LinkForm = {
  link: string;
}

export default function ModalAddLink(props: ModalAddLinkType) {
  const { font } = useContext(FontContext);
  const isLargeFont = font >= 2;

  const { register, handleSubmit, reset } = useForm({defaultValues: {
    link: "",
  }});
  const onSubmit = async (data: LinkForm) => handleAddLink(data);

  function handleAddLink(data: LinkForm) {
    if (data.link !== "") {
      props.addLink(data);
      props.onHide();
      reset({
        link: ""
      });
    }
    else {
      props.onHide();
    }
  }

  return (
    <Modal
      id="modal-add-link"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="modal-title"
      centered
      className={`modal-style bg-${props.theme} font-${font}`}
      backdrop="static"
      size={isLargeFont ? "lg" : ""}
    >
      <Modal.Header closeButton className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Adicionar link na missão
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <form autoComplete='off' id="add-link" method='post' onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-input w-100"
              id="link"
              placeholder="Link"
              {...register('link')}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-end p-4 border-top-0'>
        <button form="add-link" type="submit" className="modal-button">Adicionar</button>
      </Modal.Footer>
    </Modal>
  );
}