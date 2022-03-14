import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { enumTheme } from '../../enums/enumTheme';
import styles from './styles.module.css';

type AttachmentProps = {
  index: number;
  path: string;
}

export default function AttachmentFile(props: AttachmentProps) {
  const { theme } = useContext(ThemeContext);
  const isHighContrast = theme === enumTheme.contrast;

  return (
    <div className={`py-2 px-3 ${styles.attachment} ${styles[`attachment-${theme}`]}`}>
      <img
        className={isHighContrast ? "img-contrast-white" : ""}
        src="/icons/file-gray.svg"
        alt="Arquivo para download"
      />
      <a target="_blank" className="pl-3" href={props.path}>Baixar arquivo {props.index}</a>
    </div>
  );
}