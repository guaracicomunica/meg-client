import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SkillNotificationType } from '../../types/StoreSkill';

import styles from './styles.module.css';

type SkillNotificationProps = {
  notifications: SkillNotificationType[];
};

export default function SkillNotification(props: SkillNotificationProps) {
  const { theme, isHighContrast } = useContext(ThemeContext);

  return (
    <div className={`card-style p-4 ${styles[`notification-${theme}`]}`}>
      <div className={`border-bottom pb-3 ${styles["card-header"]}`}>
        <img src="/icons/notification.svg" alt="Notificações" className={isHighContrast ? "img-contrast-white" : ""} />
        <h4>Notificações da Loja</h4>
      </div>
      {props.notifications.length > 0 && props.notifications.map(notification => {
        return (
          <div className={`p-3 mt-3 ${styles.notification}`} key={notification.id}>
            <img src={notification.claimer.avatar ?? "/icons/user.svg"} alt="Avatar do estudante" />
            <div className={`${styles["student-name"]} px-3 border-right`}>{notification.claimer.name}</div>
            <div className={`${styles["class"]} px-3 border-right`}>{notification.classroom}</div>
            <div className={`${styles["skill"]} pl-3`}>
              <strong>Reivindicou:</strong>
              <span>{notification.skill}</span>
            </div>
          </div>
        );
      })}
      {props.notifications.length === 0 && <p className='mt-3'>Nenhuma notificação.</p>}
    </div>
  );
}