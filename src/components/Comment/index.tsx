import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { CommentType } from '../../types/Post';
import { formatDate } from '../../utils/formatDate';

import styles from './styles.module.css';

export default function Comment(props: CommentType) {
  const { theme } = useContext(ThemeContext);
  const dateFormatted = props.date != null ? formatDate(props.date) : null;

  return (
    <div className={`mt-4 ${styles[`comment-${theme}`]}`}>
      <div className={`${styles["comment-creator"]} mb-2`}>
        <img src={props.creator?.avatar ?? "/icons/user.svg"} alt="Usuário" />
        <div className={styles["comment-info"]}>
          <h6>{props.creator?.name}</h6>
          <small>{dateFormatted}</small>
        </div>
      </div>

      <div className={styles["comment-body"]}>{props.body}</div>
    </div>
  );
}