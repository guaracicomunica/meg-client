import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";
import { enumTheme } from "../../enums/enumTheme";

import styles from './styles.module.css';

export default function Custom404() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Página não encontrada</title>
      </Head>

      <main className={`${styles.page} center-content section`}>
        <img
          className={theme === enumTheme.contrast ? "img-contrast-white" : ""}
          src="./icons/404.svg"
          alt="Página não encontrada"
        /> 
        <h1 className={`title-${theme}-primary`}>Ops... página não encontrada!</h1>
        <p className={`text-section-${theme}`}>Clique <Link href="/">aqui</Link> para voltar à página inicial.</p>
      </main>
    </>
  );
}