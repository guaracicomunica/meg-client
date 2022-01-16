import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

type PostActivityProps = {
  id: number;
  title: string;
  teacher: string;
}

export default function PostActivity(props: PostActivityProps) {
  const router = useRouter();

  return (
    <div className={`${styles["post-activity"]} mb-3 py-4 px-5`}>
      <img src="/icons/activity-post.svg" alt="Missão" />
      <h5>
        Prof. {props.teacher} postou uma nova missão:
        <Link href={`/turmas/${router.query.id}/missoes/${props.id}`}>{props.title}</Link>
      </h5>
    </div>
  );
}