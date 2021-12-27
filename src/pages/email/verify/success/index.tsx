import Head from 'next/head';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { options } from '../../../../utils/defaultToastOptions';

import { AuthContext } from '../../../../contexts/AuthContext';

export default function EmailVerifySuccess() {

  return (
    <>
      <Head>
        <title>E-mail verificado com sucesso!</title>
      </Head>
      
      <main className="section pb-0 d-flex flex-column align-items-center">
        <div className="card-style col-12 col-md-8 col-lg-7 col-xl-4 p-5">
          <img
            src="https://img.icons8.com/external-tal-revivo-green-tal-revivo/100/000000/external-approved-checkmark-symbol-to-verify-the-result-basic-green-tal-revivo.png"
            //src="../.././images/icon-user.svg"
            alt="Verified e-mail"
            style={{height: "8rem"}}
          />

          <h3 className='mt-4 text-center'>E-mail verificado com sucesso!</h3>

          <hr className='w-100 mt-4' />

              <Link   href="/login">

              <a className="button button-blue-dark w-100 text-center">Login</a>
                
                </Link>
  


        </div>
      </main>
      <ToastContainer />
    </>
  );
}