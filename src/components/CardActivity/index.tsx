import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ActivityType } from '../../types/Post';

import Comment from '../Comment';

import styles from './styles.module.css';

type CardActivityProps = {
  activity: ActivityType;
}

export default function CardActivity(props: CardActivityProps) {
  const router = useRouter();
  const { activity } = props;
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  return (
    <div className={`${styles["card-activity"]} mb-4 p-4`}>
      <div
        className={styles["card-activity-header"]}
        onClick={() => setIsCardExpanded(!isCardExpanded)}
      >
        <img src="/icons/activity-post.svg" alt="Atividade" />
        <div className={styles["info-activity"]}>
          <h5>{activity.name}</h5>
          <div className={styles["activity-deadline"]}>
            Data de entrega: {format(parseISO(activity.deadline), "dd/MM/yyyy 'até' HH:mm")}
          </div>
        </div>
      </div>
      {isCardExpanded && (
        <>
          <div className={styles["card-activity-body"]}>
            <div className="d-flex py-2">
              <div className={styles["activity-grade"]}>Nota: {activity.points} pontos</div>
              <div className={styles["activity-score"]}>{activity.xp} XP | {activity.coins} moedas</div>
            </div>
            <div className={`py-2 ${styles["activity-content"]}`}>
              <p>{activity.body}</p>
              <div></div>
            </div>
            <div className={`${styles["post-comments"]} my-4 py-4`}>
              <div className={styles["post-comments-title"]}>
                <img src="/icons/comments.svg" alt="Comentários da turma" style={{height: "1.25rem"}} />
                <h5>{activity?.comments.length} {activity?.comments.length === 1 ? "Comentário" : "Comentários"} da turma</h5>
              </div>

              <div>
                {activity?.comments.map(comment => {
                  return (
                    <Comment
                      key={comment.id}
                      id={comment.id}
                      creator={comment.creator}
                      date={comment.date}
                      body={comment.body}
                    />
                  )
                })}
              </div>

              <div className={`${styles["add-comment"]} mt-4 w-100`}>
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
          </div>

          <div className={styles["card-activity-footer"]}>
            <Link href={`/turmas/${router.query.id}/atividades/${props.activity.id}`}>
              <a className='button button-blue-dark-outline text-uppercase px-5'>Acessar a atividade</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}