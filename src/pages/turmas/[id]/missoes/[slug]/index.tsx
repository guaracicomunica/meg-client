import { format, parseISO } from "date-fns";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";

import Comment from "../../../../../components/Comment";
import CommentList from "../../../../../components/CommentList";
import ModalAddFile from "../../../../../components/ModalAddFile";
import PrivateComment from "../../../../../components/PrivateComment";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { RoleUser } from "../../../../../enums/enumRoleUser";
import { getAPIClient } from "../../../../../services/apiClient";
import { ActivityType } from "../../../../../types/Post";

import styles from './styles.module.css';

export default function Atividade(props: ActivityType) {
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
        <title>{props.name}</title>
      </Head>

      <main className={`${styles["page-layout"]} mt-3`}>
        <div className="card-style p-4">
          <div className={`${styles["card-activity-header"]} border-bottom pb-4`}>
            <img src="/icons/activity-post.svg" alt="Missão" />
            <div className={styles["info-activity"]}>
              <h5>{props.name}</h5>
              <div className={styles["activity-deadline"]}>
                Data de entrega: {format(parseISO("2021-12-31 15:00:00"), "dd/MM/yyyy 'até' HH:mm")}
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between w-100 mt-3">
            <div className="d-flex">
              <div className={styles["activity-grade"]}>Nota: {props.points} pontos</div>
              <div className={styles["activity-score"]}>{props.xp} XP | {props.coins} moedas</div>
            </div>
            <div className={styles["activity-status"]}>
              {props.disabled 
                ? <span className={styles.inactive}>Inativo</span>  
                : <span className={styles.active}>Ativo</span>
              }
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row py-4">
            <div className={`pr-3 ${styles["activity-body"]}`}>
                {props.body}
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
              <Link href={`/turmas/${router.query.id}/missoes/${router.query.slug}/corrigir`}>
                <a className="button button-blue text-uppercase">Corrigir missão</a>
              </Link>

              <Link href={`/turmas/${router.query.id}/missoes/${router.query.slug}/editar`}>
                <a className="ml-4 button button-blue text-uppercase">Editar missão</a>
              </Link>
            </div>
          )}

          <CommentList postId={props.postId} comments={props.comments} redirectTo={`/turmas/${router.query.id}/missoes/${router.query.slug}`}/>
        </div>

        {user?.role === RoleUser.teacher ? (
          <div className={`card-style p-4 ${styles["card-private-comments"]}`}>
            <h5 className="pb-3 border-bottom">Dúvida dos participantes</h5>
            
            {props.comments?.filter(comment => comment.is_private).map((comment, index) => {
              return (
                <PrivateComment
                  key={index}
                  id={comment.id}
                  creator={"joão"}
                  date={"d"}
                  is_private={true}
                  body={"b"}
                />
              );
            })}
          </div>
        ) : (
          <div>
            <div className={`card-style p-4 ${styles["card-send-activity"]}`}>
              <div className={`pb-3 border-bottom ${styles["card-send-activity-header"]}`}>
                <h5>Envie sua missão</h5>
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
              <PrivateComment
                key={1}
                id={1}
                creator={"joão"}
                date={"d"}
                is_private={true}
                body={"b"}
              />
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
  else {

    try {
       const {data: activity} = await apiClient.get<any>(`activities/${ctx.params.slug}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const formattedActivity: ActivityType  = 
          {  
          id: activity.id,
          name: activity.name,
          body: activity.body,
          deadline: activity?.deadline,
          points: activity.points,
          xp: activity.xp,
          coins: activity.coins,
          comments: activity.comments,
          topicId: activity.topicId,
          postId: activity.postId,
          disabled: activity.disabled,
          attachments: activity.attachments
         }
      return { props: formattedActivity }
    } catch(error) {
     switch (error.response.status) {
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