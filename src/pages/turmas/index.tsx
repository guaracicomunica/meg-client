import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useContext, useState } from 'react';
import { OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import { parseCookies } from 'nookies';

import CardClass from '../../components/CardClass';
import { AuthContext } from '../../contexts/AuthContext';
import { getAPIClient } from '../../services/apiClient';
import { RoleUser } from '../../enums/enumRoleUser';

import styles from './styles.module.css';
import ModalCreateNewClass from '../../components/ModalCreateNewClass';
import ModalAddClass from '../../components/ModalAddClass';

export default function Turmas() {
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
        <CardClass
          key={1}
          id={1}
          class="Turma 01"
          name="As aventuras dos Jovens Sonhadores"
          teacher={user?.name}
          bannerFile="banner-class"
          roleUser={user?.role}
        />
        <CardClass
          key={2}
          id={2}
          class="Turma 02"
          name="As aventuras dos Jovens Sonhadores"
          teacher={user?.name}
          bannerFile="banner-class-2"
          roleUser={user?.role}
        />

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
          show={showModalTeacher}
          onHide={() => setShowModalTeacher(false)}
        />

        <ModalAddClass
          show={showModalStudent}
          onHide={() => setShowModalStudent(false)}
        />
      </main>
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

  return {
    props: {}
  }
}