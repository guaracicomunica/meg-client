import Head from "next/head";
import Link from "next/link";

import styles from './styles.module.css';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Erro inesperado</title>
      </Head>

      <main className={`${styles.page} section`}>
        <img src="./icons/500.svg" alt="Erro inesperado" /> 
        <h1>Ops... erro inesperado!</h1>
        <p>Clique <Link href="/">aqui</Link> para voltar à página inicial.</p>
      </main>
    </>
    
  );
}