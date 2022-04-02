import { useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

import ModalSeeClassCode from "../../../components/ModalSeeClassCode";
import { RankingStudent } from "../../../components/RankingStudent";
import PostList from "../../../components/PostList";
import { AuthContext } from "../../../contexts/AuthContext";
import { ThemeContext } from "../../../contexts/ThemeContext"
import { api } from "../../../services/api";
import { getAPIClient } from "../../../services/apiClient";
import { ClassType } from "../../../types/Class";
import { PostType } from "../../../types/Post";
import { QueryProps } from "../../../types/Query";
import { genericMessageError, options } from "../../../utils/defaultToastOptions";

import styles from './styles.module.css';

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
  const { isTeacher } = useContext(AuthContext);
  const { isHighContrast } = useContext(ThemeContext);
  const [showModalSeeCode, setShowModalSeeCode] = useState(false);
  const [bannerURL, setBannerURL] = useState("");
  const [postsList, setPostsList] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { register, handleSubmit, reset } = useForm({ defaultValues: {
    body: "",
    disabled: false,
    is_private: false,
    classroom_id: props.classroom.id
  }});

  const { classroom } = props;

  const toastOptions: ToastOptions = {
    ...options,
    hideProgressBar: isHighContrast ? true : false,
    theme: isHighContrast ? "dark" : "light"
  }

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
        toast.success("Post enviado com sucesso!", toastOptions);
      });
    }
    catch(error) {
      if (!error.response) {
        // network error
        return toast.error(genericMessageError, toastOptions);
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
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : genericMessageError, toastOptions);
          break;

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], toastOptions);
          });
          break;

        case 500:
          toast.error(genericMessageError, toastOptions);
          break;

        default:
          toast.error(genericMessageError, toastOptions);
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
          <div className="banner-content">
            <div className="info-class pt-4 pl-4 pr-0">
              <h3 className='text-uppercase title'>{classroom.name}</h3>
              <h4 className="nickname">{classroom.nickname}</h4>
              <hr className='my-2 w-50' />
              <p className='teacher'>Prof. {classroom.teacher}</p>
            </div>

            <div className="link-class m-4" onClick={() => setShowModalSeeCode(true)}>
              Código da Turma
            </div>
          </div>
        </div>

        <div className={`${styles["posts-section"]} pt-3 pt-md-5`}>
          <div className={styles["posts-aside"]}>
            <Link href={`/turmas/${router.query.id}/missoes`}>
              <div className="card-style link-card p-4 mt-4 mt-md-0">
                <img
                  src="/icons/activity.svg"
                  alt="Missão"
                  className={isHighContrast ? `img-contrast-white ${styles["img-link-card"]}` : styles["img-link-card"]}
                />
                <span className="mt-3">Ver missões</span>
              </div>
            </Link>

            <Link href={`/turmas/${router.query.id}/participantes`}>
              <div className="card-style link-card p-4 mt-4">
                <img
                  src="/icons/students.svg"
                  alt="Alunos"
                  className={isHighContrast ? `img-contrast-white ${styles["img-link-card"]}` : styles["img-link-card"]}
                />
                <span className="mt-3">Ver alunos</span>
              </div>
            </Link>

            <Link href={isTeacher ? `/turmas/${router.query.id}/notas` : `/turmas/${router.query.id}/boletim`}>
              <div className="card-style link-card p-4 mt-4">
                <img
                  src="/icons/grades.svg"
                  alt="Notas"
                  className={isHighContrast ? `img-contrast-white ${styles["img-link-card"]}` : styles["img-link-card"]}
                />
                <span className="mt-3"> {isTeacher ? "Ver notas" : "Ver minhas notas" }</span>
              </div>
            </Link>

            <div className={`${styles["ranking-card"]} card-style p-4 mt-4`}>
              <h3 className="text-center" style={!isHighContrast ? { color: "var(--blue-dark)" } : {}}>
                Ranking dos participantes
              </h3>
              <hr className="w-100 my-2" />
              <RankingStudent />
              <RankingStudent />
              <RankingStudent />
              <RankingStudent />
              <RankingStudent />
              <Link href={`/turmas/${router.query.id}/ranking`}>
                <a className="button button-blue text-uppercase mt-4">Acessar ranking</a>
              </Link>
            </div>
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
              loader={
                <div className={styles["loading-container"]}>
                  <Spinner
                    className="visually-hidden"
                    animation="border"
                    variant={isHighContrast ? "light" : "dark"}
                  />
                </div>
              }
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

      <ToastContainer {...toastOptions} />
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