import { useContext } from 'react';
import Link from 'next/link';
import { PageActiveContext } from '../../contexts/PageActiveContext';
import { AuthContext } from '../../contexts/AuthContext';
import { FontContext } from '../../contexts/FontContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { PageActive } from '../../enums/enumPageActive';
import { enumTheme } from '../../enums/enumTheme';

import styles from "./styles.module.css";
import AccessibilityJump from '../AccessibilityJump';

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
    <header id="topo">
      <nav className={`navbar navbar-expand-md ${styles.menu} ${styles[`menu-${theme}`]}`}>
        <a className="navbar-brand" href="/">
          <img src="/icons/logo.svg" alt="Logo do MEG, descrição: três letras M, E e G de cores azul, amarelo e vermelho respectivamente" 
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
          aria-label="aperte este botão para exibir a barra de navegação"
        >
          <img
            src="/icons/menu.svg"
            className={styles["nav-icon"]}
            alt="Ícone de menu representado por três barras horizontais"
          />
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav align-items-center mr-auto my-4 my-md-0">
            <AccessibilityJump accessKeyValue='2' tagName='main' textJumpReader='Ir para o conteúdo principal' />
            <li className={pageActive === PageActive.inicio ? `${classNameLink} ${styles["link-active"]}` : classNameLink}>
              <Link href="/">
                <a className={styles["menu-link"]}>
                  Início 
                  {pageActive === PageActive.inicio && (<span className="sr-only">(Página de início ativa)</span>)}
                </a>
              </Link>
            </li>
            <li className={pageActive === PageActive.turmas ? classNameLinkActive : classNameLink}>
              <Link href="/turmas">
                <a className={styles["menu-link"]}>
                  Turmas
                  {pageActive === PageActive.turmas && (<span className="sr-only">(Página de turmas ativa)</span>)}
                </a>
              </Link>
            </li>
            {isAuthenticated && (
              <li className={pageActive === PageActive.minhaConta ? classNameLinkActive : classNameLink}>
                <Link href="/minha-conta">
                  <a className={styles["menu-link"]}>
                    Minha conta
                    {pageActive === PageActive.minhaConta && (
                      <span className="sr-only">(Página de minha conta ativa)</span>
                    )}
                  </a>
                </Link>
              </li> 
            )}
            {!isAuthenticated && (
              <li className={pageActive === PageActive.entrar ? classNameLinkActive : classNameLink}>
                <Link href="/login">
                  <a className={styles["menu-link"]}>
                    Entrar
                    {pageActive === PageActive.entrar && (
                      <span className="sr-only">(Página de autenticação ativa)</span>
                    )}
                  </a>
                </Link>
              </li> 
            )}
            <div className={`d-flex align-items-center ${classNameLink}`} aria-hidden={true}>
              <li aria-hidden={true}>
                <button className={`${styles.btn} pr-2`} onClick={increaseFont} aria-hidden={true}>
                  <img src="/icons/font-more.svg" className={isHighContrast ? "img-contrast-white" : ""} />
                </button>
              </li>
              <li aria-hidden={true}>
                <button className={`${styles.btn} pr-2`} onClick={decreaseFont} aria-hidden={true}>
                  <img src="/icons/font-less.svg" className={isHighContrast ? "img-contrast-white" : ""} />
                </button>
              </li>
              <li aria-hidden={true}>
                <button className={`${styles.btn} pr-2`} onClick={setFontNormal} aria-hidden={true}>
                  <img src="/icons/font-normal.svg" className={isHighContrast ? "img-contrast-white" : ""} />
                </button>
              </li>
              <li aria-hidden={true}>
                <button
                  className={`${styles.btn} ${styles["btn-switch-theme"]}`}
                  onClick={() => switchTheme(themeToSwitch)}
                  aria-hidden={true}
                >
                  <img src="/icons/switch-theme.svg" />
                </button>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}