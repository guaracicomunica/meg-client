import Head from 'next/head';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { options } from '../../utils/defaultToastOptions';

import { AuthContext } from '../../contexts/AuthContext';

export default function Cadastro() {
  const { register, handleSubmit } = useForm({defaultValues: {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: 2
  }});

  const { signUp } = useContext(AuthContext);

  const [buttonString, setButtonString] = useState("Cadastre-se");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  async function handleSignUp(data) {
    try {
      setIsButtonDisabled(true);
      setButtonString("Aguarde...");
      await signUp(data, false);
      setButtonString("Pronto!");
      setTimeout(() => {
        setIsButtonDisabled(false);
        setButtonString("Cadastre-se!");  
      }, 5000);
      
    } catch (error) {
      setIsButtonDisabled(false);
      setButtonString("Cadastre-se");

      if (!error.response) {
        // network error
        return toast.error('Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.', options);
      }
      switch (error.response.status) {
        //erro de validação
        case 400:
          const obj = JSON.parse(error.response.data.error);
      
          obj?.name?.map(item => {
            toast.error(item, options);
          });
          obj?.role?.map(item => {
            toast.error(item, options);     
          });
          obj?.email?.map(item => {
            toast.error(item, options);     
          });
          obj?.password?.map(item => {
            toast.error(item, options);     
          });
          obj?.password_confirmation?.map(item => {
            toast.error(item, options);     
          });
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

  const onSubmit = async data => handleSignUp(data);

  const [roleUser, setRoleUser] = useState("teacher");

  return (
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      
      <main className="section pb-0 d-flex flex-column align-items-center">
        <div className="card-style col-12 col-md-9 col-lg-7 col-xl-5 p-5">
          <img
            src="./images/icon-user.svg"
            alt="Icon do user"
            style={{height: "8rem"}}
          />

          <h2 className='mt-4'>Cadastro</h2>

          <form
            className='mt-3 d-flex flex-column w-100'
            id='signup'
            onSubmit={handleSubmit(onSubmit)}
            method='post'
          >
            <div className="form-group form-check-inline justify-content-around flex-wrap mr-0 mb-2">
              <div className='d-flex mt-2'>
                <div className="radio">
                  <input
                    type="radio"
                    id="role-teacher"
                    name="role"
                    value={2}
                    defaultChecked={true}
                    required={true}
                    onChange={() => setRoleUser("teacher")}
                    {...register('role')}
                  />
                  <label htmlFor="role-teacher"> </label>
                </div>
                <span>Sou docente</span>
              </div>
              
              <div className='d-flex mt-2'>
                <div className="radio">
                  <input
                    type="radio"
                    id="role-student"
                    name="role"
                    value={3}
                    onChange={() => setRoleUser("student")}
                    {...register('role')}
                  />
                  <label htmlFor="role-student"> </label>
                </div>
                <span>Sou estudante</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Digite seu nome completo
              </label>
              <input
                type="text"
                className="form-control form-input"
                id="name"
                aria-describedby="name"
                placeholder="Seu nome"
                {...register('name')}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                {roleUser === "student" ? "Digite seu e-mail escolar" : "Digite seu e-mail acadêmico"}
              </label>
              <input
                type="email"
                className="form-control form-input"
                id="email"
                aria-describedby="email"
                placeholder="Seu e-mail"
                {...register('email')}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Digite sua senha
              </label>
              <input
                type="password"
                className="form-control form-input"
                id="password"
                placeholder="Sua senha"
                {...register('password')}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password-confirm">
                Digite sua senha novamente
              </label>
              <input
                type="password"
                className="form-control form-input"
                id="password-confirm"
                placeholder="Confirme sua senha"
                {...register('password_confirmation')}
              />
            </div>
            <div className="form-group">
              Ao se cadastrar no MEG, você aceita o contrato de privacidade e todos os termos de segurança. Leia os termos <Link href='#'>aqui</Link>
            </div>

            <button
              form='signup'
              type="submit"
              className="button button-blue-dark align-self-end"
              id="button-submit"
              disabled={isButtonDisabled}
            >
              {buttonString}
            </button>
          </form>

          <hr className='w-100 mt-4' />
          <div className='align-self-start'>
            Já possui uma conta? <Link href="/login">Faça login</Link>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  )
}