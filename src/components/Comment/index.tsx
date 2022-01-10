import { CommentType } from '../../types/Post';
import { formatDate } from '../../utils/formatDate';

import styles from './styles.module.css';

export default function Comment(props: CommentType) {
  const dateFormatted = formatDate(props.date);

  return (
    <div className="mt-4">
      <div className={`${styles["comment-creator"]} mb-2`}>
        <img src="/icons/user-gray.svg" alt="Usuário" />
        <div className={styles["comment-info"]}>
          <h6>{props.creator}</h6>
          <small>{dateFormatted}</small>
        </div>
      </div>

      <div className={styles["comment-body"]}>{props.body}</div>
    </div>
  );
}