import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { parseCookies } from "nookies";

import { ThemeContext } from '../../../../contexts/ThemeContext';
import { getAPIClient } from "../../../../services/apiClient";
import { RankingType } from '../../../../types/Ranking';
import { QueryProps } from '../../../../types/Query';

type RankingPageProps = {
  ranking: RankingType[];
  queryProps: QueryProps;
}

export default function Ranking(props: RankingPageProps) {
  const { isHighContrast } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Ranking da turma</title>
      </Head>

      <main className="page-container">
        <div className="card-style p-4">
          <div className="w-100">
            <h1 className="title-blue-dark mb-4">Ranking dos participantes da turma</h1>
          </div>

          <Table responsive>
            <thead className="table-head">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>XP</th>
                <th>Nível</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {props.ranking.length > 0 && props.ranking.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.avatar ?? "/icons/user.svg"}
                          alt="Avatar do estudante"
                          style={{ height: "calc(0.5rem + 1em)" }}
                        />
                        <span className='ml-3'>{item.name}</span>
                      </div>
                    </td>
                    <td style={!isHighContrast ? { color: "var(--yellow)" } : {}}>{item.xp}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.level?.avatar ?? "/icons/level.svg"}
                          alt="Ícone do nível"
                          style={{ height: "calc(0.5rem + 1em)" }}
                        />
                        <span className='ml-3'>{item.level?.name ?? "Nível inicial"}</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
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
  else {
    try {
      const response = await apiClient.get(`classes/${ctx.params.id}/ranking`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          per_page: 100,
        }
      });

      const ranking: RankingType[] = response.data.data.map(item => {
        return {
          name: item.name,
          xp: item.xp,
          avatar: item.avatar,
          level: item.level ? {
            name: item.level.name,
            avatar: item.level.avatar,
          } : null
        }
      });
      
      return {
        props: {
          ranking,
        },
      }
    } catch(error) {
      switch (error.response.status) {
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