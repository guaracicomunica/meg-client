import { useState, useRef, FormEvent, useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { FontContext } from '../../contexts/FontContext';
import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './styles.module.css';

type ModalAddFileType = {
  show: boolean;
  onHide: () => void;
  addFile: (file: File) => void;
}

export default function ModalAddFile(props: ModalAddFileType) {
  const inputRef = useRef(null);
  const [fileNameSelected, setFileNameSelected] = useState("");
  const { font } = useContext(FontContext);
  const { theme, isHighContrast } = useContext(ThemeContext);
  const modalSize = font >= 3 ? "modal-dialog-lg" : "modal-dialog-md";

  function handleAddFile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const file = event.currentTarget.elements["file"].files[0];
    
    if (file === null) {
      props.onHide();
    }
    else {
      props.addFile(file);
      props.onHide();
      setFileNameSelected("");
    }
  }

  function getFileName() {
    if (inputRef.current.files.length > 0) {
      setFileNameSelected(inputRef.current.files[0].name);
    }
  }

  function closeModal() {
    props.onHide();
    setFileNameSelected("");
  }

  return (
    <Modal
      id="modal-add-file"
      show={props.show}
      onHide={closeModal}
      aria-labelledby="modal-title"
      centered
      className={`modal-style bg-${theme} font-${font} ${modalSize}`}
      backdrop="static"
    > 
      <Modal.Header closeButton className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Inserir arquivo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <form autoComplete='off' id="add-form" method='post' onSubmit={handleAddFile}>
          <div className={`${styles["input-add-file"]} input-file`} onChange={getFileName}>
            <input
              type="file"
              id="file"
              name="file"
              ref={inputRef}
            />
            <label htmlFor="file">
              <img
                src={isHighContrast ? "/icons/send-link-contrast.svg" : "/images/send-file.svg"}
                alt="Adicionar imagem"
              />
            </label>
            <span>Clique acima para adicionar um arquivo</span>
          </div>
        </form>

        {fileNameSelected && (
          <div className={styles["attachment"]}>
            <img src="/icons/file.svg" className={isHighContrast ? "img-contrast-white" : ""} />
            <span style={!isHighContrast ? { color: "var(--blue-light)" } : {}}>{fileNameSelected}</span>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-end p-4 border-top-0'>
        <button form="add-form" type="submit" className="modal-button">Anexar</button>
      </Modal.Footer>
    </Modal>
  );
}