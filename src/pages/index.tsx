import Head from 'next/head'

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
          <div className="col-8 col-md-4 mt-md-5 flex-column">
            <img src="./images/meg-logo.svg" alt="Logo do MEG" className={styles["logo-home"]} />
            <h1 className={`${styles["title-home"]} mt-4`}>Seja bem-vindo ao Mundo Encantado da Geografia!</h1>
          </div>

          <div className="col-6 col-md-5 my-5 mb-md-0">
            <img src="./images/illustration-home.svg" className="img-fluid" />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
