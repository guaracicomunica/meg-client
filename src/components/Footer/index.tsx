import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer>
      <hr className={styles["border-footer"]} />

      <div className="row flex-wrap p-4 justify-content-center">
        <a href="/" className={`${styles["link-footer"]} mr-4`}>Início</a>
        <a href="#" className={`${styles["link-footer"]} mr-4`}>Turmas</a>
        <a href="#" className={`${styles["link-footer"]} mr-4`}>Atividades</a>
        <a href="#" className={styles["link-footer"]}>Acessar</a>
      </div>
    </footer>
  );
}