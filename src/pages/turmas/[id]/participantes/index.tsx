import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";

import { ThemeContext } from "../../../../contexts/ThemeContext";
import CardStudent from "../../../../components/CardStudent";
import CardTeacher from "../../../../components/CardTeacher";
import { api } from "../../../../services/api";
import { getAPIClient } from "../../../../services/apiClient";
import { StudentType, TeacherType } from "../../../../types/Participant";
import { QueryProps } from "../../../../types/Query";

import styles from './styles.module.css';

type ParticipantsProps = {
  teachers: TeacherType[];
  studentsData: {
    students: StudentType[];
    queryProps: QueryProps;
  }
}

export default function Participantes(props: ParticipantsProps) {
  const { 'meg.token': token } = parseCookies();
  const router = useRouter();
  const [studentsList, setStudentsList] = useState<StudentType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (props) {
      setStudentsList(props.studentsData.students);
      setCurrentPage(props.studentsData.queryProps.currentPage);
    }
  }, [props]);

  useEffect(() => {
    if (currentPage === props.studentsData.queryProps.totalPages) {
      setHasMore(false);
    }
  }, [studentsList]);

  async function getMoreStudent() {
    try {
      const response = await api.get(`students`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          page: currentPage + 1,
          per_page: 10
        }
      });

      setCurrentPage(response.data.meta.current_page);
      setStudentsList([...studentsList, ...response.data.data]);
    }
    catch (error) {
      if (error.response.status === 401) {
        router.push('/sessao-expirada');
      }
    }
  }
  return (
    <>
      <Head>
        <title>Participantes da turma</title>
      </Head>

      <main className="page-container">
        <h1 className={`title-${theme}-primary mb-5`}>Participantes da turma</h1>
        <h2 className="title-gray mb-4">Professores</h2>
        <div className={`mb-5 ${styles["list-teachers"]}`}>
          {props.teachers.map(teacher => {
            return (
              <CardTeacher key={teacher.id} teacher={teacher} />
            )
          })}
        </div>
        <h2 className="title-gray mb-4">Alunos</h2>
        <InfiniteScroll
          className={`mb-5 ${styles["list-students"]}`}
          dataLength={studentsList.length}
          next={getMoreStudent}
          hasMore={hasMore}
          loader={<div className={styles["loading-container"]}><Spinner animation="border" /></div>}
        >
          {studentsList.length > 0 ? (
            studentsList.map(student => {
              return (
                <CardStudent key={student.id} student={student} />
              )
            })
          ) : (
            <p>Não há alunos cadastrados na turma</p>
          )}
        </InfiniteScroll>
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
      const responseTeachers = await apiClient.get(`classes/${ctx.params.id}/teachers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const responseStudents = await apiClient.get(`classes/${ctx.params.id}/students`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          per_page: 10
        }
      });

      const teachers = responseTeachers.data.data;
      const students = responseStudents.data.data;
      const queryProps = {
        currentPage: responseStudents.data.meta.current_page,
        totalPages: responseStudents.data.meta.last_page,
      }
  
      return {
        props: {
          teachers,
          studentsData: {
            students,
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