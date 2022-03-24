import { enumTheme } from "../../enums/enumTheme";
import styles from "./styles.module.css";

type CardRule = {
  theme: string;
  title: string;
  description: string;
}

export function CardHome(props: CardRule) {
  return (
    <div className="card-style p-4" style={{ height: "100%" }}>
      <img
        src="./icons/icon-rules.svg"
        className={props.theme === enumTheme.light ? styles["icon-rules"] : `${styles["icon-rules"]} img-contrast-white`}
      />
      <h6 className="my-3 title-card text-center">
        {props.title}
      </h6>
      <p className="text-card text-center">
        {props.description}
      </p>
    </div>
  );
}