import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import ModalAddFile from '../../../../../components/ModalAddFile';
import ModalAddLink from '../../../../../components/ModalAddLink';
import { getAPIClient } from '../../../../../services/apiClient';
import { ActivityTopicType } from '../../../../../types/Post';

import styles from './styles.module.css';

type CreateActivityProps = {
  topics: ActivityTopicType[];
}

type LinkType = {
  link: string;
}

export default function Criar() {
  const [showModalAddLink, setShowModalAddLink] = useState(false);
  const [showModalAddFile, setShowModalAddFile] = useState(false);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  function addLink(data: LinkType) {
    setLinks([
      ...links,
      data
    ]);
  }

  function addFile(data: any) {
    setFiles([
      ...files,
      data.file[0]
    ])
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
              <button onClick={() => setShowModalAddFile(true)} type='button'>
                <img src="/icons/send-file.svg" alt="Anexar arquivo" />
              </button>
            </div>
            <div className={styles["attachments"]}>
              <h5>Arquivos e links anexados</h5>
              {links.length > 0 && (
                links.map((link, index) => {
                  return (
                    <div className={styles["link"]} key={index}>
                      <img src="/icons/link.svg" alt="Ícone" />
                      <a href={link.link} target="_blank">{link.link}</a>
                    </div>
                  )
                })
              )}

              {files.length > 0 && (
                files.map((file, index) => {
                  return (
                    <div className={styles["link"]} key={index}>
                      <img src="/icons/file.svg" alt="Ícone" />
                      <span>{file.name}</span>
                    </div>
                  )
                })
              )}

              {links.length === 0 && files.length === 0 && (
                <p>Sem anexos.</p>
              )}
            </div>
          </div>

          <div className='w-100 px-4 border-left'>
            <div className="form-row">
              <div className="form-group col-12">
                <label className={styles["form-label"]} htmlFor="topic_id">Tópico</label>
                <select className='select w-100 p-2' name="topic_id" id="period" defaultValue={0}>
                  <option value="0">Escolha um tópico...</option>
                  {props.topics.map(topic => {
                    return <option value={topic.id}>{topic.name}</option>
                  })}
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
                <select className='select w-100 p-2' name="period" id="period" defaultValue={0}>
                  <option value="0">Escolha o bimestre...</option>
                  <option value="1">1º bimestre</option>
                  <option value="2">2º bimestre</option>
                  <option value="3">3º bimestre</option>
                  <option value="4">4º bimestre</option>
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
                  className='form-input form-control w-100'
                  placeholder='00'
                  name='xp'
                />
              </div>
            </div>

            <hr className='mb-4' />

            <div className='d-flex flex-column align-items-center'>
              <p className={styles.alert}>
                <strong className='mr-1'>ATENÇÃO:</strong>
                Os campos de pontos, moedas e XP não podem ser editados após a criação da atividade.
              </p>
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

      <ModalAddFile
        show={showModalAddFile}
        onHide={() => setShowModalAddFile(false)}
        addFile={addFile}
      />
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
      const response = await apiClient.get("topics", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params : {
          classroom_id: ctx.params.id
        }
      });

      const topics = response.data.data;

  return {
    props: {}
  }
}