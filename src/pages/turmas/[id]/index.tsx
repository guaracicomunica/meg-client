import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import ModalSeeClassCode from "../../../components/ModalSeeClassCode";
import PostList from "../../../components/PostList";
import { api } from "../../../services/api";
import { getAPIClient } from "../../../services/apiClient";
import { ClassType } from "../../../types/Class";
import { PostType } from "../../../types/Post";

import styles from './styles.module.css';
import { AuthContext } from "../../../contexts/AuthContext";
import { RoleUser } from "../../../enums/enumRoleUser";
import { useForm } from "react-hook-form";
import { genericMessageError, options } from "../../../utils/defaultToastOptions";
import { QueryProps } from "../../../types/Query";

type ClassPageProps = {
  classroom: ClassType,
  postsData: {
    posts: PostType[],
    queryProps: QueryProps;
  },
};

type CreatePostType = {
  body: string,
  disabled: boolean,
  is_private: boolean,
  classroom_id: number,
  attachments: File[]
}

export default function Turma(props: ClassPageProps) {

  const router = useRouter();
  const { ['meg.token']: token } = parseCookies();
  const { user } = useContext(AuthContext);
  const [showModalSeeCode, setShowModalSeeCode] = useState(false);
  const [bannerURL, setBannerURL] = useState("");
  const [postsList, setPostsList] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, reset, setValue } = useForm( 
    {defaultValues: {  body: "", disabled: false, is_private: false, classroom_id: props.classroom.id }});

  const { classroom } = props;

  useEffect(() => {
    if (classroom.banner !== null) {
      setBannerURL(`${classroom.banner}`);
    }
    else {
      setBannerURL("/images/banner-class.svg");
    }
  }, []);

  useEffect(() => {
    if (props) {
      setPostsList(props.postsData.posts);
      setCurrentPage(props.postsData.queryProps.currentPage);
    }
  }, [props]);

  useEffect(() => { 
    if (currentPage === props.postsData.queryProps.totalPages) {
      setHasMore(false);
    }
  }, [postsList]);

  async function getMorePost() {
    try {
      const response = await api.get('posts', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          page: currentPage + 1,
          per_page: 10,
          classroom_id: classroom.id
        }
      });

      setCurrentPage(response.data.meta.current_page);
      setPostsList([...postsList, ...response.data.data]);
    }
    catch (error) {
      if (error.response.status === 401) {
        router.push('/sessao-expirada');
      }
    }
  }

  const onSubmit = async (data: CreatePostType) => handleCreatePost(data);

  async function handleCreatePost(data: CreatePostType) {
    data.classroom_id = props.classroom.id;
    data.disabled = false;
    data.is_private = false;

    try {
      await api.post('posts', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(function (success) {
        reset({
          body: ""
        });
        router.push(`/turmas/${router.query.id}`, undefined, {scroll: false});
        toast.success("Post enviado com sucesso!", options);
      });
    }
    catch(error) {
      if (!error.response) {
        // network error
        return toast.error(genericMessageError, options);
      }
      switch (error.response.status) {
        case 401:
          return {
            redirect: {
              destination: '/sessao-expirada',
              permanent: false,
            }
          }
        
        case 400:
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : genericMessageError, options);
          break;

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });
          break;

        case 500: 
          console.log("deu 500");
          console.log("500: " + error.response?.data.error);
          toast.error(genericMessageError, options);
          break;

        default:
          toast.error(genericMessageError, options);
          break;
      }
    }
  }
  
  return (
    <>
      <Head>
        <title>{classroom.name}</title>
      </Head>

      <main className="page-container">
        <div className={`banner ${styles["banner-class"]}`}>
          <img
            src={bannerURL}
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

        <div className={`${styles["posts-section"]} pt-3 pt-md-5`}>
          <div className={styles["posts-aside"]}>
            <Link href={`/turmas/${router.query.id}/missoes`}>
              <div className="card-style link-card p-4 mt-4 mt-md-0">
                <img src="/icons/activity.svg" alt="Missão" className={styles["img-link-card"]} />
                <h4 className="mt-3">Ver missões</h4>
              </div>
            </Link>

            <Link href={`/turmas/${router.query.id}/participantes`}>
              <div className="card-style link-card p-4 mt-4">
                <img src="/icons/students.svg" alt="Alunos" className={styles["img-link-card"]} />
                <h4 className="mt-3">Ver alunos</h4>
              </div>
            </Link>

            <Link href={user?.role === RoleUser.teacher ? `/turmas/${router.query.id}/notas` : `/turmas/${router.query.id}/boletim`}>
              <div className="card-style link-card p-4 mt-4">
                <img src="/icons/grades.svg" alt="Notas" className={styles["img-link-card"]} />
                <h4 className="mt-3">
                  {user?.role === RoleUser.teacher ? "Ver notas" : "Ver minhas notas" }
                </h4>
              </div>
            </Link>
          </div>

          <div className={styles["posts-list"]}>
            <div className={`${styles["post-comment"]} mb-3`}>
              <form id="post-comment" method="post"  onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
                <textarea
                  id="post"
                  placeholder="Digite o conteúdo da publicação..."
                  className="textarea w-100 p-4"
                  name="body"
                  {...register('body')}
                  rows={1}
                ></textarea>

                <button
                  type="submit"
                  className="button button-blue align-self-end mt-2"
                  form="post-comment"
                >Postar</button>
              </form>
            </div>
            <InfiniteScroll
              style={{overflow: 'hidden'}}
              dataLength={postsList.length}
              next={getMorePost}
              hasMore={hasMore}
              loader={<div className={styles["loading-container"]}><Spinner animation="border" /></div>}
            >
            {postsList.length > 0 ? (
              <PostList items={postsList} />
            ) : (
              <div className={`${styles["card-no-data"]} card-style px-5 py-4 mt-3`}>
                <h4 className="mb-0">Não há posts cadastrados no momento</h4>
              </div>
            )}
            </InfiniteScroll>
          </div>
        </div>
      </main>

      <ModalSeeClassCode
        code={classroom.code}
        show={showModalSeeCode}
        onHide={() => setShowModalSeeCode(false)}
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
      const { data: classroom } = await apiClient.get<ClassType>(`classes/${ctx.params.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const response = await apiClient.get('posts', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          per_page: 10,
          classroom_id: ctx.params.id
        }
      });
  
      const { data: posts } = response.data;
  
      const queryProps = {
        currentPage: response.data.meta.current_page,
        totalPages: response.data.meta.last_page,
      }
  
      return {
        props: {
          classroom,
          postsData: {
            posts,
            queryProps
          }
        },
      }
    } catch(error) {
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