import { useContext } from "react";
import { Modal } from "react-bootstrap";
import { FontContext } from "../../contexts/FontContext";

type ModalPostGradesProps = {
  theme: string;
  allStudents: boolean;
  show: boolean;
  onHide: () => void;
}

export default function ModalPostGrades(props: ModalPostGradesProps) {
  const { font } = useContext(FontContext);
  const isLargeFont = font >= 3;

  return (
    <Modal
      id="modal-post-grades"
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
          Selecionar bimestre
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <div className="form-group">
          <label htmlFor="select">
            Ao selecionar o bimestre, o sistema irá publicar as notas do bimestre para {props.allStudents ? "todos os alunos da turma" : "o aluno escolhido"}.
          </label>
          <select
            name="unit"
            id="unit"
            className="select"
          >
            <option value="1">1º bimestre</option>
            <option value="2">2º bimestre</option>
            <option value="3">3º bimestre</option>
            <option value="4">4º bimestre</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-end p-4 border-top-0'>
        <button className="modal-button">Gerar boletim</button>
      </Modal.Footer>
    </Modal>
  );
}