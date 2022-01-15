import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { Col, Nav, Row, Spinner, Tab } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { ToastContainer } from "react-toastify";

import CardActivity from "../../../../components/CardActivity";
import ModalAddTopic from "../../../../components/ModalAddTopic";
import { AuthContext } from "../../../../contexts/AuthContext";
import { RoleUser } from "../../../../enums/enumRoleUser";
import { api } from "../../../../services/api";
import { getAPIClient } from "../../../../services/apiClient";
import { ActivityTopicType, ActivityType } from "../../../../types/Post";

import styles from './styles.module.css';

type ActivitiesPageProps = {
  topics: ActivityTopicType[];
  activitiesData: {
    activities: ActivityType[];
    queryProps: {
      currentPage: number;
      totalPages: number;
    }
  }
}

export default function Atividades(props: ActivitiesPageProps) {
  const { 'meg.token': token } = parseCookies();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [showModalAddTopic, setShowModalAddTopic] = useState(false);
  const [activitiesList, setActivitiesList] = useState<ActivityType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (props) {
      setActivitiesList(props.activitiesData.activities);
      setCurrentPage(props.activitiesData.queryProps.currentPage);
      setTotalPages(props.activitiesData.queryProps.totalPages)
    }
  }, [props]);

  useEffect(() => {
    if (currentPage === totalPages) {
      setHasMore(false);
    }
  }, [activitiesList, totalPages]);

  async function getMoreActivity(topicId?: number) {
    try {
      const response = await api.get('activities', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          page: currentPage + 1,
          per_page: 10,
          topic_id: topicId
        }
      });

      const formattedActivities: ActivityType[] = response.data.data.map(activity => {
        return {
          id: activity.post_id,
          name: activity.post.name,
          body: activity.post.body,
          deadline: activity?.deadline,
          points: activity.points,
          xp: activity.xp,
          coins: activity.coins,
          comments: activity.post.comments,
          topicId: activity.topic_id
         }
      });

      setCurrentPage(response.data.current_page);
      setActivitiesList([...activitiesList, ...formattedActivities]);
    }
    catch (error) {
      if (error.response.status === 401) {
        router.push('/sessao-expirada');
      }
    }
  }

  async function filterActivities(activeKey: number | string) {
    try {
      const response = await api.get('activities', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          per_page: 10,
          topic_id: activeKey !== "all" ? activeKey : ""
        }
      });

      const formattedActivities: ActivityType[] = response.data.data.map(activity => {
        return {
          id: activity.post_id,
          name: activity.post.name,
          body: activity.post.body,
          deadline: activity?.deadline,
          points: activity.points,
          xp: activity.xp,
          coins: activity.coins,
          comments: activity.post.comments,
          topicId: activity.topic_id
        }
      });

      setActivitiesList(formattedActivities);
      setCurrentPage(response.data.current_page);
      setTotalPages(response.data.last_page);
    }
    catch (error) {
      if (error.response.status === 401) {
        router.push('/sessao-expirada');
      }
    }
  }

  return (
    <>
      <Head>
        <title>Atividades da turma</title>
      </Head>

      <main className="page-container">
        <div className={user?.role === RoleUser.teacher ? styles["list-activities-teacher"] : ""}>
          <Tab.Container id="topics-list" defaultActiveKey="all" onSelect={filterActivities}>
            <Row>
              <Col sm={12} lg={3} className="p-0 mb-3 mb-lg-0">
                <h1 className="title-gray mb-3">Tópicos da turma</h1>
                <Nav variant="pills" className="flex-lg-column">
                  <Nav.Item>
                    <Nav.Link className="mr-3 mr-lg-0" bsPrefix={styles.topic} eventKey="all">Todas as atividades</Nav.Link>
                  </Nav.Item>
                  {props.topics.map((topic) => {
                    return (
                      <Nav.Item key={topic.id}>
                        <Nav.Link className="mr-3 mr-lg-0" bsPrefix={styles.topic} eventKey={topic.id} >
                          {topic.name}
                        </Nav.Link>
                      </Nav.Item>
                    )
                  })}
                  
                  {user?.role === RoleUser.teacher && (
                    <Nav.Item onClick={() => setShowModalAddTopic(true)}>
                      <Nav.Link className="mr-3 mr-lg-0" bsPrefix={styles["add-topic"]}>
                        +
                      </Nav.Link>
                    </Nav.Item>
                  )}
                </Nav>
              </Col>
              <Col sm={12} lg={9} className="px-0 pl-lg-4">
                <Tab.Content>
                  <Tab.Pane eventKey="all">
                    <InfiniteScroll
                      style={{overflow: 'hidden'}}
                      dataLength={activitiesList.length}
                      next={getMoreActivity}
                      hasMore={hasMore}
                      loader={<div className={styles["loading-container"]}><Spinner animation="border" /></div>}
                    >
                      {activitiesList.length > 0 ? (
                        activitiesList.map(activity => {
                          return <CardActivity key={activity.id} activity={activity} />
                        })
                      ) : (
                        <p>Não há atividades cadastradas nesta turma.</p>
                      )}
                    </InfiniteScroll>
                  </Tab.Pane>
                  {props.topics.map(topic => {
                    return (
                      <Tab.Pane eventKey={topic.id} key={topic.id}>
                        <InfiniteScroll
                          style={{overflow: 'hidden'}}
                          dataLength={activitiesList.length}
                          next={() => getMoreActivity(topic.id)}
                          hasMore={hasMore}
                          loader={<div className={styles["loading-container"]}><Spinner animation="border" /></div>}
                        >
                          {activitiesList.length > 0 ? (
                            activitiesList.map(activity => {
                              return <CardActivity key={activity.id} activity={activity} />
                            })
                          ) : (
                            <p>Não há atividades cadastradas neste tópico.</p>
                          )}
                        </InfiniteScroll>
                      </Tab.Pane>
                    )
                  })}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

          <Link href={`/turmas/${router.query.id}/atividades/criar`}>
            <button
              disabled={props.topics.length === 0}
              className={`${styles["create-activity"]} button button-blue d-flex align-items-center`}
            >
              <img src="/icons/plus-white.svg" style={{height: "1rem"}} />
              <span className="ml-2 text-white">Criar</span>
            </button>
          </Link>
        </div>

        <ModalAddTopic
          classroom_id={Number(router.query.id)}
          show={showModalAddTopic}
          onHide={() => setShowModalAddTopic(false)}
        />
      </main>

      <ToastContainer />
    </>
  )
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
      const response = await apiClient.get('activities', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: { 
          per_page: 10
        }
      });

      const { data: activities } = response.data;
      
      const formattedActivities: ActivityType[] = activities.map(activity => {
        return {
          id: activity.post_id,
          name: activity.post.name,
          body: activity.post.body,
          deadline: activity?.deadline,
          points: activity.points,
          xp: activity.xp,
          coins: activity.coins,
          comments: activity.post.comments,
          topicId: activity.topic_id
         }
      });

      const queryProps = {
        currentPage: response.data.current_page,
        totalPages: response.data.last_page,
      }

      const topicsOfThisClassroom = await apiClient.get("topics", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params : {
          classroom_id: ctx.params.id
        }
      });

      const topics = topicsOfThisClassroom.data.data;
  
      return {
        props: {
          topics,
          activitiesData: {
            activities: formattedActivities,
            queryProps
          }
        },
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