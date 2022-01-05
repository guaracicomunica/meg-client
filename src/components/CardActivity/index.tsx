import Link from 'next/link';
import { useState } from 'react';

import Comment from '../Comment';

import styles from './styles.module.css';

export default function CardActivity() {
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  return (
    <div className={`${styles["card-activity"]} mb-4 p-4`}>
      <div
        className={styles["card-activity-header"]}
        onClick={() => setIsCardExpanded(!isCardExpanded)}
      >
        <img src="/icons/activity-post.svg" alt="Atividade" />
        <div className={styles["info-activity"]}>
          <h5>Atividade II - Cartografia</h5>
          <div className={styles["activity-deadline"]}>Data de entrega: 29/06/2021 até 23:59</div>
        </div>
      </div>
      {isCardExpanded && (
        <>
          <div className={styles["card-activity-body"]}>
            <div className="d-flex py-2">
              <div className={styles["activity-grade"]}>Nota: 30 pontos</div>
              <div className={styles["activity-score"]}>60 XP | 10 moedas</div>
            </div>
            <div className={`py-2 ${styles["activity-content"]}`}>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
              <div></div>
            </div>
            <div className={`${styles["post-comments"]} my-4 py-4`}>
              <div className={styles["post-comments-title"]}>
                <img src="/icons/comments.svg" alt="Comentários da turma" style={{height: "1.25rem"}} />
                <h5>1 comentário da turma</h5>
              </div>

              <div>
                <Comment
                  key={1}
                  id={1}
                  commentCreator="Fabiana Pereira"
                  date="21 de Jun."
                  commentBody="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                />
              </div>

              <div className={`${styles["add-comment"]} mt-4 w-100`}>
                <img src="/icons/user-gray.svg" alt="Minha foto do perfil" style={{height: "3rem"}} />
                <form id="post-comment">
                  <input
                    className='form-input w-100'
                    type="text"
                    name="comment"
                    placeholder='Adicionar comentário para a turma...'
                  />
                </form>
              </div>
            </div>
          </div>

          <div className={styles["card-activity-footer"]}>
            <Link href="#">
              <a className='button button-blue-dark-outline text-uppercase px-5'>Acessar a atividade</a>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}