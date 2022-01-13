import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import StudentFile from '../../../../../../components/StudentFile';

import { getAPIClient } from '../../../../../../services/apiClient';

import styles from './styles.module.css';

export default function Corrigir() {
  return (
    <>
      <Head>
        <title>Corrigir atividade</title>
      </Head>

      <main className={styles["page-layout"]}>
        <div className={`card-style p-4 ${styles["assign-grades"]}`}>
          <div className={styles["assign-grades-all"]}>
            <h5 className='mb-3'>Atribuir nota para todos os alunos</h5>
            <form method='post' id="assign-grade-to-all-students">
              <div className='form-row'>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
                <button
                  type='submit'
                  form="assign-grade-to-all-students"
                  className='button button-blue-dark-outline text-uppercase ml-2'
                >Atribuir</button>
              </div>
            </form>
          </div>

          <hr className='my-4 w-100' />
          
          <div className={styles["assign-grades-each-one"]}>
            <form method='post' id="assign-grades-to-each-student">
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <div className={`${styles["input-grade"]} mb-3`}>
                <div className={`py-2 px-3 ${styles["student-info"]}`}>
                  <img src='/icons/user-gray.svg' alt="Avatar do aluno" />
                  <h6>Fabiana Pereira Duarte</h6>
                </div>
                <input
                  type="number"
                  name="grade"
                  id="grade"
                  className='form-control form-input'
                  placeholder='0/100'
                />
              </div>
              <hr className='mt-1 mb-4 w-100' />
              <button
                type='submit'
                form="assign-grades-to-each-student"
                className="button button-blue text-uppercase"
              >Postar notas</button>
            </form>
          </div>
        </div>

        <div className={styles["students-files"]}>
          <h1 className='mb-4'>Atividade III - Cartografia</h1>
          <div className="d-flex mb-4">
            <div className={`p-2 mr-3 ${styles["info-card"]}`}>
              <div className={styles.quantity}>12</div>
              <span>Entregue</span>
            </div>
            <div className={`p-2 ${styles["info-card"]}`}>
              <div className={styles.quantity}>20</div>
              <span>Trabalhos atribuídos</span>
            </div>
          </div>
          <div className={styles["files-list"]}>
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
            <StudentFile />
          </div>
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
        destination: '/sessao-expirada',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}