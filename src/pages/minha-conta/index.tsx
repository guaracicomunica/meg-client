import { GetServerSideProps } from "next";
import Head from "next/head";
import { useContext } from "react"
import { parseCookies } from 'nookies'
import { ToastContainer, ToastOptions } from "react-toastify";

import SkillNotification from "../../components/SkillNotification";
import CardUser from "../../components/CardUser";
import { RoleUser } from "../../enums/enumRoleUser";
import CardSkills from "../../components/CardSkills";
import SkillStore from "../../components/SkillStore";
import { AuthContext } from "../../contexts/AuthContext"
import { getAPIClient } from "../../services/apiClient";
import { SkillNotificationType, SkillClaimedType, SkillStoreClasses, SkillToBuy } from "../../types/StoreSkill";
import { User, UserStatusGamification } from "../../types/User";
import { ThemeContext } from "../../contexts/ThemeContext";
import { options } from "../../utils/defaultToastOptions";

import styles from "./styles.module.css";

export default function MinhaConta(props) {
  const { user } = useContext(AuthContext);
  const isStudent = user?.role === RoleUser.student;
  const isTeacher = user?.role === RoleUser.teacher;

  const { theme, isHighContrast } = useContext(ThemeContext);

  const toastOptions: ToastOptions = {
    ...options,
    hideProgressBar: isHighContrast ? true : false,
    theme: isHighContrast ? "dark" : "light"
  }

  return (
    <>
      <Head>
        <title>Minha conta</title>
      </Head>

      <main className={`page-container ${styles["page-layout"]}`}>
        {isStudent && (
          <div className="d-flex flex-column">
            <CardSkills skills={props.skills} />
            <SkillStore classes={props.studentClasses} skills={props.skillToBuy} />
          </div>
        )}
        {isTeacher && <SkillNotification notifications={props.notifications} />}
        <CardUser coins={props?.userGamification?.coins}/>
      </main>

      <ToastContainer {...toastOptions} />
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
    const isTeacher = user?.role === RoleUser.teacher;
    const isStudent = user?.role === RoleUser.student;

    try {
      if (isTeacher) {
        const response = await apiClient.get('store/skills/teacher/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: { 
            per_page: 10
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

      if (isStudent) {
        const responseSkillsClaimed = await apiClient.get('store/skills/student', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        const skills: SkillClaimedType[] = responseSkillsClaimed.data.data.map(skill => {
          return {
            id: skill.id,
            name: skill.name,
            claimed: skill.claimed,
          }
        });

        const responseGamification = await apiClient.get(`users/status/gamification/${user.id}`, {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        const userGamification: UserStatusGamification  = responseGamification.data;

        const responseClasses = await apiClient.get('classes', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          },
          params: { 
            per_page: 100
          }
        });
        const studentClasses: SkillStoreClasses[] = responseClasses.data.data.map(classroom => {
          return {
            id: classroom.id,
            name: classroom.name,
            nickname: classroom.nickname,
            banner: classroom?.banner,
            teacher: classroom.creator.name,
          }
        });

        const responseSkillsToBuy = await apiClient.get('store/skills/student/to-buy', {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        const skillToBuy: SkillToBuy[] = responseSkillsToBuy.data.skills.map(skill => {
          return {
            id: skill.id,
            name: skill.name,
            coins: skill.coins,
            path: skill?.path,
            classroomId: skill["classroom_id"],
          }
        });

        return {
          props: {
            skills,
            userGamification,
            studentClasses,
            skillToBuy
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