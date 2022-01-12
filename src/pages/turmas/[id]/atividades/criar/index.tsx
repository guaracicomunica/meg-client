import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ModalAddLink from '../../../../../components/ModalAddLink';

import styles from './styles.module.css';

type LinkType = {
  link: string;
}

export default function Criar() {
  const [showModalAddLink, setShowModalAddLink] = useState(false);
  const [links, setLinks] = useState<LinkType[]>([]);

  function addLink(data: LinkType) {
    setLinks([
      ...links,
      data
    ]);
    console.log(links);
  }

  return (
    <>
      <Head>
        <title>Criar nova atividade</title>
      </Head>

      <main className="page-container">
        <form
          autoComplete='off'
          method="post"
          id="create-activity"
          className={`card-style py-5 ${styles["form-layout"]}`}
        >
          <div className='w-100 mb-5 mb-xl-0 px-4'>
            <h1>Criar atividade</h1>

            <div className="form-group mt-4">
              <input
                type="text"
                className="form-control form-input w-100"
                name="name"
                placeholder="Título"
              />
            </div>
            <div className="form-group">
              <textarea
                rows={10}
                className="form-control form-input w-100"
                name="body"
                placeholder="Instruções (opcional)"
              ></textarea>
            </div>
            <div className={styles["attachments-buttons"]}>
              <button onClick={() => setShowModalAddLink(true)} type='button'>
                <img src="/icons/send-link.svg" alt="Anexar link" />
              </button>
              <button type='button'>
                <img src="/icons/send-file.svg" alt="Anexar arquivo" />
              </button>
            </div>
            <div className={styles["attachments"]}>
              <h5>Arquivos e links anexados</h5>
              {links.length > 0 && (
                links.map(link => {
                  return (
                    <div className={styles["link"]}>
                      <img src="/icons/link.svg" alt="Ícone" />
                      <Link href={link.link}>
                        <a target="_blank">{link.link}</a>
                      </Link>
                    </div>
                  )
                })
              )}
              {links.length === 0 && (
                <p>Sem anexos.</p>
              )}
            </div>
          </div>

          <div className='w-100 px-4 border-left'>
            <div className={styles["form-label"]}>Turma</div>
            <div className="form-row mt-2">
              <div className="form-group col-sm-6">
                <select className='select p-2' name="classes" id="classes">
                  <option value="">Turma 02</option>
                </select>
              </div>

              <div className="form-group col-sm-6">
                <select className='select p-2' name="students" id="students">
                  <option value="">Todos os alunos</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-sm-6">
                <label className={styles["form-label"]} htmlFor="points">Pontos</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  className='form-input form-control w-100'
                  placeholder='00'
                  name='points'
                />
              </div>

              <div className="form-group col-sm-6">
                <label className={styles["form-label"]} htmlFor="period">Bimestre</label>
                <select className='select p-2' name="period" id="period">
                  <option value="">Escolha o bimestre...</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-sm-6">
                <label className={styles["form-label"]} htmlFor="deadline">Data de entrega</label>
                <input
                  type="date"
                  className='form-input form-control w-100'
                  name='deadline'
                />
              </div>

              <div className="form-group col-sm-6">
                <label className={styles["form-label"]} htmlFor="status">Status</label>
                <div className='d-flex flex-wrap'>
                  <div className={`mr-2 ${styles["radio-status"]}`}>
                    <input
                      type="radio"
                      id="status-active"
                      name="status"
                      defaultChecked={true}
                    />
                    <label htmlFor="status-active">Ativo</label>
                  </div>
                  
                  <div className={styles["radio-status"]}>
                    <input
                      type="radio"
                      id="status-inactive"
                      name="status"
                    />
                    <label htmlFor="status-inactive">Inativo</label>
                  </div>
                </div>
              </div>
            </div>

            <hr className='mb-4' />

            <div className="form-row">
              <div className="form-group col-sm-6">
                <label className={styles["form-label"]} htmlFor="coins">Moedas</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  className='form-input form-control w-100'
                  placeholder='00'
                  name='coins'
                />
              </div>

              <div className="form-group col-sm-6">
                <label className={styles["form-label"]} htmlFor="xp">XP</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  className='form-input form-control w-100'
                  placeholder='00'
                  name='xp'
                />
              </div>
            </div>

            <hr className='mb-4' />

            <div className='d-flex justify-content-center'>
              <button
                type='submit'
                form="create-activity"
                className='button button-blue text-uppercase'
              >Criar atividade</button>
            </div>
          </div>
        </form>
      </main>

      <ModalAddLink
        show={showModalAddLink}
        onHide={() => setShowModalAddLink(false)}
        addLink={addLink}
      />
    </>
  );
}