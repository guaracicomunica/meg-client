import Link from 'next/link';
import { PostActivityType } from '../../types/Post';

import styles from './styles.module.css';

export default function PostActivity(props: PostActivityType) {
  return (
    <div className={`${styles["post-activity"]} mt-3 py-4 px-5`}>
      <img src="/icons/activity-post.svg" alt="Atividade" />
      <h5>Prof. {props.teacher} postou uma nova atividade: <Link href="#">{props.activityTitle}</Link></h5>
    </div>
  );
}