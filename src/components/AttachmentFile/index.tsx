import styles from './styles.module.css';

type AttachmentProps = {
  index: number;
  path: string;
}

export default function AttachmentFile(props: AttachmentProps) {
  return (
    <div className={`py-2 px-3 ${styles.attachment}`}>
      <img className='pr-3' src="/icons/file-gray.svg" alt="Arquivo para download" />
      <a target="_blank" href={props.path}>Baixar arquivo {props.index}</a>
    </div>
  );
}