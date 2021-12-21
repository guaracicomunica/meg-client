import styles from "./styles.module.css";

export function Footer() {
  return (
    <footer>
      <hr className={styles["border-footer"]} />

      <div className="row flex-wrap p-4 justify-content-center">
        <a href="/" className={`${styles["link-footer"]} mr-5`}>Início</a>
        <a href="#" className={`${styles["link-footer"]} mr-5`}>Turmas</a>
        <a href="#" className={`${styles["link-footer"]} mr-5`}>Atividades</a>
        <a href="#" className={styles["link-footer"]}>Minha conta</a>
      </div>
    </footer>
  );
}