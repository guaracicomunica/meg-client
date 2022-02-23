import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";

import styles from './styles.module.css';

export default function AcessoNegado() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Acesso Negado</title>
      </Head>

      <main className="center-content section">
        <img className={styles["img-page"]} src="./icons/access-denied.svg" alt="Acesso negado" /> 
        <h1 className={`title-${theme}-primary`}>Ops... Você não possui permissão para realizar esta ação!</h1>
        <p className={`text-section-${theme}`}>Clique <Link href="/">aqui</Link> para voltar à página inicial.</p>
      </main>
    </>
  );
}