import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FontContext } from '../../contexts/FontContext';

import { api } from '../../services/api';
import { options } from '../../utils/defaultToastOptions';

type ModalAddClassType = {
  theme: string;
  show: boolean;
  onHide: () => void;
}

type EnrollmentForm = {
  code: string;
}

export default function ModalAddClass(props: ModalAddClassType) {
  const { 'meg.token': token } = parseCookies();
  const router = useRouter();
  const { font } = useContext(FontContext);
  const modalSize = font >= 3 ? "modal-dialog-lg" : "modal-dialog-md";

  const { register, handleSubmit, reset } = useForm({defaultValues: {
    code: "",
  }});
  const onSubmit = async (data: EnrollmentForm) => handleAddClass(data);

  async function handleAddClass(data: EnrollmentForm) {
    try {
      await api.post('classes/enrollment', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(function (success) {
        reset({
          code: ""
        });
        toast.success("Cadastro na turma realizado com sucesso!", options);
        router.push("/turmas");
        props.onHide();
      });
    }
    catch(error) {
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
          break;

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });
          break;

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
      className={`modal-style bg-${props.theme} font-${font} ${modalSize}`}
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="modal-title"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Entrar em uma nova turma
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <form autoComplete='off' id="enroll-class" method='post' onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-input w-100"
              id="code"
              placeholder="Código da turma"
              {...register('code')}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-end p-4 border-top-0'>
        <button form="enroll-class" type="submit" className="modal-button">Entrar</button>
      </Modal.Footer>
    </Modal>
  );
}