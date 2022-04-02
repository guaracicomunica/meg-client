import Head from 'next/head';
import { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { ThemeContext } from '../../../../contexts/ThemeContext';

export default function Ranking() {
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
                <th>Moedas</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <td>01</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img src="/icons/user.svg" alt="Avatar do estudante" style={{ height: "calc(0.5rem + 1em)" }} />
                    <span className='ml-3'>Diogo de Andrades da Silva Pereira</span>
                  </div>
                </td>
                <td style={!isHighContrast ? { color: "var(--yellow)" } : {}}>164</td>
                <td>
                  <div className="d-flex align-items-center">
                    <img src="/icons/level.svg" alt="Avatar do estudante" style={{ height: "calc(0.5rem + 1em)" }} />
                    <span className='ml-3'>Senhor Lobo</span>
                  </div>
                </td>
                <td style={!isHighContrast ? { color: "var(--green)" } : {}}>$22</td>
              </tr>
            </tbody>
          </Table>
        </div>  
      </main>
    </>
  );
}