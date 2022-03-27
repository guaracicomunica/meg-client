import Head from 'next/head';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import { options } from '../../utils/defaultToastOptions';

import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { enumTheme } from '../../enums/enumTheme';

export default function Login() {
  const { register, handleSubmit } = useForm({defaultValues: {
    email: "",
    password: "",
  }});
  const { signIn } = useContext(AuthContext);

  const [buttonString, setButtonString] = useState("Entrar");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const { theme } = useContext(ThemeContext);
  const isHighContrast = theme === enumTheme.contrast;

  const toastOptions: ToastOptions = {
    ...options,
    hideProgressBar: isHighContrast ? true : false,
    theme: isHighContrast ? "dark" : "light"
  }

  async function handleSignIn(data) {
    try {
      setIsButtonDisabled(true);
      setButtonString("Aguarde...");
      await signIn(data);
    } catch (error) {
      setIsButtonDisabled(false);
      setButtonString("Entrar");

      if (!error.response) {
        // network error
        return toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', toastOptions);
      }
      switch (error.response.status) {
        
        case 400:
          toast.warning(error.response?.data.error.trim() ? error.response?.data.error.trim() 
          : "Ops! Algo não saiu como o esperado, tente novamente ou entre em contato com o suporte.", toastOptions);

        case 401:
          toast.error("O email ou a senha estão incorretos.", toastOptions);
          break;

        case 500: 
          toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', toastOptions);
          break;

        default:
          toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', toastOptions);
          break;
      }
    } 
  }

  const onSubmit = async data => handleSignIn(data);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      
      <main className="page-container pb-0 d-flex flex-column align-items-center">
        <div className="card-style col-12 col-md-8 col-lg-7 col-xl-5 p-5">
          <img
            src="./images/icon-user.svg"
            alt="Icon do user"
            style={{height: "8rem"}}
          />

          <h1 className='title-blue-dark mt-4'>Login</h1>

          <form
            id="login"
            className='mt-3 d-flex flex-column w-100'
            onSubmit={handleSubmit(onSubmit)}
            method='post'
          >
            <div className="form-group">
              <label className="form-label" htmlFor="user-email">Digite seu e-mail</label>
              <input
                type="email"
                className="form-control form-input"
                id="user-email"
                aria-describedby="email"
                placeholder="Seu e-mail"
                {...register('email')}
              />
            </div>
            <div className="form-group">
              <label className="form-label"  htmlFor="user-password">Digite sua senha</label>
              <input
                type="password"
                className="form-control form-input"
                id="user-password"
                placeholder="Sua senha"
                {...register('password')}
              />
            </div>

            <button
              form="login"
              type="submit"
              id="button-submit"
              className="button button-blue-dark align-self-end"
              disabled={isButtonDisabled}
            >
              {buttonString}
            </button>
          </form>

          <hr className='w-100 mt-4' />
          <div className='align-self-start'>
            Não possui uma conta? <Link href="/cadastro">Cadastre-se</Link>
          </div>
        </div>
      </main>
      <ToastContainer {...toastOptions} />
    </>
  );
}