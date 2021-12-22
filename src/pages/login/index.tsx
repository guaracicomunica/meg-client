import Head from 'next/head';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { options } from '../../utils/defaultToastOptions';

import { AuthContext } from '../../contexts/AuthContext';

export default function Login() {
  const { register, handleSubmit } = useForm({defaultValues: {
    email: "",
    password: "",
  }});
  const { signIn } = useContext(AuthContext);

  async function handleSignIn(data) {
    try {
      await signIn(data);
    } catch (error) {
      if (!error.response) {
        // network error
        return toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', options);
      }
      switch (error.response.status) {
        //erro no (email ou senha) ou (não foi cadastrado)
        case 401:
          toast.error(error.response?.data.error.trim() ? error.response?.data.error.trim() 
          : "Ops! Algo não saiu como o esperado, tente novamente ou entre em contato com o suporte.", options);
          break;
    
        case 500: 
          toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', options);
          break;

        default:
          toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', options);
          break;
      }
    } 
  }

  const onSubmit = async data => handleSignIn(data);

  const [roleUser, setRoleUser] = useState("teacher");

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      
      <main className="section pb-0 d-flex flex-column align-items-center">
        <div className="card-style col-12 col-md-8 col-lg-7 col-xl-4 p-5">
          <img
            src="./images/icon-user.svg"
            alt="Icon do user"
            style={{height: "8rem"}}
          />

          <h2 className='mt-4'>Login</h2>

          <form
            id="login"
            className='mt-3 d-flex flex-column w-100'
            onSubmit={handleSubmit(onSubmit)}
            method='post'
          >
            <div className="form-group form-check-inline justify-content-around flex-wrap mr-0 mb-2">
              <div className='d-flex mt-2'>
                <div className="radio">
                  <input
                    type="radio"
                    id="radio-teacher"
                    name="role-user"
                    defaultChecked={true}
                    required={true}
                    onChange={() => setRoleUser("teacher")}
                  />
                  <label htmlFor="radio-teacher"> </label>
                </div>
                <span>Sou docente</span>
              </div>
              
              <div className='d-flex mt-2'>
                <div className="radio">
                  <input
                    type="radio"
                    id="radio-student"
                    name="role-user"
                    onChange={() => setRoleUser("student")}
                  />
                  <label htmlFor="radio-student"> </label>
                </div>
                <span>Sou estudante</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="user-email">
                {roleUser === "student" ? "Digite seu e-mail escolar" : "Digite seu e-mail acadêmico"}
              </label>
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
              <label className="form-label"  htmlFor="user-password">
                Digite sua senha
              </label>
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
              className="button button-blue align-self-end"
            >Entrar</button>
          </form>

          <hr className='w-100 mt-4' />
          <div className='align-self-start'>
            Não possui uma conta? <Link href="/cadastro">Cadastre-se</Link>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}