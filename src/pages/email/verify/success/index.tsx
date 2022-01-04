import Head from 'next/head';
import Link from 'next/link';

export default function EmailVerifySuccess() {
  return (
    <>
      <Head>
        <title>E-mail verificado com sucesso!</title>
      </Head>
      
      <main className="section pb-0 d-flex flex-column align-items-center">
        <div className="card-style col-12 col-md-8 col-lg-7 col-xl-4 p-5">
          <img
            src="/images/verified-email.svg"
            alt="Verified e-mail"
            style={{height: "8rem"}}
          />

          <h3 className='mt-4 text-center'>E-mail verificado com sucesso!</h3>

          <hr className='w-100 my-4' />

          <Link href="/login">
            <a className="button button-blue-dark text-center">Login</a>
          </Link>
        </div>
      </main>
    </>
  );
}