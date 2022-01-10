import Head from "next/head";

import CardStudent from "../../../../components/CardStudent";
import CardTeacher from "../../../../components/CardTeacher";

import styles from './styles.module.css';

export default function Participantes() {
  return (
    <>
      <Head>
        <title>Participantes da turma 1</title>
      </Head>

      <main className="page-container">
        <h1 className="title-primary mb-5">Participantes da turma</h1>
        <h2 className="title-gray mb-4">Professores</h2>
        <div className={`mb-5 ${styles["list-teachers"]}`}>
          <CardTeacher />
          <CardTeacher />
          <CardTeacher />
          <CardTeacher />
        </div>
        <h2 className="title-gray mb-4">Alunos</h2>
        <div className={`mb-5 ${styles["list-students"]}`}>
          <CardStudent />
          <CardStudent />
          <CardStudent />
          <CardStudent />
          <CardStudent />
          <CardStudent />
          <CardStudent />
          <CardStudent />
          <CardStudent />
        </div>
      </main>
    </>
  );
}