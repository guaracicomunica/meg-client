import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function Cadastro() {
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

          <form className='mt-3 d-flex flex-column w-100'>
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
              <label className="form-label" htmlFor="user-name">
                Digite seu nome completo
              </label>
              <input
                type="text"
                className="form-control form-input"
                id="user-name"
                aria-describedby="name"
                placeholder="Seu nome"
              />
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
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="user-password">
                Digite sua senha
              </label>
              <input
                type="password"
                className="form-control form-input"
                id="user-password"
                placeholder="Sua senha"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="user-password-confirm">
                Digite sua senha novamente
              </label>
              <input
                type="password"
                className="form-control form-input"
                id="user-password-confirm"
                placeholder="Confirme sua senha"
              />
            </div>
            <div className="form-group form-check d-flex">
              <div className="checkbox">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox"> </label>
              </div>
              <span>
                Eu aceito o contrato de privacidade e todos os termos de segurança. Leia os termos <Link href='#'>aqui</Link>
              </span>
            </div>

            <button
              type="submit"
              className="button button-blue align-self-end"
            >Cadastre-se</button>
          </form>

          <hr className='w-100 mt-4' />
          <div className='align-self-start'>
            Já possui uma conta? <Link href="/login">Faça login</Link>
          </div>
        </div>
      </main>
    </>
  )
}