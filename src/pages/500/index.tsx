import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";

import styles from './styles.module.css';

export default function Custom500() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Erro inesperado</title>
      </Head>

      <main className="center-content section">
        <img className={styles["img-page"]} src="./icons/500.svg" alt="Erro inesperado" /> 
        <h1 className={`title-${theme}-primary`}>Ops... erro inesperado!</h1>
        <p className={`text-${theme}`}>Clique <Link href="/">aqui</Link> para voltar à página inicial.</p>
      </main>
    </>
  );
}