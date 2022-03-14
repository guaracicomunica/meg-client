import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { Table } from "react-bootstrap";
import { useContext } from "react";

import { ThemeContext } from "../../../../contexts/ThemeContext";
import { getAPIClient } from "../../../../services/apiClient";
import { enumTheme } from "../../../../enums/enumTheme";

import styles from './styles.module.css';

export default function Boletim({ grade }) {
  const { theme } = useContext(ThemeContext);
  const isHighContrast = theme === enumTheme.contrast;

  return (
    <>
      <Head>
        <title>Ver boletim</title>
      </Head>

      <main className="page-container">
        <div className="card-style p-4 mb-4">
          <div className="w-100 mb-4">
            <h1 className='title-blue-dark'>Meu boletim</h1>
          </div>
          
          <Table responsive>
            <thead className="table-head">
              <tr>
                <th>Turma</th>
                <th>Status</th>
                <th>Notas bimestrais</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <td>{grade.classroom}</td>
                <td>
                  <div className="d-flex">
                    <div className="py-1 px-2 status">Cursando</div>
                  </div>
                </td>
                <td>
                  <div className="d-flex">
                    <div className="unit-grade mr-3">
                      <span>1º</span>
                      <div className="grade ml-2 py-1 px-2">{grade.bim1 ?? '-'}</div>
                    </div>
                    <div className="unit-grade mr-3">
                      <span>2º</span>
                      <div className="grade ml-2 py-1 px-2">{grade.bim2 ?? '-'}</div>
                    </div>
                    <div className="unit-grade mr-3">
                      <span>3º</span>
                      <div className="grade ml-2 py-1 px-2">{grade.bim3 ?? '-'}</div>
                    </div>
                    <div className="unit-grade mr-3">
                      <span>4º</span>
                      <div className="grade ml-2 py-1 px-2">{grade.bim4 ?? '-'}</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>  
        <div className={`${styles["card-gamification"]} card-style p-4`}>
          <div className="w-100 mb-4">
            <h1 className='title-blue-dark'>Pontuações gamificadas</h1>
          </div>
          
          <div className="d-flex flex-wrap w-100">
            <div className={styles["info-group"]}>
              <img src="/icons/level.svg" alt="Brasão do nível" style={{height: "2rem"}} />
              <span style={!isHighContrast ? {color: "var(--gray-form)"} : {}}>{grade.level ?? 'Sem Nível'}</span>
            </div>
            <div className={styles["info-group"]}>
              <img src="/icons/crown.svg" style={{height: "1.5rem"}} />
              <span style={!isHighContrast ? {color: "var(--yellow)"} : {}}>{grade.xp ?? 0} XP</span>
            </div>
            <div className={styles["info-group"]}>
              <img src="/icons/coins.svg" style={{height: "2rem"}} />
              <span style={!isHighContrast ? {color: "var(--green)"} : {}}>{grade.coins ?? 0} moedas</span>
            </div>
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
  } else {
    try {
      const response = await apiClient.get('report-cards/student', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          classroom_id: ctx.params.id
      }});
  
      const grade = response.data; 

      return {
        props: {
          grade
        }
      }
    } catch(error) {
      switch (error?.response?.status) {
        case 401:
          return {
            redirect: {
              destination: '/sessao-expirada',
              permanent: false,
            }
          }

        case 403:
          return {
            redirect: {
              destination: '/acesso-negado',
              permanent: false,
            }
          }

        case 404:
          return {
            redirect: {
              destination: '/404',
              permanent: false,
            }
          }
        
        default:
          return {
            redirect: {
              destination: '/500',
              permanent: false,
            }
          }
      }
    }
  }
}