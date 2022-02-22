import { useContext } from 'react';
import Link from 'next/link';
import { PageActiveContext } from '../../contexts/PageActiveContext';
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { PageActive } from '../../enums/enumPageActive';
import { enumTheme } from '../../enums/enumTheme';

import styles from "./styles.module.css";

export function Navbar() {
  const { pageActive } = useContext(PageActiveContext);
  const { isAuthenticated } = useContext(AuthContext);
  const { theme, switchTheme } = useContext(ThemeContext);

  const themeToSwitch = theme === enumTheme.light ? enumTheme.contrast : enumTheme.light;

  let classNameLink = "nav-item mt-3 mt-md-0";

  return (
    <header>
      <nav className={`navbar navbar-expand-md ${styles.menu} ${styles[`menu-${theme}`]}`}>
        <a className="navbar-brand" href="/">
          <img src="/icons/logo.svg" alt="Logo do MEG" />
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
          <ul className="navbar-nav align-items-center mr-auto my-4 my-md-0">
            <li className={pageActive === PageActive.inicio ? `${classNameLink} ${styles["link-active"]}` : classNameLink}>
              <Link href="/">
                <a className={styles["menu-link"]}>
                  Início 
                  {pageActive === PageActive.inicio && (<span className="sr-only">(Página atual)</span>)}
                </a>
              </Link>
            </li>
            <li className={pageActive === PageActive.turmas ? `${classNameLink} ${styles["link-active"]}` : classNameLink}>
              <Link href="/turmas">
                <a className={styles["menu-link"]}>
                  Turmas
                  {pageActive === PageActive.turmas && (<span className="sr-only">(Página atual)</span>)}
                </a>
              </Link>
            </li>
            {isAuthenticated && (
              <li className={pageActive === PageActive.minhaConta ? `${classNameLink} ${styles["link-active"]}` : classNameLink}>
                <Link href="/minha-conta">
                  <a className={styles["menu-link"]}>
                    Minha conta
                    {pageActive === PageActive.minhaConta && (<span className="sr-only">(Página atual)</span>)}
                  </a>
                </Link>
              </li> 
            )}
            {!isAuthenticated && (
              <li className={pageActive === PageActive.entrar ? `${classNameLink} ${styles["link-active"]}` : classNameLink}>
                <Link href="/login">
                  <a className={styles["menu-link"]}>
                    Entrar
                    {pageActive === PageActive.entrar && (<span className="sr-only">(Página atual)</span>)}
                  </a>
                </Link>
              </li> 
            )}
            <li className={classNameLink}>
              <button className={styles["btn-switch-theme"]} onClick={() => switchTheme(themeToSwitch)}>
                <img src="/icons/switch-theme.svg" alt="Botão para alterar tema" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}