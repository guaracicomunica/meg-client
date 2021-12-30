import { CommentType } from '../../types/Post';

import styles from './styles.module.css';

export default function Comment(props: CommentType) {
  return (
    <div className="mt-4">
      <div className={`${styles["comment-creator"]} mb-2`}>
        <img src="/icons/user-gray.svg" alt="Usuário" />
        <div className={styles["comment-info"]}>
          <h6>{props.commentCreator}</h6>
          <small>{props.date}</small>
        </div>
      </div>

      <div className={styles["comment-body"]}>{props.commentBody}</div>
    </div>
  );
}