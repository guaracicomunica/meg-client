import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../contexts/AuthContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';

import styles from './styles.module.css';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    await signIn(data)
  }

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Navbar />
      
      <main></main>

      <Footer />
    </>
  );
}