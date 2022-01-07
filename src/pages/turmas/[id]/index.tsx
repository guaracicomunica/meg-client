import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import ModalSeeClassCode from "../../../components/ModalSeeClassCode";
import Post from "../../../components/Post";
import PostActivity from "../../../components/PostActivity";
import PostList from "../../../components/PostList";
import { getAPIClient } from "../../../services/apiClient";
import { ClassPage } from "../../../types/Class";
import { PostType } from "../../../types/Post";

import styles from './styles.module.css';

type TurmaProps = {
  classroom: ClassPage,
  posts: PostType[],
};

export default function Turma(props: TurmaProps) {
  const [showModalSeeCode, setShowModalSeeCode] = useState(false);
  const { classroom } = props; 
  const { posts } = props;
  
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
              {posts.length > 0
              ?
              <PostList items={posts} />
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
    
    const { data: classroom} = await apiClient.get<ClassPage>(`classes/${ctx.params.id}`);
    
    const response = await apiClient.get('posts', {
      params: {
        per_page: 10,
        classroom_id: ctx.params.id
      }
    });

    const {data: posts} = response.data;

    const formatedPosts: PostType[] = posts.map(post => ({
      id: post.id,
      body: post.body,
      creator: classroom.teacher,
      date: post.created_at,
      comments: post?.comments,
      activity: post?.activity
    }))

    return {
      props: {
        classroom,
        posts: formatedPosts
      },
    }
  }
}