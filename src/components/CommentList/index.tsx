import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { parseCookies } from 'nookies';

import { api } from '../../services/api';
import { CommentType } from '../../types/Post';
import { options } from '../../utils/defaultToastOptions';

import styles from './styles.module.css';
import Comment from '../Comment';

type CommentListprops = {
  comments: CommentType[];
  postId: number;
  redirectTo: string;
}

type CommentForm = {
  body: string;
}

export default function CommentList(props: CommentListprops) {
  const { 'meg.token': token } = parseCookies();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm({defaultValues: {
    body: "",
  }});
  const onSubmit = async (data: CommentForm) => handleCreateComment(data);

  async function handleCreateComment(data: CommentForm) {
    try {
      await api.post('comments', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          'post_id': props.postId,
          'user_id': user.id
        }
      })
      .then(function (success) {
        reset({
          body: ""
        });
        toast.success("Comentário enviado com sucesso!", options);
        router.push(props.redirectTo, undefined, {scroll: false});
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
      <>
        <div className={`${styles["post-comments"]} my-4 py-4 w-100`}>
            <div className={styles["post-comments-title"]}>
                <img src="/icons/comments.svg" alt="Comentários da turma" style={{height: "1.25rem"}} />
                <h5>{props.comments?.length || 0} {props.comments?.length === 1 ? "Comentário" : "Comentários"} da turma</h5>
            </div>

            <div>
            
            {props.comments?.map((comment, index) => {
                return (
                    <Comment key={index} id={comment.id} creator={comment.creator} date={comment.date} body={comment.body}/>
                );
            })} 
            </div>
        </div>

        <div className={`${styles["add-comment"]} w-100`}>
            <img src="/icons/user-gray.svg" alt="Minha foto do perfil" style={{height: "3rem"}} />
            <form id="post-comment" method='post' onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    name={`comment-${props.postId}`}
                    id={`comment-${props.postId}`}
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
      </>
  );
}