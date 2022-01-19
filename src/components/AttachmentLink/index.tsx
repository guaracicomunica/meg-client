import styles from './styles.module.css';

type AttachmentProps = {
  index: number;
  path: string;
}

export default function AttachmentLink(props: AttachmentProps) {
  return (
    <div className={`py-2 px-3 ${styles.attachment}`}>
      <img className='pr-3' src="/icons/link-gray.svg" alt="Arquivo para download" />
      <a target="_blank" href={props.path}>Acessar link {props.index}</a>
    </div>
  );
}