import { GetServerSideProps } from "next";
import Head from "next/head";
import { useContext } from "react"
import { parseCookies } from 'nookies'
import { ToastContainer } from "react-toastify";

import SkillNotification from "../../components/SkillNotification";
import CardUser from "../../components/CardUser";
import { RoleUser } from "../../enums/enumRoleUser";
import CardSkills from "../../components/CardSkills";
import SkillStore from "../../components/SkillStore";
import { AuthContext } from "../../contexts/AuthContext"
import { getAPIClient } from "../../services/apiClient";
import { SkillNotificationType } from "../../types/Notification";
import { QueryProps } from "../../types/Query";

type MyAccountProps = {
  notifications: SkillNotificationType[];
  queryProps: QueryProps;
}

export default function MinhaConta(props: MyAccountProps) {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Minha conta</title>
      </Head>

      <main className="page-container">
        <div className="d-flex flex-wrap justify-content-between">
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

      <ToastContainer />
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

      const notifications : SkillNotificationType[] = response.data.data.map(notification => {
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