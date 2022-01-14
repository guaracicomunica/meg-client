import { Modal } from "react-bootstrap";
import { DataFormTopic } from "../../types/Class";
import { toast } from 'react-toastify';
import { options } from '../../utils/defaultToastOptions';
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import { parseCookies } from 'nookies';

type ModalAddTopicProps = {
  classroom_id: number;
  show: boolean;
  onHide: () => void;
}

export default function ModalAddTopic(props: ModalAddTopicProps) {

  const { 'meg.token': token } = parseCookies();

  const { register, unregister, handleSubmit, reset, setValue } = useForm({defaultValues: {
    name: "",
    classroom_id: props.classroom_id
  }});
 

const onSubmit = async (data: DataFormTopic) => handleCreateTopic(data);

function generateFormData(data: DataFormTopic) {

  const form = new FormData();
  form.append('name', data.name);
  form.append('classroom_id', data.classroom_id.toString());

  return form;
}

async function handleCreateTopic(data: DataFormTopic) {
  try {
    const request = generateFormData(data);
    
    await api.post('topics', request, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    })
    .then(function (success) {
      toast.success("Tópico criada com sucesso!", options);
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

      case 422:
        let errors = error.response?.data.errors;
        Object.keys(errors).forEach((item) => {
          toast.warning(errors[item][0], options);
        });

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
      className="modal-style"
      backdrop="static"
    >
      <Modal.Header closeButton className='p-4 border-bottom-0'>
        <Modal.Title id="modal-title">
          Criar novo tópico
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-4'>
        <form 
        id='form-id-topic'
        onSubmit={handleSubmit(onSubmit)}
        method='post'
        encType='multipart/form-data'
        >
          <div className="form-group">
            <input
              type="text"
              className="form-control form-input w-100"
              id="name"
              name="name"
              {...register('name')}
              placeholder="Nome do tópico"
            />
          </div>
          
        </form>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-end p-4 border-top-0'>
        <button className="modal-button" type="submit" form='form-id-topic' >Salvar</button>
      </Modal.Footer>
    </Modal>
  );
}