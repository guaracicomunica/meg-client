import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import ModalSeeClassCode from "../../../components/ModalSeeClassCode";
import Post from "../../../components/Post";
import PostActivity from "../../../components/PostActivity";
import { AuthContext } from "../../../contexts/AuthContext";

import { api } from "../../../services/api";
import { ClassPage } from "../../../types/Class";

import styles from './styles.module.css';

export default function Turma(props: ClassPage) {
  const [showModalSeeCode, setShowModalSeeCode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { ['meg.token']: token } = parseCookies();

    if (!token) {
      router.push("/sessao-expirada");
    }
  }, []);
  
  return (
    <>
      <Head>
        <title>Turma 1</title>
      </Head>

      <main className="page-container">
        <div className={`banner ${styles["banner-class"]}`}>
          <img
            src="/images/banner-class-2.svg"
            alt="Banner da turma"
          />

          <div className="info-class p-4">
            <h3 className='text-uppercase title'>Turma 1</h3>
            <h4 className="nickname">As aventuras de jovens aprendizes na Escola de Magia Geogwarts</h4>
            <hr className='my-2 w-50' />
            <p>Prof. Marjorie Ramos</p>
          </div>

          <div className="link-class" onClick={() => setShowModalSeeCode(true)}>
            Código da turma
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

            <Link href="#">
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
            </div>

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
          </div>
        </div>
      </main>

      <ModalSeeClassCode
        code="12345678"
        show={showModalSeeCode}
        onHide={() => setShowModalSeeCode(false)}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  /*const { data } = await api.get('classes');

  const paths = data.data.map(classroom => {
    return {
      params: {
        slug: classroom.id
      }
    }
  });

  return {
    paths,
    fallback: 'blocking'
  }*/

  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  /*const { user } = useContext(AuthContext);

  const { slug } = ctx.params;
  const { data } = await api.get(`classes/${slug}`);

  const classroom: ClassPage = {
    id: data.data.id,
    name: data.data.name,
    nickname: data.data.nickname,
    banner: data.data.banner,
    code: data.data.code,
    roleUser: user.role,
    teacher: data.data.teacher,
    posts: data.data.posts,
    activities: data.data.activities
  }

  return {
    props: {
      classroom
    },
    revalidate: 60 * 60 // 1 hour
  }*/

  return {
    props: {}
  }
}