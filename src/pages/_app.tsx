import Head from 'next/head';

import { ThemeProvider, ThemeContext } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import { PageActiveProvider } from '../contexts/PageActiveContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css';
import '../styles/buttons.css';
import '../styles/form.css';
import '../styles/modal.css';
import '../styles/table.css';
import AccessibilityJump from '../components/AccessibilityJump';

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
                
                <div className={`bg-${props.theme}`}>
                  <AccessibilityJump idComponent="topo" accessKeyValue="1" textJumpReader="Ir para a barra de navegação" /> 
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