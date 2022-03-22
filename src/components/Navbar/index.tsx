import { useContext } from 'react';
import Link from 'next/link';
import { PageActiveContext } from '../../contexts/PageActiveContext';
import { AuthContext } from '../../contexts/AuthContext';
import { FontContext } from '../../contexts/FontContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { PageActive } from '../../enums/enumPageActive';
import { enumTheme } from '../../enums/enumTheme';

import styles from "./styles.module.css";

export function Navbar() {
  const { pageActive } = useContext(PageActiveContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { theme, switchTheme } = useContext(ThemeContext);
  const { increaseFont, decreaseFont, setFontNormal } = useContext(FontContext);

  const themeToSwitch = theme === enumTheme.light ? enumTheme.contrast : enumTheme.light;
  const isHighContrast = theme === enumTheme.contrast;

  const classNameLink = "nav-item mt-3 mt-lg-0";
  const classNameLinkActive = `nav-item mt-3 mt-lg-0 ${styles["link-active"]}`;

  return (
    <header>
      <nav className={`navbar navbar-expand-lg ${styles.menu} ${styles[`menu-${theme}`]}`}>
        <a className="navbar-brand" href="/">
          <img
            src="/icons/logo.svg"
            alt="Logo do MEG"
            className={theme === enumTheme.contrast ? 'img-contrast-white' : ''}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Alterna navegação"
        >
          <img src="/icons/menu.svg" alt="Menu" className={styles["nav-icon"]} />
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav align-items-center mr-auto my-4 my-lg-0">
            <li className={pageActive === PageActive.inicio ? classNameLinkActive : classNameLink}>
              <Link href="/">
                <a className={styles["menu-link"]}>
                  Início 
                  {pageActive === PageActive.inicio && (<span className="sr-only">(Página atual)</span>)}
                </a>
              </Link>
            </li>
            <li className={pageActive === PageActive.turmas ? classNameLinkActive : classNameLink}>
              <Link href="/turmas">
                <a className={styles["menu-link"]}>
                  Turmas
                  {pageActive === PageActive.turmas && (<span className="sr-only">(Página atual)</span>)}
                </a>
              </Link>
            </li>
            {isAuthenticated && (
              <li className={pageActive === PageActive.minhaConta ? classNameLinkActive : classNameLink}>
                <Link href="/minha-conta">
                  <a className={styles["menu-link"]}>
                    Minha conta
                    {pageActive === PageActive.minhaConta && (<span className="sr-only">(Página atual)</span>)}
                  </a>
                </Link>
              </li> 
            )}
            {!isAuthenticated && (
              <li className={pageActive === PageActive.entrar ? classNameLinkActive : classNameLink}>
                <Link href="/login">
                  <a className={styles["menu-link"]}>
                    Entrar
                    {pageActive === PageActive.entrar && (<span className="sr-only">(Página atual)</span>)}
                  </a>
                </Link>
              </li> 
            )}
            <div className={`d-flex align-items-center ${classNameLink}`} aria-hidden={true}>
              <li>
                <button className={`${styles.btn} pr-2`} onClick={increaseFont}>
                  <img
                    src="/icons/font-more.svg"
                    alt="Botão para aumentar fonte"
                    className={isHighContrast ? "img-contrast-white" : ""}
                  />
                </button>
              </li>
              <li>
                <button className={`${styles.btn} pr-2`} onClick={decreaseFont}>
                  <img
                    src="/icons/font-less.svg"
                    alt="Botão para diminuir fonte"
                    className={isHighContrast ? "img-contrast-white" : ""}
                  />
                </button>
              </li>
              <li>
                <button className={`${styles.btn} pr-2`} onClick={setFontNormal}>
                  <img
                    src="/icons/font-normal.svg"
                    alt="Botão para deixar fonte no tamanho padrão"
                    className={isHighContrast ? "img-contrast-white" : ""}
                  />
                </button>
              </li>
              <li>
                <button
                  className={`${styles.btn} ${styles["btn-switch-theme"]}`}
                  onClick={() => switchTheme(themeToSwitch)}
                >
                  <img src="/icons/switch-theme.svg" alt="Botão para alterar tema" />
                </button>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}