import styles from "./styles.module.css";
import Link from 'next/link';

export function Footer() {
  return (
    <footer>
      <hr className={styles["border-footer"]} />

      <div className="row flex-wrap p-4 justify-content-center">
        <Link href="/"> 
          <a className={`${styles["link-footer"]} mr-5`}>Início</a>
        </Link>
        <Link href="/turmas"> 
          <a className={`${styles["link-footer"]} mr-5`}>Turmas</a>
        </Link>
        <Link href="/atividades"> 
          <a className={`${styles["link-footer"]} mr-5`}>Atividades</a>
        </Link>
        <Link href="/minha-conta"> 
          <a className={`${styles["link-footer"]} mr-5`}>Minha conta</a>
        </Link>
      </div>
    </footer>
  );
}