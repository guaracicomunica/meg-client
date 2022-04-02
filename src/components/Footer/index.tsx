import styles from "./styles.module.css";
import Link from 'next/link';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import AccessibilityFooter from "../AccessibilityFooter";

export function Footer() {
  const { isAuthenticated } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <footer className={`${styles.footer} ${styles[`footer-${theme}`]}`}>
      <AccessibilityFooter/>
      <hr className={styles["border-footer"]} />
      <div className="row flex-wrap py-4 justify-content-center">
        <Link href="/"> 
          <a className={`${styles["link-footer"]} mx-4`}>Início</a>
        </Link>
        <Link href="/turmas"> 
          <a className={`${styles["link-footer"]} mx-4`}>Turmas</a>
        </Link>
        {isAuthenticated && (
          <Link href="/minha-conta"> 
            <a className={`${styles["link-footer"]} mx-4`}>Minha conta</a>
          </Link> 
        )}
        {!isAuthenticated && (
          <Link href="/login"> 
            <a className={`${styles["link-footer"]} mx-4`}>Entrar</a>
          </Link>
        )}
      </div>
    </footer>
  );
}