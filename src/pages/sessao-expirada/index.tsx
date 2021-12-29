import Head from "next/head";
import Link from "next/link";

import styles from './styles.module.css';

export default function SessaoExpirada() {
  return (
    <>
      <Head>
        <title>Sessão expirada</title>
      </Head>

      <main className={`${styles.page} section`}>
        <img src="./images/session-expired.svg" alt="Sessão expirada" />
        <h1>Ops... Você está desconectado(a)!</h1>
        <p>Clique <Link href="/login">aqui</Link> para se conectar novamente.</p>
      </main>
    </>
    
  );
}