import Head from 'next/head';

import { ThemeProvider, ThemeContext } from '../contexts/ThemeContext';
import { FontProvider, FontContext } from '../contexts/FontContext';
import { AuthProvider } from '../contexts/AuthContext';
import { PageActiveProvider } from '../contexts/PageActiveContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';
import '../styles/font-size.css';
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
        <FontProvider>
          <PageActiveProvider>
            <AuthProvider>
              <ThemeContext.Consumer>
                {propsTheme => (
                  <FontContext.Consumer>
                    {propsFont => (
                      <div style={{ minHeight: '100vh' }} className={`bg-${propsTheme.theme} font-${propsFont.font}`}>
                        <div>
                          <Navbar />
                          <Component {...pageProps} />
                        </div>
                        <Footer />
                      </div>
                    )}
                  </FontContext.Consumer>
                )}
              </ThemeContext.Consumer>
            </AuthProvider>
          </PageActiveProvider>
        </FontProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp;