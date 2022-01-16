import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import StudentFile from '../../../../../../components/StudentFile';
import { api } from '../../../../../../services/api';
import { getAPIClient } from '../../../../../../services/apiClient';
import { ActivityStudent } from '../../../../../../types/Post';
import { options } from '../../../../../../utils/defaultToastOptions';

import styles from './styles.module.css';

type CorrectActivityProps = {
  totalDeliveredActivities: number;
	totalAssignments: number;
	classroom: string;
	deadline: string;
	users: ActivityStudent[];
}

type UserGrade = {
  id: number;
  grade: number;
}

type DataFormGrades = {
  users: UserGrade[];
}

export default function Corrigir(props: CorrectActivityProps) {
  const router = useRouter();

  const { register, unregister, handleSubmit, reset, setValue } = useForm({defaultValues: {
    users: [],
    grade: 0
  }});

  const submitGradeToEachOne = async (data: DataFormGrades) => handleAssignGradeToEachOne(data);

  const submitGradeToAll = async (data: { grade: number }) => handleAssignGradeToAll(data);

  function generateFormData(data: DataFormGrades) {
    const form = new FormData();

    form.append('activity_id', router.query.slug.toString());

    for (let i = 0; i < data.users.length; i++) {
      form.append(`users[${i}][grade]`, data.users[i].grade.toString());
      form.append(`users[${i}][id]`, props.users[i].id.toString());
    }
    
    return form;
  }

  async function handleAssignGradeToEachOne(data: DataFormGrades) {
    try {
      const request = generateFormData(data);
      const { 'meg.token': token } = parseCookies();
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      await api.post('activities/grade', request)
      .then(function (success) {
        reset({
          users: [],
          grade: 0
        });
        toast.success("Notas cadastradas com sucesso!", options);
        router.push(`/turmas/${router.query.id}/missoes/${router.query.slug}`);
      });
    }
    catch(error) {
      const string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";

      if (!error.response) {
        // network error
        return toast.error(string, options);
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
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : string, options);

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });

        case 500: 
          toast.error(string, options);
          break;

        default:
          toast.error(string, options);
          break;
      }
    }
  }

  async function handleAssignGradeToAll(data: { grade: number }) {
    try {
      const request = new FormData();
      request.append('activity_id', router.query.slug.toString());
      for (let i = 0; i < props.users.length; i++) {
        request.append(`users[${i}][grade]`, data.grade.toString());
        request.append(`users[${i}][id]`, props.users[i].id.toString());
      }

      const { 'meg.token': token } = parseCookies();
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      await api.post('activities/grade', request)
      .then(function (success) {
        reset({
          users: [],
          grade: 0
        });
        toast.success("Notas cadastradas com sucesso!", options);
        router.push(`/turmas/${router.query.id}/missoes/${router.query.slug}`);
      });
    }
    catch(error) {
      const string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";

      if (!error.response) {
        // network error
        return toast.error(string, options);
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
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() : string, options);

        case 422:
          let errors = error.response?.data.errors;
          Object.keys(errors).forEach((item) => {
            toast.warning(errors[item][0], options);
          });

        case 500: 
          toast.error(string, options);
          break;

        default:
          toast.error(string, options);
          break;
      }
    }
  }

  return (
    <>
      <Head>
        <title>Corrigir missão</title>
      </Head>

      <main className={styles["page-layout"]}>
        <div className={`card-style p-4 ${styles["assign-grades"]}`}>
          {props.totalAssignments > 0 && (
            <>
              <div className={styles["assign-grades-all"]}>
                <h5 className='mb-3'>Atribuir nota para todos os alunos</h5>
                <form
                  method='post'
                  id="assign-grade-to-all-students"
                  autoComplete='off'
                  encType='multipart/form-data'
                  onSubmit={handleSubmit(submitGradeToAll)}
                >
                  <div className='form-row'>
                    <input
                      type="number"
                      name="grade"
                      className='form-control form-input'
                      placeholder='0/100'
                      {...register("grade")}
                    />
                    <button
                      type='submit'
                      form="assign-grade-to-all-students"
                      className='button button-blue-dark-outline text-uppercase ml-2'
                    >Atribuir</button>
                  </div>
                </form>
              </div>

              <hr className='my-4 w-100' />
            </>
          )}
          
          <div className={styles["assign-grades-each-one"]}>
            <form
              autoComplete='off'
              encType='multipart/form-data'
              method='post'
              id="assign-grades-to-each-student"
              onSubmit={handleSubmit(submitGradeToEachOne)}
            >
              {props.totalDeliveredActivities > 0 ? (
                props.users.map((student, index) => {
                  return (
                    <div key={student.id} className={`${styles["input-grade"]} mb-3`}>
                      <div className={`py-2 px-3 ${styles["student-info"]}`}>
                        <img src={student.avatar ?? '/icons/user-gray.svg'} alt="Avatar do aluno" />
                        <h6>{student.name}</h6>
                      </div>
                      <input
                        type="number"
                        name={`users[${index}][grade]`}
                        className='form-control form-input'
                        placeholder='0/100'
                        {...register(`users.${index}.grade`)}
                        defaultValue={student.points ?? ""}
                        min={0}
                        max={100}
                      />
                    </div>
                  )
                })
              ) : (
                <p>Nenhum estudante para atribuir nota</p>
              )}
              <hr className='mt-1 mb-4 w-100' />
              <button
                disabled={props.totalDeliveredActivities === 0}
                type='submit'
                form="assign-grades-to-each-student"
                className="button button-blue text-uppercase"
              >Postar notas</button>
            </form>
          </div>
        </div>

        <div className={styles["students-files"]}>
          <h1 className='mb-4'>{props.classroom}</h1>
          <div className="d-flex mb-4">
            <div className={`p-2 mr-3 ${styles["info-card"]}`}>
              <div className={styles.quantity}>{props.totalDeliveredActivities}</div>
              <span>Entregue</span>
            </div>
            <div className={`p-2 ${styles["info-card"]}`}>
              <div className={styles.quantity}>{props.totalAssignments}</div>
              <span>Trabalhos atribuídos</span>
            </div>
          </div>
          <div className={styles["files-list"]}>
            {props.totalDeliveredActivities > 0 ? (
              props.users.map(student => {
                return <StudentFile key={student.id} student={student} activityDeadline={props.deadline} />
              })
            ) : (
              <p>Nenhuma missão concluída.</p>
            )}
          </div>
        </div>
      </main>
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
      apiClient.defaults.headers['Authorization'] = `Bearer ${token}`
      const response = await apiClient.get('activities/solvers', {
        params: { 
          per_page: 10,
          activity_id: ctx.params.slug
        }
      });

      const totalDeliveredActivities = response.data.totalDeliveredActivities;
      const totalAssignments = response.data.totalAssignments
      const classroom = response.data.classroom
      const deadline = response.data.deadline
      const users = response.data.users

      return {
        props: {
          totalDeliveredActivities,
          totalAssignments,
          classroom,
          deadline,
          users,
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