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

export default function Dashboard(props: any) {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Minha conta</title>
      </Head>

      <main className="page-container">
        <div className="d-flex justify-content-between mb-5">
          {user?.role === RoleUser.teacher ? (
            <SkillNotification notifications={props.notifications} />
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
  } else {
    try {
      const response = await apiClient.get('store/skills/teacher/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: { 
          per_page: 2
        }
      });

      const notifications = response.data.data.map(notification => {
        return {
          id: notification.id,
          skill: notification.skill,
          classroom: notification.classroom,
          claimer: notification.claimer,
          createdAt: notification.created_at,
        }
      });

      const queryProps = {
        currentPage: response.data.meta.current_page,
        totalPages: response.data.meta.last_page,
      }

      return {
        props: {
          notifications,
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