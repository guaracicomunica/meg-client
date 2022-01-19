import { PostType } from '../../types/Post';
import { formatDate } from '../../utils/formatDate';
import styles from './styles.module.css';
import CommentList from '../CommentList';
import { useRouter } from 'next/router';

export default function Post(props: PostType) {
  const router = useRouter();
  const dateFormatted = formatDate(props.date);
  
  return (
    <div className={`${styles.post} mb-3 py-4 px-5`}>
      <div className={`${styles["post-creator"]} mb-4`}>
        <img src={props.creator.avatar ?? "/icons/user.svg"} alt="Usuário" />
        <div className={styles["post-info"]}>
          <h5>{props.creator?.name}</h5>
          <small>{dateFormatted}</small>
        </div>
      </div>

      <h5 className={styles["post-title"]} >{props.name}</h5>
      <div className={styles["post-body"]}>{props.body}</div>

      <CommentList postId={props.id} comments={props.comments} redirectTo={`/turmas/${router.query.id}`} />
    </div>
  );
}