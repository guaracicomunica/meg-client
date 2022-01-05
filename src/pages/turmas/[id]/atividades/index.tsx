import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";

import CardActivity from "../../../../components/CardActivity";
import ModalAddTopic from "../../../../components/ModalAddTopic";
import { AuthContext } from "../../../../contexts/AuthContext";
import { RoleUser } from "../../../../enums/enumRoleUser";

import styles from './styles.module.css';

export default function Atividades() {
  const { user } = useContext(AuthContext);

  const [showModalAddTopic, setShowModalAddTopic] = useState(false);

  return (
    <>
      <Head>
        <title>Atividades de Turma 1</title>
      </Head>

      <main className="page-container">
        <div className={user?.role === RoleUser.teacher ? styles["list-activities-teacher"] : ""}>
          <Tab.Container id="topics-list" defaultActiveKey="first">
            <Row>
              <Col sm={12} lg={3} className="p-0 mb-3 mb-lg-0">
                <h1 className="title-gray mb-3">Tópicos da turma</h1>
                <Nav variant="pills" className="flex-lg-column">
                  <Nav.Item>
                    <Nav.Link className="mr-3 mr-lg-0" bsPrefix={styles.topic} eventKey="first">Salão principal</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link className="mr-3 mr-lg-0" bsPrefix={styles.topic} eventKey="second">Eventos do MEG</Nav.Link>
                  </Nav.Item>
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
                  <Tab.Pane eventKey="first">
                    <CardActivity key={1} />
                    <CardActivity key={2} />
                    <CardActivity key={3} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <CardActivity key={4} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

          <Link href="#">
            <a className={`${styles["create-activity"]} button button-blue d-flex align-items-center`}>
              <img src="/icons/plus-white.svg" style={{height: "1rem"}} />
              <span className="ml-2">Criar</span>
            </a>
          </Link>
        </div>

        <ModalAddTopic
          show={showModalAddTopic}
          onHide={() => setShowModalAddTopic(false)}
        />
      </main>
    </>
  )
}