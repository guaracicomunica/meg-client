import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ActivityType } from '../../types/Post';
import AttachmentFile from '../AttachmentFile';
import AttachmentLink from '../AttachmentLink';

import CommentList from '../CommentList';

import styles from './styles.module.css';

type CardActivityProps = {
  activity: ActivityType;
}

export default function CardActivity(props: CardActivityProps) {
  const router = useRouter();
  const { activity } = props;
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`${styles["card-activity"]} ${styles[`card-activity-${theme}`]} mb-4 p-4`}>
      <div
        className={styles["card-activity-header"]}
        onClick={() => setIsCardExpanded(!isCardExpanded)}
      >
        <img src="/icons/activity-post.svg" alt="Missão" />
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
              <div className="d-flex">
                {activity.attachments.length > 0 && activity.attachments.map((attachment, index) => {
                  if (attachment.is_external_link === 1) {
                    return <AttachmentLink key={index} index={index+1} path={attachment.path} />
                  }
                  else {
                    return <AttachmentFile key={index} index={index+1} path={attachment.path} />
                  }
                })}
              </div>
            </div>

            <CommentList postId={props.activity.id} comments={props.activity.comments} redirectTo={`/turmas/${router.query.id}/missoes`}/>  
          </div>

          <div className={styles["card-activity-footer"]}>
            <Link href={`/turmas/${router.query.id}/missoes/${props.activity.id}`}>
              <a className='button button-blue-dark-outline text-uppercase px-5'>Acessar a missão</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}