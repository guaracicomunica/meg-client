import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { parseCookies } from 'nookies';

import Comment from '../Comment';
import { api } from '../../services/api';
import { PostType } from '../../types/Post';
import { formatDate } from '../../utils/formatDate';
import { options } from '../../utils/defaultToastOptions';

import styles from './styles.module.css';

type CommentForm = {
  body: string;
}

export default function Post(props: PostType) {
  const { 'meg.token': token } = parseCookies();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({defaultValues: {
    body: "",
  }});
  const onSubmit = async (data: CommentForm) => handleCreateClass(data);

  async function handleCreateClass(data: CommentForm) {
    try {
      await api.post('comments', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          'post_id': props.id,
          'user_id': user.id
        }
      })
      .then(function (success) {
        reset({
          body: ""
        });
        toast.success("Comentário enviado com sucesso!", options);
        router.push(`/turmas/${router.query.id}`, undefined, {scroll: false});
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

  const dateFormatted = formatDate(props.date);
  
  return (
    <div className={`${styles.post} mb-3 py-4 px-5`}>
      <div className={`${styles["post-creator"]} mb-4`}>
        <img src="/icons/user.svg" alt="Usuário" />
        <div className={styles["post-info"]}>
          <h5>{props.creator}</h5>
          <small>{dateFormatted}</small>
        </div>
      </div>

      <h5 className={styles["post-title"]} >{props.name}</h5>
      <div className={styles["post-body"]}>{props.body}</div>

      <div className={`${styles["post-comments"]} my-4 py-4`}>
        <div className={styles["post-comments-title"]}>
          <img src="/icons/comments.svg" alt="Comentários da turma" style={{height: "1.25rem"}} />
          <h5>{props.comments?.length || 0} {props.comments?.length === 1 ? "Comentário" : "Comentários"} da turma</h5>
        </div>

        <div>
          
           {props.comments?.map(comment => {
            return (
              <Comment
                key={comment.id}
                id={comment.id}
                creator={comment.creator}
                date={comment?.date}
                body={comment.body}
              />
            );
          })} 
        </div>
      </div>

      <div className={`${styles["add-comment"]} w-100`}>
        <img src="/icons/user-gray.svg" alt="Minha foto do perfil" style={{height: "3rem"}} />
        <form id="post-comment" method='post' onSubmit={handleSubmit(onSubmit)}>
          <textarea
            name={`comment-${props.id}`}
            id={`comment-${props.id}`}
            placeholder="Faça um comentário..."
            className="textarea w-100 p-2"
            rows={2}
            {...register('body')}
          ></textarea>
          <button type="submit" className={styles["btn-create-comment"]}>
            <img src="/icons/send.svg" alt="Enviar" />
          </button>
        </form>
      </div>
    </div>
  );
}