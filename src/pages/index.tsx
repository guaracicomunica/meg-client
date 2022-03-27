import Head from 'next/head';
import { useContext } from 'react';

import { CardHome } from '../components/CardHome';
import { ThemeContext } from '../contexts/ThemeContext';
import { enumTheme } from '../enums/enumTheme';

import styles from "./home.module.css";

export default function Home() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Mundo Encantado da Geografia</title>
      </Head>

      <main className={`${styles.main} page-container ${styles[`theme-${theme}`]}`}>
        <section className={styles["home-banner"]}>
          <div className="col-11 col-lg-3 flex-column">
            <img
              src="./images/meg-logo.png"
              alt="Logo do MEG"
              className={theme === enumTheme.contrast ? `${styles["logo-home"]} img-contrast-white` : styles["logo-home"]}
            />
            <h1 className={`${styles["title-home"]} mt-4`}>Seja bem-vindo ao Mundo Encantado da Geografia!</h1>
          </div>

          <div className="col-11 col-lg-4 mt-5 my-lg-0">
            <img src="./images/illustration-home.svg" className="img-fluid" />
          </div>
        </section>

        <section className="d-flex flex-column align-items-center">
          <div className="col-12 col-lg-5 justify-content-center">
            <h1 className="title-blue-dark text-center">Conheça o Mundo Encantado da Geografia (MEG)</h1>
            <hr className={styles["border-soft-blue"]} />
          </div>
          
          <div className="col-12 col-lg-7">
            <p className="text-blue-dark text-center">
              Seja bem-vindo(a) ao MEG – O Mundo Encantado da Geografia! O MEG é um projeto de ensino que tem como objetivo aperfeiçoar o processo de ensino e de aprendizagem através da interdisciplinaridade e da gamificação.
            </p>
            <p className="text-blue-dark text-center">
              O projeto tem como questão norteadora: como vencer o monstro da ignorância? Focado na storytelling, as narrativas são construídas considerando-se o mundo das lendas, dos contos de fadas, das sagas, dos seriados e dos filmes.
            </p>
            <p className="text-blue-dark text-center">
              Aqui você encontrará um ambiente para se conectar e, de forma colaborativa e com perseverança, solucionar todas as missões e conquistar a chave dourada do conhecimento, de onde quer que esteja.
            </p>
          </div>
          
          <div className="col-12 col-lg-8 d-flex flex-wrap justify-content-center">
            <div className={styles.keyword}>MEG</div>
            <div className={styles.keyword}>Geografia</div>
            <div className={styles.keyword}>Interdisciplinaridade</div>
            <div className={styles.keyword}>Gamificação</div>
            <div className={styles.keyword}>Storytelling</div>
            <div className={styles.keyword}>Ensino</div>
          </div>
        </section>

        <section className="row justify-content-around align-items-center">
          <div className="col-12 col-lg-4 mb-5 mb-lg-0 flex-column">
            <h1 className={styles["title-home"]}>Veja como o Mundo Encantado da Geografia funciona</h1>
            <img
              src="./icons/arrow-down.svg"
              className={styles["arrow-down-icon"]}
              alt="Ícone de seta apontando para baixo"
            />
          </div>

          <div className="col-9 col-lg-5 mt-5 mt-lg-0">
            <img src="./images/illustration-home-2.svg" className="img-fluid" />
          </div>
        </section>

        <section className="row justify-content-around align-items-center">
          <div className={`col-11 col-lg-6 col-xl-5 order-2 order-lg-1 ${styles["cards-list"]}`}>
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Vivamus odio tellus, tincidunt rutrum ligula ut, ornare gravida urna. Nullam vel dolor eu erat. Duis tempor facilisis sapien eget"
            />
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Sed a eros sodales diam sagittis faucibus. Cras id erat nisl. Fusce faucibus nulla sed finibus egestas. Cras pharetra massa nec urna placerat"
            />
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Vivamus odio tellus, tincidunt rutrum ligula ut, ornare gravida urna. Nullam vel dolor eu erat. Duis tempor facilisis sapien eget"
            />
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Sed a eros sodales diam sagittis faucibus. Cras id erat nisl. Fusce faucibus nulla sed finibus egestas. Cras pharetra massa nec urna placerat"
            />
          </div>

          <div className="col-11 col-md-7 col-lg-4 col-xl-5 order-1 order-lg-2 mb-5 mb-lg-0">
            <h1 className={`title-blue-dark text-uppercase text-center`}>Regras gamificadas</h1>

            <div className="d-flex justify-content-center">
              <hr className={styles["border-yellow"]} />
              <hr className={styles["border-blue"]} />
            </div>
            
            <img src="./images/rules-section.svg" className="img-fluid mt-5" />
          </div>
        </section>

        <section className={styles["section-not-allowed"]}>
          <div className="col-11">
            <h1 className={`title-blue-dark text-uppercase text-center`}>O que você não pode fazer</h1>

            <div className="d-flex justify-content-center">
              <hr className={styles["border-yellow"]} />
              <hr className={styles["border-blue"]} />
            </div>
          </div>
          
          <div className={`col-11 col-xl-10 mt-5 ${styles["cards-list-not-allowed"]}`}>
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Vivamus odio tellus, tincidunt rutrum ligula ut, ornare gravida urna. Nullam vel dolor eu erat. Duis tempor facilisis sapien eget"
            />
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Sed a eros sodales diam sagittis faucibus. Cras id erat nisl. Fusce faucibus nulla sed finibus egestas. Cras pharetra massa nec urna placerat"
            />
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Vivamus odio tellus, tincidunt rutrum ligula ut, ornare gravida urna. Nullam vel dolor eu erat. Duis tempor facilisis sapien eget"
            />
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Sed a eros sodales diam sagittis faucibus. Cras id erat nisl. Fusce faucibus nulla sed finibus egestas. Cras pharetra massa nec urna placerat"
            />
          </div>
        </section>

        <section className="row justify-content-around align-items-center mb-5">
          <div className="col-11 col-md-7 col-lg-4 col-xl-5 mb-5 mb-lg-0">
            <h1 className={`title-blue-dark text-uppercase text-center`}>Premiações do MEG</h1>

            <div className="d-flex justify-content-center">
              <hr className={styles["border-yellow"]} />
              <hr className={styles["border-blue"]} />
            </div>
            
            <img src="./images/awards-section.svg" className="img-fluid mt-5" />
          </div>

          <div className={`col-11 col-lg-6 col-xl-5 ${styles["cards-list"]}`}>
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Vivamus odio tellus, tincidunt rutrum ligula ut, ornare gravida urna. Nullam vel dolor eu erat. Duis tempor facilisis sapien eget"
            />
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Sed a eros sodales diam sagittis faucibus. Cras id erat nisl. Fusce faucibus nulla sed finibus egestas. Cras pharetra massa nec urna placerat"
            />
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Vivamus odio tellus, tincidunt rutrum ligula ut, ornare gravida urna. Nullam vel dolor eu erat. Duis tempor facilisis sapien eget"
            />
            <CardHome
              theme={theme}
              title="Lorem Ipsum is simply dummy text of the printing"
              description="Sed a eros sodales diam sagittis faucibus. Cras id erat nisl. Fusce faucibus nulla sed finibus egestas. Cras pharetra massa nec urna placerat"
            />
          </div>
        </section>
      </main>
    </>
  )
}
