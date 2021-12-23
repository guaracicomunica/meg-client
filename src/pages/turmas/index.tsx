import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import CardClass from '../../components/CardClass';

import { getAPIClient } from '../../services/apiClient';

import styles from './styles.module.css';

export default function Turmas() {
  return (
    <>
      <Head>
        <title>Turmas</title>
      </Head>

      <main className={styles["classes-list"]}>
        <CardClass />
        <CardClass />

        <div className={styles["add-class"]}>
          <img src="./icons/plus.svg" alt="Adicionar turma" />
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['meg.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}