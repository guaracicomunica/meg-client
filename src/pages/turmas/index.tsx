import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { parseCookies } from 'nookies';
import { ToastContainer } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardClass from '../../components/CardClass';
import ModalCreateNewClass from '../../components/ModalCreateNewClass';
import ModalAddClass from '../../components/ModalAddClass';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext'
import { ClassStatus } from '../../enums/enumClassStatus';
import { enumTheme } from '../../enums/enumTheme';
import { api } from '../../services/api';
import { getAPIClient } from '../../services/apiClient';
import { RoleUser } from '../../enums/enumRoleUser';
import { ClassCard } from '../../types/Class';

import styles from './styles.module.css';

type ClassPageType = {
  classes: ClassCard[];
  queryProps: {
    currentPage: number;
    totalPages: number;
  }
}

export default function Turmas(props: ClassPageType) {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { 'meg.token': token } = parseCookies();
  const router = useRouter();
  const [showModalTeacher, setShowModalTeacher] = useState(false);
  const [showModalStudent, setShowModalStudent] = useState(false);
  const [classes, setClasses] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (props) {
      setClasses(props.classes);
      setCurrentPage(props.queryProps.currentPage);
    }
  }, [props]);

  useEffect(() => {
    if (currentPage === props.queryProps.totalPages) {
      setHasMore(false);
    }
  }, [classes]);

  async function getMorePost() {
    try {
      const response = await api.get('classes', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          page: currentPage + 1,
          per_page: 10
        }
      });

      setCurrentPage(response.data.current_page);
      setClasses([...classes, ...response.data.data]);
    }
    catch (error) {
      if (error.response.status === 401) {
        router.push('/sessao-expirada');
      }
    }
  }

  function openModal(role: number) {
    if (role === RoleUser.teacher) {
      setShowModalTeacher(true);
    }
    if (role === RoleUser.student) {
      setShowModalStudent(true);
    }
  }

  return (
    <>
      <Head>
        <title>Turmas</title>
      </Head>

      <main className={styles[`theme-${theme}`]}>
        <InfiniteScroll
          className={styles["classes-list"]}
          dataLength={classes.length}
          next={getMorePost}
          hasMore={hasMore}
          loader={<div className={styles["loading-container"]}><Spinner animation="border" /></div>}
        >
          {/* show active classes first */}
          {classes.length > 0 && (
            classes.map(classroom => {
              if (classroom.status === ClassStatus.active) {
                return (
                  <CardClass
                    key={classroom.id}
                    id={classroom.id}
                    name={classroom.name}
                    nickname={classroom.nickname}
                    teacher={classroom.teacher}
                    code={classroom.code}
                    banner={classroom.banner}
                    roleUser={user?.role}
                    status={classroom.status}
                    partners={classroom.partners}
                    levels={classroom.levels}
                    skills={classroom.skills}
                  />
                );
              }
            })
          )}

          {/* show inactive classes */}
          {classes.length > 0 && (
            classes.map(classroom => {
              if (classroom.status === ClassStatus.inactive) {
                return (
                  <CardClass
                    key={classroom.id}
                    id={classroom.id}
                    name={classroom.name}
                    nickname={classroom.nickname}
                    teacher={classroom.teacher}
                    code={classroom.code}
                    banner={classroom.banner}
                    roleUser={user?.role}
                    status={classroom.status}
                    partners={classroom.partners}
                    levels={classroom.levels}
                    skills={classroom.skills}
                  />
                );
              }
            })
          )}

          <div className={styles["add-class"]} onClick={() => openModal(user?.role)}>
            <OverlayTrigger
              key="tooltip-add-class"
              placement="bottom"
              overlay={
                <Tooltip id="tooltip" bsPrefix={theme === enumTheme.contrast ? styles["tooltip-high-contrast"] : ""}>
                  {user?.role === RoleUser.teacher ? "Criar nova turma" : "Adicionar nova turma"}
                </Tooltip>
              }
            >
              <img src="./icons/plus.svg" alt="Adicionar turma" />
            </OverlayTrigger>
          </div>
        </InfiniteScroll>

        <ModalCreateNewClass
          type="create"
          show={showModalTeacher}
          onHide={() => setShowModalTeacher(false)}
        />

        <ModalAddClass
          show={showModalStudent}
          onHide={() => setShowModalStudent(false)}
        />
      </main>
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
      const response = await apiClient.get('classes', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: { 
          per_page: 10
        }
      });
      
      const classes = response.data.data.map(classroom => {
        return {
          id: classroom.id,
          name: classroom.name,
          nickname: classroom.nickname,
          banner: classroom?.banner,
          code: classroom.code,
          status: classroom.status,
          skills: classroom.skills,
          levels: classroom.levels,
          teacher: classroom.creator.name,
        }
      });

      const queryProps = {
        currentPage: response.data.current_page,
        totalPages: response.data.last_page,
      }

      return {
        props: {
          classes,
          queryProps
        }
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