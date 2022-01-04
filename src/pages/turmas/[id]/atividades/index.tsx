import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { AuthContext } from "../../../../contexts/AuthContext";
import { RoleUser } from "../../../../enums/enumRoleUser";

import styles from './styles.module.css';

export default function Atividades() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Atividades de Turma 1</title>
      </Head>

      <main className="page-container">
        <h1 className="title-gray mb-4">Tópicos da turma</h1>

        <div className={user?.role === RoleUser.teacher ? styles["list-activities-teacher"] : ""}>
          <Tab.Container id="topics-list" defaultActiveKey="first">
            <Row>
              <Col sm={3} className="p-0">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link bsPrefix={styles.topic} eventKey="first">Salão principal</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link bsPrefix={styles.topic} eventKey="second">Eventos do MEG</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9} className="pr-0" style={{paddingLeft: "2rem"}}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    first
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    second
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
      </main>
    </>
  )
}