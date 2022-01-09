import Head from "next/head";
import Link from "next/link";

import styles from './styles.module.css';

export default function AcaoNegada() {
  return (
    <>
      <Head>
        <title>Acesso Negado</title>
      </Head>

      <main className={`${styles.page} section`}>
        <img src="./icons/access-denied.svg" alt="Acesso negado" /> 
        <h1>Ops... Você não possui permissão para realizar esta ação!</h1>
        <p>Clique <Link href="/">aqui</Link> para voltar à página inicial.</p>
      </main>
    </>
    
  );
}