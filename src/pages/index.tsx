import Head from 'next/head';

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mundo Encantado da Geografia</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main>
        <section className={`${styles["home-banner"]}`}>
          <div className="col-8 col-md-4 flex-column">
            <img
              src="./images/meg-logo.svg"
              alt="Logo do MEG"
              className={styles["logo-home"]}
            />
            <h1 className={`${styles["title-home"]} mt-4`}>
              Seja bem-vindo ao Mundo Encantado da Geografia!
            </h1>
          </div>

          <div className="col-6 col-lg-5 my-5 my-md-0">
            <img
              src="./images/illustration-home.svg"
              className="img-fluid"
            />
          </div>
        </section>

        <section className="section d-flex flex-column align-items-center">
          <div className="col-11 col-lg-5 justify-content-center">
            <h1 className="title-primary text-center">
              Conheça o Mundo Encantado da Geografia (MEG)
            </h1>
            <hr className="border-blue" />
          </div>
          
          <div className="col-11 col-lg-7">
            <p className="text-section text-center">
              Donec accumsan, dolor ac malesuada rhoncus, leo arcu pellentesque dolor, nec tristique diam neque vitae sem. Nulla a lectus sollicitudin, volutpat lacus id, eleifend ipsum. Donec accumsan, dolor ac malesuada rhoncus, leo arcu pellentesque dolor, nec tristique diam neque vitae sem.
            </p>
          </div>
          
          <div className="col-11 col-md-7 d-flex flex-wrap justify-content-center">
            <div className={styles.keyword}>gamificação</div>
            <div className={styles.keyword}>geografia</div>
            <div className={styles.keyword}>arte</div>
            <div className={styles.keyword}>diversidade</div>
            <div className={styles.keyword}>tecnologia</div>
          </div>
        </section>

        <section className="section row justify-content-around align-items-center">
          <div className="col-11 col-lg-4 mb-5 mb-lg-0 flex-column">
            <h1 className="text-center title-secondary">
              Veja como o Mundo Encantado da Geografia funciona
            </h1>
            <img
              src="./icons/arrow-down.svg"
              className={styles["arrow-down-icon"]}
            />
          </div>

          <div className="col-9 col-lg-5 mt-5 mt-lg-0">
            <img
              src="./images/illustration-home-2.svg"
              className="img-fluid"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
