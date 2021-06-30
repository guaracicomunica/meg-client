import Head from 'next/head'

import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Meg</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main>
      </main>

      <Footer />
    </>
  )
}
