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
import { SkillNotificationType, SkillClaimedType } from "../../types/StoreSkill";
import { User, UserStatusGamification } from "../../types/User";

export default function MinhaConta(props) {
  const { user } = useContext(AuthContext);
  const isStudent = user?.role === RoleUser.student;
  const isTeacher = user?.role === RoleUser.teacher;

  return (
    <>
      <Head>
        <title>Minha conta</title>
      </Head>

      <main className="page-container">
        <div className="d-flex flex-wrap justify-content-between">
          {isTeacher && <SkillNotification notifications={props.notifications} />}
          {isStudent && <CardSkills skills={props.skills} />}
          <CardUser coins={props?.userGamification?.coins}/>
        </div>
        {isStudent && (
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
  const { ['meg.user']: userData } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/sessao-expirada',
        permanent: false,
      }
    }
  } else {

    const user: User = JSON.parse(userData);

    try {
      if (user?.role === RoleUser.teacher) {
        const response = await apiClient.get('store/skills/teacher/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: { 
            per_page: 2
          }
        });

        const notifications: SkillNotificationType[] = response.data.data.map(notification => {
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
      }

      if (user?.role === RoleUser.student) {
        const response = await apiClient.get('store/skills/student', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const responseGamification = await apiClient.get(`users/status/gamification/${user.id}`,{ headers:{ 'Authorization': `Bearer ${token}` }});

        const userGamification: UserStatusGamification  = responseGamification.data

        const skills: SkillClaimedType[] = response.data.data.map(skill => {
          return {
            id: skill.id,
            name: skill.name,
          }
        });

        return {
          props: {
            skills,
            userGamification
          }
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