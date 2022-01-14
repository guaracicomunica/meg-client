import Head from "next/head";
import { Table } from "react-bootstrap";

import styles from './styles.module.css';

export default function Boletim() {
  return (
    <>
      <Head>
        <title>Ver boletim</title>
      </Head>

      <main className="page-container">
        <div className="card-style p-4 mb-4">
          <div className="w-100 mb-4">
            <h1 className="title-primary">Meu boletim</h1>
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
                <td>Turma 03 | As Aventuras dos Jovens Sonhadores</td>
                <td>
                  <div className="d-flex">
                    <div className="py-1 px-2 status">Cursando</div>
                  </div>
                </td>
                <td>
                  <div className="d-flex">
                    <div className="unit-grade mr-3">
                      <span>1º</span>
                      <div className="grade ml-2 py-1 px-2">100</div>
                    </div>
                    <div className="unit-grade mr-3">
                      <span>2º</span>
                      <div className="grade ml-2 py-1 px-2">100</div>
                    </div>
                    <div className="unit-grade mr-3">
                      <span>3º</span>
                      <div className="grade ml-2 py-1 px-2">100</div>
                    </div>
                    <div className="unit-grade mr-3">
                      <span>4º</span>
                      <div className="grade ml-2 py-1 px-2">100</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>  
        <div className={`${styles["card-gamification"]} card-style p-4`}>
          <div className="w-100 mb-4">
            <h1 className="title-primary">Pontuações gamificadas</h1>
          </div>
          
          <div className="d-flex flex-wrap w-100">
            <div className={styles["info-group"]}>
              <img src="/icons/level.svg" alt="Brasão do nível" style={{height: "2rem"}} />
              <span style={{color: "var(--gray-form)"}}>Nível 04 | Senhor Lobo</span>
            </div>
            <div className={styles["info-group"]}>
              <img src="/icons/crown.svg" style={{height: "1.5rem"}} />
              <span style={{color: "var(--yellow)"}}>60 XP</span>
            </div>
            <div className={styles["info-group"]}>
              <img src="/icons/coins.svg" style={{height: "2rem"}} />
              <span style={{color: "var(--green)"}}>22 moedas</span>
            </div>
          </div>
        </div> 
      </main>
    </>
  );
}