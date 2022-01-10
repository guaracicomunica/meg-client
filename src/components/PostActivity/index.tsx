import Link from 'next/link';

import styles from './styles.module.css';

type PostActivityProps = {
  id: number;
  title: string;
  teacher: string;
}

export default function PostActivity(props: PostActivityProps) {
  return (
    <div className={`${styles["post-activity"]} mb-3 py-4 px-5`}>
      <img src="/icons/activity-post.svg" alt="Atividade" />
      <h5>Prof. {props.teacher} postou uma nova atividade: <Link href="#">{props.title}</Link></h5>
    </div>
  );
}