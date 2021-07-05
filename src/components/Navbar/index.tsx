import styles from "./styles.module.css";

export function Navbar() {
  return (
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
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className={styles["menu-link"]} href="/">Início <span className="sr-only">(Página atual)</span></a>
          </li>
          <li className="nav-item">
            <a className={styles["menu-link"]} href="#">Turmas</a>
          </li>
          <li className="nav-item">
            <a className={styles["menu-link"]} href="#">Atividades</a>
          </li>
          <li className="nav-item">
            <a className="button button-blue" href="#">Acessar</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}