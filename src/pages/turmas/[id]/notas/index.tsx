import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { Grade } from '../../../../types/Grade';
import ModalPostGrades from "../../../../components/ModalPostGrades";
import { getAPIClient } from "../../../../services/apiClient";
import { ThemeContext } from "../../../../contexts/ThemeContext";

type GradeProps = {
  grades: Grade[]
};

export default function Notas(props: GradeProps) {
  const [showModalPostGrades, setShowModalPostGrades] = useState(false);
  const [isForAllStudents, setIsForAllStudents] = useState(false);
  const { theme } = useContext(ThemeContext);

  function generateReportCardForAllStudents() {
    setIsForAllStudents(true);
    setShowModalPostGrades(true);
  }

  function generateReportCardForOneStudent() {
    setIsForAllStudents(false);
    setShowModalPostGrades(true);
  }

  return (
    <>
      <Head>
        <title>Ver notas</title>
      </Head>

      <main className="page-container">
        <div className="card-style p-4">
          <div className="w-100">
            <h1 className="title-gray">Gerar boletins</h1>
            {props.grades.length > 0 && (
              <button
                onClick={generateReportCardForAllStudents}
                className="mt-2 mb-4 button button-blue text-uppercase"
              >Publicar para todos</button>
            )}
            {props.grades.length === 0 && <span>Não há alunos cadastrados no momento.</span>}
          </div>

          {props.grades.length > 0 && (
            <Table responsive>
              <thead className="table-head">
                <tr>
                  <th>Nome do estudante</th>
                  <th>Status</th>
                  <th>Notas bimestrais</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {props.grades.map((grade, index) => {
                  return (
                    <tr key={index}>
                      <td>{grade.user}</td>
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
                      <td>
                        <button
                          onClick={generateReportCardForOneStudent}
                          className="button button-blue text-uppercase py-1 px-3"
                        >Publicar</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}
        </div>  
      </main>

      <ModalPostGrades
        theme={theme}
        allStudents={isForAllStudents}
        show={showModalPostGrades}
        onHide={() => setShowModalPostGrades(false)}
      />

      <ToastContainer />
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
      const response = await apiClient.get('report-cards', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          per_page: 100,
          classroom_id: ctx.params.id
      }});
  
      const grades = response.data.data;
  
      return {
        props: {
          grades
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