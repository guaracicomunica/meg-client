import router from 'next/router';
import { parseCookies } from 'nookies';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { RoleUser } from '../../enums/enumRoleUser';
import { enumTheme } from '../../enums/enumTheme';
import { api } from '../../services/api';
import { CommentType } from '../../types/Post';
import { genericMessageError, options } from '../../utils/defaultToastOptions';

import styles from './styles.module.css';

type CommentForm = {
  body: string;
  is_private: boolean;
  comment_id: number;
}

type PrivateCommentType = {
  id: number;
  creator: {
    name: string;
    avatar?: string;
  }
  date: string;
  is_private?: boolean;
  body: string;
  comments?: CommentType[];
  postId: number;
  redirectTo: string;
}

export default function PrivateComment(props: PrivateCommentType) {
  const { 'meg.token': token } = parseCookies();

  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const isTeacher = user?.role === RoleUser.teacher;
  const isHighContrast = theme === enumTheme.contrast;

  const { register, handleSubmit, reset } = useForm({defaultValues: {
    body: ""
  }});
  const onSubmit = async (data: CommentForm) => handleCreateComment(data);

  async function handleCreateComment(data: CommentForm) {
    data.is_private = true;
    data.comment_id = props.id;

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
      if (!error.response) {
        // network error
        return toast.error(genericMessageError, options);
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
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : genericMessageError, options);
          break;

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });
          break;

        case 500: 
          toast.error(genericMessageError, options);
          break;

        default:
          toast.error(genericMessageError, options);
          break;
      }
    }
   }

  return (
    <>
      <div className={`p-3 mt-2 w-100 ${styles["private-comment"]} ${styles[`theme-${theme}`]}`}>
        <div className='mb-3'>
          <h5 className='mb-1'>{props.creator?.name}</h5>
          <p>{props.body}</p>
        </div>
        
        {props?.comments?.length > 0 && (
          props.comments.map((comment, index) => {   
            return (           
              <div className='mb-3' key={index}>    
                <h5 className='mb-1'>{comment.creator.name}</h5>
                <p>{comment.body}</p>
              </div>
            )
          })
        )}

        {isTeacher && (
          <div className={`border-top pt-1 ${styles.response}`}>
            <form method="post" onSubmit={handleSubmit(onSubmit)} >
              <h5 className='my-2'>Responder:</h5>
              <textarea
                name={`response-private-comment-${props.id}`}
                id={`response-private-comment-${props.id}`}
                rows={4}
                placeholder="Responda ao comentário privado..."
                className='textarea w-100 p-3'
                {...register('body')}
              ></textarea>
              <button type="submit" >
                <img src="/icons/send.svg" alt="Enviar" className={isHighContrast ? "img-contrast-white": ""} />
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}