import { GetServerSideProps } from "next";
import Head from "next/head";
import { useContext } from "react"
import { parseCookies } from 'nookies'

import SkillNotification from "../../components/SkillNotification";
import CardUser from "../../components/CardUser";
import { RoleUser } from "../../enums/enumRoleUser";
import CardSkills from "../../components/CardSkills";
import { AuthContext } from "../../contexts/AuthContext"
import { getAPIClient } from "../../services/apiClient";

import styles from './styles.module.css';
import SkillStore from "../../components/SkillStore";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Minha conta</title>
      </Head>

      <main className="page-container">
        <div className="d-flex justify-content-between mb-5">
          {user?.role === RoleUser.teacher ? (
            <SkillNotification />
          ) : (
            <CardSkills />
          )}

          <CardUser />
        </div>

        {user?.role === RoleUser.student && (
          <SkillStore />
        )}
      </main>
    </>
  )
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

  return {
    props: {}
  }
}