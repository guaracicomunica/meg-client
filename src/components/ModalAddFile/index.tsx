import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import styles from './styles.module.css';

type ModalAddFileType = {
  show: boolean;
  onHide: () => void;
  addFile: (data: any) => void;
}

export default function ModalAddFile(props: ModalAddFileType) {
  const [fileNameSelected, setFileNameSelected] = useState("");
  const { register, handleSubmit, reset } = useForm({defaultValues: {
    file: null,
  }});
  const onSubmit = async (data: any) => handleAddFile(data);

  function handleAddFile(data: any) {
    if (data.file === null) {
      props.onHide();
    }
    else {
      props.addFile(data);
      props.onHide();
      reset({
        file: null
      });
      setFileNameSelected("");
    }
  }

  function getFileName(e: React.ChangeEvent<HTMLDivElement>) {
    if (e.currentTarget.querySelector("input").files.length > 0) {
      setFileNameSelected(e.currentTarget.querySelector("input").files[0].name);
    }
  }

  return (
    <Modal
      id="modal-add-file"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="modal-title"
      centered
      className="modal-style"
      backdrop="static"
    > 
      <Modal.Header closeButton className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Inserir arquivo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <form autoComplete='off' id="add-form" method='post' onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles["input-add-file"]} input-file`} onChange={getFileName}>
            <input
              type="file"
              id="file"
              name="file"
              {...register('file')}
            />
            <label htmlFor="file">
              <img src="/images/send-file.svg" alt="Adicionar imagem" />
            </label>
            <span>Clique acima para adicionar um arquivo</span>
          </div>
        </form>

        {fileNameSelected ? (
          <div className={styles["attachment"]}>
            <img src="/icons/file.svg" />
            <span>{fileNameSelected}</span>
          </div>
        ) : ""}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-end p-4 border-top-0'>
        <button form="add-form" type="submit" className="modal-button">Adicionar</button>
      </Modal.Footer>
    </Modal>
  );
}