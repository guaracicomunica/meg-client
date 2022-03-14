import Head from 'next/head';

import { ThemeProvider, ThemeContext } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { PageActiveProvider } from '../contexts/PageActiveContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';
import '../styles/buttons.css';
import '../styles/form.css';
import '../styles/modal.css';
import '../styles/table.css';
import '../styles/titles-texts.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ThemeProvider>
        <PageActiveProvider>
          <AuthProvider>
            <ThemeContext.Consumer>
              {props => (
                <div style={{ minHeight: '100vh' }} className={`bg-${props.theme}`}>
                  <div>
                    <Navbar />
                    <Component {...pageProps} />
                  </div>
                  <Footer />
                </div>
              )}
            </ThemeContext.Consumer>
          </AuthProvider>
        </PageActiveProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp;