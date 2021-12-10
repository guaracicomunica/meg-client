import styles from "./styles.module.css";

export function Navbar() {
  return (
    <header>
      <nav className={`navbar navbar-expand-md ${styles.menu}`}>
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
          <ul className="navbar-nav mr-auto my-4 my-md-0">
            <li className={`nav-item mt-3 mt-md-0 ${styles["link-active"]}`}>
              <a className={styles["menu-link"]} href="/">Início <span className="sr-only">(Página atual)</span></a>
            </li>
            <li className="nav-item mt-3 mt-md-0">
              <a className={styles["menu-link"]} href="#">Turmas</a>
            </li>
            <li className="nav-item mt-3 mt-md-0">
              <a className={styles["menu-link"]} href="#">Atividades</a>
            </li>
            <li className="nav-item mt-3 mt-md-0">
              <a className={styles["menu-link"]} href="#">Minha conta</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    
  );
}