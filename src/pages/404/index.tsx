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

      <main className={`center-content-column section theme-${theme}`}>
        <img
          className={theme === enumTheme.contrast ? `${styles["img-page"]} img-contrast-white` : styles["img-page"]}
          src="./icons/404.svg"
          alt="Página não encontrada"
        /> 
        <h1 className='title-blue-dark'>Ops... página não encontrada!</h1>
        <p className='text-blue-dark'>Clique <Link href="/">aqui</Link> para voltar à página inicial.</p>
      </main>
    </>
  );
}