import { format, parseISO } from "date-fns";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";

import Comment from "../../../../../components/Comment";
import ModalAddFile from "../../../../../components/ModalAddFile";
import PrivateComment from "../../../../../components/PrivateComment";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { RoleUser } from "../../../../../enums/enumRoleUser";
import { getAPIClient } from "../../../../../services/apiClient";

import styles from './styles.module.css';

export default function Atividade() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [showModalAddFile, setShowModalAddFile] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  function addFile(data: any) {
    setFiles([
      ...files,
      data.file[0]
    ]);
  }

  return (
    <>
      <Head>
        <title>Título da atividade</title>
      </Head>

      <main className={`${styles["page-layout"]} mt-3`}>
        <div className="card-style p-4">
          <div className={`${styles["card-activity-header"]} border-bottom pb-4`}>
            <img src="/icons/activity-post.svg" alt="Atividade" />
            <div className={styles["info-activity"]}>
              <h5>Atividade 1</h5>
              <div className={styles["activity-deadline"]}>
                Data de entrega: {format(parseISO("2021-12-31 15:00:00"), "dd/MM/yyyy 'até' HH:mm")}
              </div>
            </div>
          </div>

          <div className="d-flex w-100 mt-3">
            <div className={styles["activity-grade"]}>Nota: 100 pontos</div>
            <div className={styles["activity-score"]}>60 XP | 60 moedas</div>
          </div>

          <div className="d-flex flex-column flex-md-row py-4">
            <div className={`pr-3 ${styles["activity-body"]}`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </div>

            {user?.role === RoleUser.teacher && (
              <div className={`${styles["delivery-cards"]} pl-md-4 mt-4 mt-md-0`}>
                <div className={`p-2 mr-3 ${styles["info-card"]}`}>
                  <div className={styles.quantity}>12</div>
                  <span>Entregue</span>
                </div>
                <div className={`p-2 ${styles["info-card"]}`}>
                  <div className={styles.quantity}>20</div>
                  <span>Trabalhos atribuídos</span>
                </div>
              </div>
            )}
          </div>

          {user?.role === RoleUser.teacher && (
            <div className="d-flex mt-3">
              <Link href={`/turmas/${router.query.id}/atividades/${router.query.slug}/corrigir`}>
                <a className="button button-blue text-uppercase">Corrigir atividade</a>
              </Link>
              <Link href={`/turmas/${router.query.id}/atividades/${router.query.slug}/editar`}>
                <a className="button button-blue text-uppercase ml-3">Editar atividade</a>
              </Link>
            </div>
          )}

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

        {user?.role === RoleUser.teacher ? (
          <div className={`card-style p-4 ${styles["card-private-comments"]}`}>
            <h5 className="pb-3 border-bottom">Dúvida dos participantes</h5>
            <PrivateComment />
          </div>
        ) : (
          <div>
            <div className={`card-style p-4 ${styles["card-send-activity"]}`}>
              <div className={`pb-3 border-bottom ${styles["card-send-activity-header"]}`}>
                <h5>Envie sua atividade</h5>
                <small className={styles.delivered}>ENTREGUE</small>
              </div>
              <div className={`mt-4 ${styles.attachments}`}>
                <h6 className="mb-3">Arquivos a serem enviados:</h6>
                {files.length > 0 ? (
                  files.map((file, index) => {
                    return (
                      <div className={styles["file"]} key={index}>
                        <img src="/icons/file.svg" alt="Ícone" />
                        <span>{file.name}</span>
                      </div>
                    )
                  })
                ) : (
                  <p>Nenhum arquivo anexado.</p>
                )}
              </div>
              <div className={styles["send-buttons"]}>
                <button
                  onClick={() => setShowModalAddFile(true)}
                  className={`button button-blue text-uppercase mt-2 ${styles["send-button"]}`}
                >
                  <img src="/icons/file-white.svg" alt="Arquivo" />
                  Anexar arquivo
                </button>
                <button className="button button-gray-outline text-uppercase mt-2">Marcar como concluída</button>
              </div>
            </div>

            <div className={`card-style mt-4 p-4 ${styles["card-send-private-comment"]}`}>
              <h5 className="pb-3 mb-4 border-bottom w-100">Dúvidas? Fale com o(a) professor(a)</h5>
              <PrivateComment />
              <form className="w-100 mt-3" method="post" id="send-private-comment">
                <textarea
                  name="comment"
                  id="comment"
                  rows={4}
                  className='textarea w-100 p-3'
                  placeholder="Faça um comentário privado..."
                ></textarea>
                <button
                  type='submit'
                  form="send-private-comment"
                  className='button button-blue mt-2'
                >Enviar</button>
              </form>
            </div>
          </div>
        )}
      </main>

      <ModalAddFile
        show={showModalAddFile}
        onHide={() => setShowModalAddFile(false)}
        addFile={addFile}
      />
    </>
  );
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