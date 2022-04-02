import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

import styles from './styles.module.css';

export function RankingStudent() {
  const { theme, isHighContrast } = useContext(ThemeContext);

  return (
    <div className={`${styles["ranking-student"]} ${styles[`ranking-student-${theme}`]} w-100`}>
      <img src="/icons/user.svg" className={styles["ranking-student-avatar"]} alt="Avatar do estudante" />
      <div className={`ml-2 ${styles["student-info"]}`}>
        <h4>Higor Guilhermino do Nascimento</h4>
        <div className={styles["student-score"]}>
          <div className="d-flex align-items-center mr-2 mt-1">
            <img src="/icons/crown.svg" style={{ height: '1.25rem' }} alt="Ícone de coroa" />
            <span className="text-uppercase ml-1" style={ !isHighContrast ? { color: 'var(--yellow)' } : {} }>
              50 pontos
            </span>
          </div>
          <div className="d-flex align-items-center mt-1">
            <img src="/icons/coins.svg" style={{ height: '1.5rem' }} alt="Ícone de moeda" />
            <span className="text-uppercase ml-1" style={ !isHighContrast ? { color: 'var(--green)' } : {} }>
              25 moedas
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}