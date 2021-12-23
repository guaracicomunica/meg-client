import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import CardClass from '../../components/CardClass';

import { getAPIClient } from '../../services/apiClient';
import { User } from '../../types/User';
import { RoleUser } from '../../enums/enumRoleUser';

import styles from './styles.module.css';

export default function Turmas() {
  const { 'meg.user': user } = parseCookies();
  const { role }: User = JSON.parse(user);

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
          teacher="Marjorie Ramos"
          bannerFile="banner-class"
          roleUser={role}
        />
        <CardClass
          key={2}
          id={2}
          class="Turma 02"
          name="As aventuras dos Jovens Sonhadores"
          teacher="Marjorie Ramos"
          bannerFile="banner-class-2"
          roleUser={role}
        />

        <div className={styles["add-class"]}>
          <OverlayTrigger
            key="tooltip-add-class"
            placement="bottom"
            overlay={
              <Tooltip id="tooltip">
                {role === RoleUser.teacher ? "Criar nova turma" : "Adicionar nova turma"}
              </Tooltip>
            }
          >
            <img src="./icons/plus.svg" alt="Adicionar turma" />
          </OverlayTrigger>
        </div>
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