import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useContext, useState } from 'react';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { parseCookies } from 'nookies';
import { ToastContainer } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

import CardClass from '../../components/CardClass';
import ModalCreateNewClass from '../../components/ModalCreateNewClass';
import ModalAddClass from '../../components/ModalAddClass';
import { AuthContext } from '../../contexts/AuthContext';
import { ClassStatus } from '../../enums/enumClassStatus';
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

  const [showModalTeacher, setShowModalTeacher] = useState(false);
  const [showModalStudent, setShowModalStudent] = useState(false);
  const [classes, setClasses] = useState(props.classes);
  const [hasMore, setHasMore] = useState(true);

  async function getMorePost() {
    const response = await api.get('classes', {
      params: {
        page: props.queryProps.currentPage + 1,
        per_page: 10
      }
    });

    if (response.data.current_page === props.queryProps.totalPages) {
      setHasMore(false);
    }

    setClasses([...classes, ...response.data.data]);
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

      <main>
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
                    teacher={user?.name}
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
                    teacher={user?.name}
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
                <Tooltip id="tooltip">
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
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;

    const response = await apiClient.get('classes', {
      params: {
        per_page: 10
      }
    });
    const classes = response.data.data;
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
  }  
}