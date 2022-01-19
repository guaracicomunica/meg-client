import { SkillNotificationType } from '../../types/Notification';

import styles from './styles.module.css';

type SkillNotificationProps = {
  notifications: SkillNotificationType[];
};

export default function SkillNotification(props: SkillNotificationProps) {
  return (
    <div className={`card-style mb-5 order-2 order-xl-1 p-4 col-xl-6 ${styles.notifications}`}>
      <div className={`border-bottom pb-3 ${styles["card-header"]}`}>
        <img src="/icons/notification.svg" alt="Notificações" />
        <h4>Notificações da Loja</h4>
      </div>
      {props.notifications.map(notification => {
        return (
          <div className={`p-3 mt-3 ${styles.notification}`} key={notification.id}>
          <img src={notification.claimer.avatar ?? "/icons/user-gray.svg"} alt="Avatar do estudante" />
          <div className={`${styles["student-name"]} px-3 border-right`}>{notification.claimer.name}</div>
          <div className={`${styles["class"]} px-3 border-right`}>{notification.classroom}</div>
          <div className={`${styles["skill"]} pl-3`}>
            <strong>Reivindicou a habilidade</strong>
            <span>{notification.skill}</span>
          </div>
        </div>
        );
      })}
    </div>
  );
}