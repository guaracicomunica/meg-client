import Head from 'next/head';

import { AuthProvider } from '../contexts/AuthContext';
import { PageActiveProvider } from '../contexts/PageActiveContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css';
import '../styles/buttons.css';
import '../styles/form.css';
import '../styles/modal.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <PageActiveProvider>
        <AuthProvider>
          <div>
            <Navbar />
            <Component {...pageProps} />
          </div>
          <Footer />
        </AuthProvider>
      </PageActiveProvider>
    </>
  )
}

export default MyApp;