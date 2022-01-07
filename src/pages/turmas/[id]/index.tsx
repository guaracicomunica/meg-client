import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import ModalSeeClassCode from "../../../components/ModalSeeClassCode";
import Post from "../../../components/Post";
import PostActivity from "../../../components/PostActivity";
import { AuthContext } from "../../../contexts/AuthContext";

import { api } from "../../../services/api";
import { getAPIClient } from "../../../services/apiClient";
import { ClassPage } from "../../../types/Class";

import styles from './styles.module.css';

export default function Turma(props: ClassPage) {
  const [showModalSeeCode, setShowModalSeeCode] = useState(false);
  const classroom = props; 
  return (
    <>
      <Head>
        <title>{classroom.name}</title>
      </Head>

      <main className="page-container">
        <div className={`banner ${styles["banner-class"]}`}>
          <img
            src="/images/banner-class-2.svg"
            alt="Banner da turma"
          />

          <div className="info-class p-4">
            <h3 className='text-uppercase title'>{classroom.name}</h3>
            <h4 className="nickname">{classroom.nickname}</h4>
            <hr className='my-2 w-50' />
            <p>Prof. {classroom.teacher}</p>
          </div>

          <div className="link-class" onClick={() => setShowModalSeeCode(true)}>
            Código da Turma
          </div>
        </div>

        <div className={`${styles["posts-section"]} py-3 py-md-5`}>
          <div className={styles["posts-aside"]}>
            <Link href={`/turmas/11/atividades`}>
              <div className="card-style link-card p-4 mt-4 mt-md-0">
                <img src="/icons/activity.svg" alt="Atividade" className={styles["img-link-card"]} />
                <h4 className="mt-3">Ver atividades</h4>
              </div>
            </Link>

            <Link href={`/turmas/11/participantes`}>
              <div className="card-style link-card p-4 mt-4">
                <img src="/icons/students.svg" alt="Alunos" className={styles["img-link-card"]} />
                <h4 className="mt-3">Ver alunos</h4>
              </div>
            </Link>
          </div>

          <div className={styles["posts-list"]}>
            <div className={`${styles["post-comment"]} mb-3`}>
              <form id="post-comment">
                <textarea
                  name="post"
                  id="post"
                  placeholder="Faça um comentário..."
                  className="textarea w-100 p-4"
                  rows={1}
                ></textarea>
              </form>
              {classroom.posts 
              ?
              <>
                <Post
                  key={1}
                id={1}
                creatorPost="Marjorie Ramos"
                date="20 de Jun."
                postBody="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                comments={[
                  {
                    id: 1,
                    commentCreator: 'Higor Nascimento',
                    date: "20 de Jun.",
                    commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                  },
                  {
                    id: 2,
                    commentCreator: 'Fabiana Pereira',
                    date: "20 de Jun.",
                    commentBody: "Lorem Ipsum."
                  },
                  {
                    id: 3,
                    commentCreator: 'João Paulo Pereira',
                    date: "20 de Jun.",
                    commentBody: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                  }
                ]}
              />

              <PostActivity
                key={2}
                id={2}
                teacher="Marjorie Ramos"
                activityTitle="Lorem Ipsum is simply dummy text"
              />
              </> 
              : 
              <div className="card-style p-2 mt-3" style={{height: 'fit-content'}}>
                <h4>Não há posts cadastrados no momento</h4>
              </div>
            }
            </div>
          </div>
        </div>
      </main>

      <ModalSeeClassCode
        code={classroom.code}
        show={showModalSeeCode}
        onHide={() => setShowModalSeeCode(false)}
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
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
    
    const { data } = await apiClient.get(`classes/${ctx.params.id}`);
    
    console.log(data);

    return {
      props: data
    }
  }
}