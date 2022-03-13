import { format, parseISO } from "date-fns";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import AttachmentFile from "../../../../../components/AttachmentFile";
import AttachmentLink from "../../../../../components/AttachmentLink";
import CommentList from "../../../../../components/CommentList";
import ModalAddFile from "../../../../../components/ModalAddFile";
import PrivateComment from "../../../../../components/PrivateComment";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { RoleUser } from "../../../../../enums/enumRoleUser";
import { api } from "../../../../../services/api";
import { getAPIClient } from "../../../../../services/apiClient";
import { ActivityType, CommentType } from "../../../../../types/Post";
import { genericMessageError, options } from "../../../../../utils/defaultToastOptions";

import styles from './styles.module.css';

type CommentForm = {
  body: string;
  is_private: boolean;
  comment_id: number;
}

export default function Atividade(props: ActivityType) {
  const router = useRouter();
  const { 'meg.token': token } = parseCookies();
  const { user } = useContext(AuthContext);
  const [showModalAddFile, setShowModalAddFile] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { register, handleSubmit, reset } = useForm({defaultValues: {
    body: ""
  }});
  const current_route: string = `/turmas/${router.query.id}/missoes/${router.query.slug}`;

  function addFile(data: any) {
    setFiles([
      ...files,
      data.file[0]
    ]);
  }

  function deleteFile(fileIndex: number) {
    const newFiles = files.filter((file, index) => {
      if (index !== fileIndex) {
        return file;
      }
    });

    setFiles(newFiles);
  }

  const onSubmit = async (data: CommentForm) => handleCreateComment(data);

  async function handleCreateComment(data: CommentForm) {
    data.is_private = true;
    
    let commentsThisUser:CommentType[] = props.comments.filter( 
      comment => comment.is_private  
      && comment.comment_id == null 
      && comment.creator.id == user?.id
    );

    if(commentsThisUser.length > 0)
      data.comment_id = commentsThisUser[0].id; //pegar esse comentário
    else data.comment_id = null;

    try {
      await api.post('comments', data, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          'post_id': props.postId,
          'user_id': user.id
        }
      })
      .then(function (success) {
        reset({
          body: ""
        });

        toast.success("Comentário enviado com sucesso!", options);
        
        router.push(current_route, undefined, {scroll: false});
      });
    }
    catch(error) { 
      if (!error.response) {
        // network error
        return toast.error(genericMessageError, options);
      }
      switch (error.response.status) {
        case 401:
          return {
            redirect: {
              destination: '/sessao-expirada',
              permanent: false,
            }
          }
        
        case 400:
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : genericMessageError, options);
          break;

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });
          break;

        case 500: 
          toast.error(genericMessageError, options);
          break;

        default:
          toast.error(genericMessageError, options);
          break;
      }
    }
   }

  function generateFormData() {
    const form = new FormData();
  
    form.append('activity_id', props.id.toString());
 
    for (let i = 0; i < files.length; i++) {
      form.append(`files[${i}]`, files[i]);
    }

    return form;
  }

  async function completeActivity() {
    const request = generateFormData();

    try {
      const { ['meg.token']: token } = parseCookies();
      
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      await api.post('activities/delivery', request).then(function (success) { 
        router.push(`/turmas/${router.query.id}/missoes/${props.id}`, undefined, {scroll: false});
        toast.success("Atividade marcada como concluída", options);
      });
    } catch (error) {
      if (!error.response) {
        // network error
        return toast.error(genericMessageError, options);
      }
      switch (error.response.status) {
        case 401:
          return {
            redirect: {
              destination: '/sessao-expirada',
              permanent: false,
            }
          }
        case 400:
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : genericMessageError, options);
          break;

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });
          break;

        case 500: 
          toast.error(genericMessageError, options);
          break;

        default:
          toast.error(genericMessageError, options);
          break;
      }
    }
  }

  async function withDrawActivity() {
    const request = generateFormData();

    try {
      const { ['meg.token']: token } = parseCookies();
      
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      await api.post('activities/cancel', request).then(function (success) { 
        router.push(`/turmas/${router.query.id}/missoes/${props.id}`, undefined, {scroll: false});
        toast.success("Entrega da atividade foi cancelada", options);
      });
    } catch (error) {
      if (!error.response) {
        // network error
        return toast.error(genericMessageError, options);
      }
      switch (error.response.status) {
        case 401:
          return {
            redirect: {
              destination: '/sessao-expirada',
              permanent: false,
            }
          }
        case 400:
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : genericMessageError, options);
          break;

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });
          break;

        case 500: 
          toast.error(genericMessageError, options);
          break;

        default:
          toast.error(genericMessageError, options);
          break;
      }
    }
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
                {props.deadline !== null
                  ? <p>Data de entrega: {format(parseISO(`${props.deadline}`), "dd/MM/yyyy 'até' HH:mm")}</p> 
                  : <p>Sem data de entrega</p>
                }
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between w-100 mt-3">
            <div className="d-flex">
              <div className={styles["activity-grade"]}>Nota: {props.points} pontos</div>
              <div className={styles["activity-score"]}>{props.xp} XP | {props.coins} moedas</div>
            </div>
            {user?.role === RoleUser.teacher && (
              <div className={styles["activity-status"]}>
                {props.disabled 
                  ? <span className={styles.inactive}>Inativo</span>  
                  : <span className={styles.active}>Ativo</span>
                }
              </div>
            )}
          </div>

          <div className="d-flex flex-column flex-md-row w-100 py-4">
            <div className={`pr-3 w-100 ${styles["activity-body"]}`}>{props.body}</div>

            {user?.role === RoleUser.teacher && (
              <div className={`${styles["delivery-cards"]} pl-md-4 mt-4 mt-md-0`}>
                <div className={`p-2 mr-3 ${styles["info-card"]}`}>
                  <div className={styles.quantity}>{props.totalDeliveredActivities}</div>
                  <span>Entregue</span>
                </div>
                <div className={`p-2 ${styles["info-card"]}`}>
                  <div className={styles.quantity}>{props.totalAssignments}</div>
                  <span>Trabalhos atribuídos</span>
                </div>
              </div>
            )}
          </div>

          <div className="d-flex w-100">
            {props.attachments.length > 0 && props.attachments.map((attachment, index) => {
              if (attachment.is_external_link === 1) {
                return <AttachmentLink key={index} index={index+1} path={attachment.path} />
              }
              else {
                return <AttachmentFile key={index} index={index+1} path={attachment.path} />
              }
            })}
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

          <CommentList 
            postId={props.postId}
            comments={props.comments.filter(comment => !comment.is_private)}
            redirectTo={`/turmas/${router.query.id}/missoes/${router.query.slug}`}
          />
        </div>

        {user?.role === RoleUser.teacher ? (
          <div className={`card-style p-4 ${styles["card-private-comments"]}`}>
            <h5 className="pb-3 border-bottom">Dúvida dos participantes</h5>
            
            {props?.comments.length > 0
            ? (
              props.comments?.filter(comment => comment.is_private && comment.comment_id == null ).map((comment, index) => {
                return (
                  <PrivateComment
                    key={index}
                    id={comment.id}
                    creator={{
                      name: comment.creator.name,
                      avatar: null,
                    }}
                    date={comment?.date}
                    is_private={true}
                    body={comment.body}
                    comments={comment?.comments}
                    postId={props.postId}
                    redirectTo={`/turmas/${router.query.id}/missoes/${router.query.slug}`}
                  />
                );
              })
            ) : 'Não há duvidas postadas no momento.'}
          </div>
        ) : (
          <div>
            <div className={`card-style p-4 ${styles["card-send-activity"]}`}>
              <div className={`pb-3 border-bottom ${styles["card-send-activity-header"]}`}>
                <h5>Envie sua missão</h5>
                {props?.userActivity?.delivered_at != null ? (
                  <small className={styles.delivered}>Entregue</small> 
                ) : (
                  <small className={styles.pending}>Pendente</small>
                )}
              </div>
              {props?.userActivity?.delivered_at == null && (
                <div className={`mt-4 ${styles.attachments}`}>
                  <h6 className="mb-3">Arquivos a serem enviados:</h6>
                  {files.length > 0 ? (
                    files.map((file, index) => {
                      return (
                        <div className={styles["file"]} key={index}>
                          <img src="/icons/file.svg" alt="Ícone" />
                          <span>{file.name}</span>
                          {props?.userActivity?.delivered_at == null && (
                            <button
                              type="button"
                              onClick={() => deleteFile(index)}
                              className={styles["delete-attachment"]}
                            >
                              <img src="/icons/x.svg" alt="Excluir" />
                            </button> 
                          )}
                        </div>
                      )
                    })
                  ) : (
                    <p>Nenhum arquivo anexado.</p>
                  )}
                </div>
              )}
              <div className={`${styles["send-buttons"]} mt-3`}>
                {props?.userActivity?.delivered_at == null ? (
                  <>
                    <button
                      onClick={() => setShowModalAddFile(true)}
                      className={`button button-blue text-uppercase mt-2 ${styles["send-button"]}`}
                    >
                      <img src="/icons/file-white.svg" alt="Arquivo" />
                      Anexar arquivo
                    </button>
                    <button
                      onClick={completeActivity}
                      className="button button-gray-outline text-uppercase mt-2"
                    >Entregar atividade</button>
                  </>
                ) : (
                  <button
                    onClick={withDrawActivity}
                    className="button button-gray-outline text-uppercase mt-2"
                  >Cancelar entrega da atividade</button>
                )}
              </div>
            </div>

            <div className={`card-style mt-4 p-4 ${styles["card-send-private-comment"]}`}>
              <h5 className="pb-3 mb-4 border-bottom w-100">Dúvidas? Fale com o(a) professor(a)</h5>
              {props?.comments.length > 0 && (
                props.comments?.filter(comment => 
                  comment.is_private 
                  && comment.comment_id == null 
                  && comment.creator.id == user?.id)
                .map((comment, index) => {
                  return (
                    <PrivateComment
                      key={index}
                      id={comment.id}
                      creator={{
                        name: comment.creator.name,
                        avatar: null,
                      }}
                      date={comment?.date}
                      is_private={true}
                      body={comment.body}
                      comments={comment?.comments}
                      postId={props.postId}
                      redirectTo={`/turmas/${router.query.id}/missoes/${router.query.slug}`}
                    />
                  )}
                )
              )}
              <form
                className="w-100 mt-3"
                method="post"
                id="send-private-comment"
                onSubmit={handleSubmit(onSubmit)}
              >
                <textarea
                  name="comment"
                  id="comment"
                  rows={4}
                  className='textarea w-100 p-3'
                  placeholder="Faça um comentário privado..."
                  {...register('body')}
                ></textarea>
                <button type="submit" form="send-private-comment">
                  <img src="/icons/send.svg" alt="Enviar" />
                </button>
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

      <ToastContainer />
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

      const formattedActivity: ActivityType = {  
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
        attachments: activity.attachments,
        totalAssignments: activity.totalAssignments ?? 0,
        totalDeliveredActivities: activity.totalDeliveredActivities ?? 0,
        userActivity: activity.assignment ?? null,
      }

      return { props: formattedActivity }

    } catch(error) {
      switch (error.response?.status ?? 0) {
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