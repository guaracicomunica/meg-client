import { useContext } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { FontContext } from '../../contexts/FontContext';
import { api } from '../../services/api';
import { StudentType } from '../../types/Participant';
import { options } from '../../utils/defaultToastOptions';

import styles from './styles.module.css';

type ModalShowStudentType = {
  theme: string;
  student: StudentType;
  show: boolean;
  onHide: () => void;
}

export default function ModalShowStudent(props: ModalShowStudentType) {
  const router = useRouter();
  const { 'meg.token': token } = parseCookies();
  const { student } = props;
  const { font } = useContext(FontContext);
  const modalSize = font >= 3 ? "modal-dialog-lg" : "modal-dialog-md";

  async function removeStudent() {
    try {
      const body = {
        classroom_id: Number(router.query.id),
        user_id: student.id
      }
      await api.post('classes/enrollment/cancellation', body, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(function (success) {
        toast.success("Estudante removido da turma com sucesso!", options);
        router.push(`/turmas/${router.query.id}/participantes`);
        props.onHide();
      });
    }
    catch (error) {
      const string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";

      if (!error.response) {
        // network error
        return toast.error(string, options);
      }
      switch (error.response.status) {
        case 401:
          return {
            redirect: {
              destination: '/sessao-expirada',
              permanent: false,
            }
          }
        
        case 400:
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : string, options);

        case 403:
          toast.error("Você não possui permissão para remover o aluno", options);

        case 500: 
          toast.error(string, options);
          break;

        default:
          toast.error(string, options);
          break;
      }
    }
  }

  return (
    <Modal
      id="modal-add-class-student"
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="modal-title"
      centered
      className={`modal-style bg-${props.theme} font-${font} ${modalSize}`}
      backdrop="static"
    >
      <Modal.Header closeButton className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Ver aluno
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={`${styles[`theme-${props.theme}`]} px-2`}>
          <div className={styles["info-user"]}>
            <img src={student.avatar ?? "/icons/user.svg"} alt="Imagem do aluno" />
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
              <span>{student.level ? `Nível ${student.level} - ${student.levelName}` : "Nível inicial"}</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-center my-3 w-100">
          <button onClick={removeStudent} className="button button-blue text-uppercase">Remover aluno da turma</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}