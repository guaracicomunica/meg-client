import styles from "./styles.module.css";
import Link from 'next/link';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function Footer() {
  const { isAuthenticated } = useContext(AuthContext);

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
        {isAuthenticated 
          ?        
            <Link href="/minha-conta"> 
              <a className={`${styles["link-footer"]} mr-5`}>Minha conta</a>
            </Link> 
          : 
            <Link href="/login"> 
              <a className={`${styles["link-footer"]} mr-5`}>Entrar</a>
            </Link> 
        }
      </div>
    </footer>
  );
}