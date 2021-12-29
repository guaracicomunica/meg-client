import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useContext, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { parseCookies } from 'nookies';
import { ToastContainer } from 'react-toastify';

import ModalCreateNewClass from '../../components/ModalCreateNewClass';
import ModalAddClass from '../../components/ModalAddClass';
import CardClass from '../../components/CardClass';
import { AuthContext } from '../../contexts/AuthContext';
import { getAPIClient } from '../../services/apiClient';
import { RoleUser } from '../../enums/enumRoleUser';
import { ClassStatus } from '../../enums/enumClassStatus';
import { ClassCard } from '../../types/Class';

import styles from './styles.module.css';

type ClassPageType = {
  classes: ClassCard[];
}

export default function Turmas(props: ClassPageType) {
  const { user } = useContext(AuthContext);

  const [showModalTeacher, setShowModalTeacher] = useState(false);
  const [showModalStudent, setShowModalStudent] = useState(false);

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

      <main className={styles["classes-list"]}>
        {/* show active classes first */}
        {props.classes.length > 0 && (
          props.classes.map(classroom => {
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
        {props.classes.length > 0 && (
          props.classes.map(classroom => {
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
        destination: '/login',
        permanent: false,
      }
    }
  }
  else {
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;

    const response = await apiClient.get('classes');
    const classes = response.data.data;

    return {
      props: {
        classes
      }
    }
  }  
}