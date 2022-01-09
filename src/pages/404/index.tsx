import Head from "next/head";
import Link from "next/link";

import styles from './styles.module.css';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Página não encontrada</title>
      </Head>

      <main className={`${styles.page} section`}>
        <img src="./icons/404.svg" alt="Página não encontrada" /> 
        <h1>Ops... página não encontrada!</h1>
        <p>Clique <Link href="/">aqui</Link> para voltar à página inicial.</p>
      </main>
    </>
    
  );
}