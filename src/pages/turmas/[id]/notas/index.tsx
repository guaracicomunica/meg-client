import Head from "next/head";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import ModalPostGrades from "../../../../components/ModalPostGrades";

import styles from './styles.module.css';

export default function Notas() {
  const [showModalPostGrades, setShowModalPostGrades] = useState(false);
  const [isForAllStudents, setIsForAllStudents] = useState(false);

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
            <h1 className={styles.title}>Gerar boletins</h1>
            <button onClick={generateReportCardForAllStudents} className="mt-2 mb-4 button button-blue text-uppercase">Publicar para todos</button>
          </div>
          
          <Table responsive>
            <thead className={styles["table-head"]}>
              <tr>
                <th>Nome do estudante</th>
                <th>Status</th>
                <th>Notas bimestrais</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody className={styles["table-body"]}>
              <tr>
                <td>Fabiana Pereira Duarte</td>
                <td>
                  <div className="d-flex">
                    <div className={`py-1 px-2 ${styles.status}`}>Cursando</div>
                  </div>
                </td>
                <td>
                  <div className="d-flex">
                    <div className={`${styles["unit-grade"]} mr-3`}>
                      <span>1º</span>
                      <div className={`${styles.grade} ml-2 py-1 px-2`}>100</div>
                    </div>
                    <div className={`${styles["unit-grade"]} mr-3`}>
                      <span>2º</span>
                      <div className={`${styles.grade} ml-2 py-1 px-2`}>100</div>
                    </div>
                    <div className={`${styles["unit-grade"]} mr-3`}>
                      <span>3º</span>
                      <div className={`${styles.grade} ml-2 py-1 px-2`}>100</div>
                    </div>
                    <div className={`${styles["unit-grade"]} mr-3`}>
                      <span>4º</span>
                      <div className={`${styles.grade} ml-2 py-1 px-2`}>100</div>
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
            </tbody>
          </Table>
        </div>  
      </main>

      <ModalPostGrades
        allStudents={isForAllStudents}
        show={showModalPostGrades}
        onHide={() => setShowModalPostGrades(false)}
      />

      <ToastContainer />
    </>
  );
}