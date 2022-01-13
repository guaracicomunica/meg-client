import { format, parseISO } from "date-fns";
import Head from "next/head";
import Link from "next/link";

import Comment from "../../../../../components/Comment";
import PrivateComment from "../../../../../components/PrivateComment";

import styles from './styles.module.css';

export default function Atividade() {
  return (
    <>
      <Head>
        <title>Título da atividade</title>
      </Head>

      <main className={`${styles["page-layout"]} mt-3`}>
        <div className={`card-style p-4 ${styles["card-activity"]}`}>
          <div className={`${styles["card-activity-header"]} border-bottom pb-4`}>
            <img src="/icons/activity-post.svg" alt="Atividade" />
            <div className={styles["info-activity"]}>
              <h5>Atividade 1</h5>
              <div className={styles["activity-deadline"]}>
                Data de entrega: {format(parseISO("2021-12-31 15:00:00"), "dd/MM/yyyy 'até' HH:mm")}
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row py-4">
            <div className={`pr-3 ${styles["activity-body"]}`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>

            <div className={`${styles["delivery-cards"]} pl-md-4 mt-4 mt-md-0`}>
              <div className={`p-3 mr-3 ${styles["info-card"]}`}>
                <div className={styles.quantity}>12</div>
                <span>Entregue</span>
              </div>
              <div className={`p-3 ${styles["info-card"]}`}>
                <div className={styles.quantity}>20</div>
                <span>Trabalhos atribuídos</span>
              </div>
            </div>
          </div>

          <div className="d-flex mt-3">
            <Link href="#">
              <a className="button button-blue text-uppercase">Corrigir atividade</a>
            </Link>
          </div>

          <div className={`${styles["post-comments"]} my-4 py-4`}>
            <div className={styles["post-comments-title"]}>
              <img src="/icons/comments.svg" alt="Comentários da turma" style={{height: "1.25rem"}} />
              <h5>3 Comentários da turma</h5>
            </div>

            <div>
              <Comment
                key={1}
                id={1}
                creator="aa"
                date="2021-12-31 15:00:00"
                body="aaa"
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

        <div className={`card-style p-4 ${styles["card-private-comments"]}`}>
          <h5 className="pb-3 border-bottom">Dúvida dos participantes</h5>
          <PrivateComment />
        </div>
      </main>
    </>
  );
}