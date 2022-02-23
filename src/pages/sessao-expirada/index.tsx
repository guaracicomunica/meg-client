import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";

import styles from './styles.module.css';

export default function SessaoExpirada() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Sessão expirada</title>
      </Head>

      <main className="center-content section">
        <img className={styles["img-page"]} src="./images/session-expired.svg" alt="Sessão expirada" />
        <h1 className={`title-${theme}-primary`}>Ops... Você está desconectado(a)!</h1>
        <p className={`text-section-${theme}`}>Clique <Link href="/login">aqui</Link> para se conectar novamente.</p>
      </main>
    </>
  );
}