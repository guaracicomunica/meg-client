import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

import ModalAddFile from '../../../../../components/ModalAddFile';
import ModalAddLink from '../../../../../components/ModalAddLink';
import { api } from '../../../../../services/api';
import { getAPIClient } from '../../../../../services/apiClient';
import { ActivityTopicType } from '../../../../../types/Post';
import { options } from '../../../../../utils/defaultToastOptions';

import styles from './styles.module.css';

type CreateActivityProps = {
  topics: ActivityTopicType[];
}

type LinkType = {
  link: string;
}

type DataFormActivity = {
  name: string;
  body: string;
  points: number;
  xp: number;
  coins: number;
  disabled: number;
  deadline: Date;
  topic_id: number;
  unit_id: number;
  attachments: File[];
  links: string[];
}

export default function Criar(props: CreateActivityProps) {
  const {'meg.token': token} = parseCookies();
  const router = useRouter();
  const { register, handleSubmit } = useForm({defaultValues: {
    name: "",
    body: "",
    points: 0,
    xp: 0,
    coins: 0,
    disabled: 1,
    deadline: null,
    topic_id: 0,
    unit_id: 0,
    attachments: null,
    links: null
  }});

  const onSubmit = async (data: DataFormActivity) => handleCreateActivity(data);
  
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

  function generateFormData(data: DataFormActivity) {
    const form = new FormData();
    const date = new Date(data.deadline);

    form.append('classroom_id', router.query.id.toString());
    form.append('name', data.name);
    form.append('body', data.body);
    form.append('points', data.points.toString());
    form.append('xp', data.xp.toString());
    form.append('coins', data.coins.toString());
    form.append('disabled', data.disabled.toString());
    form.append('deadline', format(date, "uuuu-MM-dd HH:mm:ss"));
    form.append('topic_id', data.topic_id.toString());
    form.append('unit_id', data.unit_id.toString());

    for (let i = 0; i < files.length; i++) {
      form.append(`attachments[${i}]`, files[i]);
    }

    for (let i = 0; i < links.length; i++) {
      form.append(`links[${i}]`, links[i].link);
    }
    
    return form;
  }

  async function handleCreateActivity(data: DataFormActivity) {
    try {
      const request = generateFormData(data);
      
      await api.post('activities', request, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(function (success) {
        router.push(`/turmas/${router.query.id}`);
      });
    }
    catch(error) {
      const string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";

      if (!error.response) {
        // network error
        return toast.error(string, options);
      }
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

        case 400:
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : string, options);

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });

        case 500: 
          toast.error(string, options);
          break;

        default:
          toast.error(string, options);
          break;
      }
    }
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-100 mb-5 mb-xl-0 px-4'>
            <h1>Criar atividade</h1>

            <div className="form-group mt-4">
              <input
                type="text"
                className="form-control form-input w-100"
                name="name"
                placeholder="Título"
                {...register('name')}
              />
            </div>
            <div className="form-group">
              <textarea
                rows={10}
                className="form-control form-input w-100"
                name="body"
                placeholder="Instruções (opcional)"
                {...register('body')}
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
                <select
                  className='select w-100 p-2'
                  name="topic_id"
                  defaultValue={0}
                  {...register('topic_id')}
                >
                  <option disabled value="0">Escolha um tópico...</option>
                  {props.topics.map(topic => {
                    return <option key={topic.id} value={topic.id}>{topic.name}</option>
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
                  {...register('points')}
                />
              </div>

              <div className="form-group col-sm-6">
                <label className={styles["form-label"]} htmlFor="unit_id">Bimestre</label>
                <select
                  className='select w-100 p-2'
                  name="unit_id"
                  defaultValue={0}
                  {...register('unit_id')}
                >
                  <option disabled value="0">Escolha o bimestre...</option>
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
                  type="datetime-local"
                  className='form-input form-control w-100'
                  name='deadline'
                  {...register('deadline')}
                />
              </div>

              <div className="form-group col-sm-6">
                <label className={styles["form-label"]} htmlFor="disabled">Status</label>
                <div className='d-flex flex-wrap'>
                  <div className={`mr-2 ${styles["radio-status"]}`}>
                    <input
                      type="radio"
                      id="status-active"
                      name="disabled"
                      value={0}
                      {...register('disabled')}
                    />
                    <label htmlFor="status-active">Ativo</label>
                  </div>
                  
                  <div className={styles["radio-status"]}>
                    <input
                      type="radio"
                      id="status-inactive"
                      name="disabled"
                      value={1}
                      {...register('disabled')}
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
                  {...register('coins')}
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
                  {...register('xp')}
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
        props: {
          topics
        },
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