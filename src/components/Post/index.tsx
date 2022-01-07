import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale';

import Comment from '../Comment';
import { PostType } from '../../types/Post';

import styles from './styles.module.css';

export default function Post(props: PostType) {
  const [isToday, setIsToday] = useState(false);
  const today = Date.now();

  useEffect(() => {
    const datePostString = format(parseISO(props.date), 'd/M/u');
    const dateTodayString = format(today, 'd/M/u');

    if (datePostString === dateTodayString) {
      setIsToday(true);
    }
  }, []);
  
  return (
    <div className={`${styles.post} mb-3 py-4 px-5`}>
      <div className={`${styles["post-creator"]} mb-4`}>
        <img src="/icons/user.svg" alt="Usuário" />
        <div className={styles["post-info"]}>
          <h5>{props.creator}</h5>
          <small>
            {isToday ? format(parseISO(props.date), "HH:mm") : format(parseISO(props.date), "d 'de' MMMM", {locale: ptBR})}
          </small>
        </div>
      </div>

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
                date={comment.date}
                body={comment.body}
              />
            );
          })}
        </div>
      </div>

      <div className={`${styles["add-comment"]} w-100`}>
        <img src="/icons/user-gray.svg" alt="Minha foto do perfil" style={{height: "3rem"}} />
        <form id="post-comment">
          <input
            className='form-input w-100'
            type="text"
            name="comment"
            placeholder='Adicionar comentário para a turma...'
          />
        </form>
      </div>
    </div>
  );
}