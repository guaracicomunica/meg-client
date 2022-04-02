import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './styles.module.css';

type AttachmentProps = {
  index: number;
  path: string;
}

export default function AttachmentLink(props: AttachmentProps) {
  const { theme, isHighContrast } = useContext(ThemeContext);

  return (
    <div className={`py-2 px-3 ${styles.attachment} ${styles[`attachment-${theme}`]}`}>
      <img
        className={isHighContrast ? "img-contrast-white" : ""}
        src="/icons/link-gray.svg"
        alt="Link externo"
      />
      <a target="_blank" href={props.path} className="pl-3">Acessar link {props.index}</a>
    </div>
  );
}