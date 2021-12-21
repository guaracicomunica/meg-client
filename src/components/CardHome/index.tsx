import styles from "./styles.module.css";

type CardRule = {
  title: string;
  description: string;
}

export function CardHome(props: CardRule) {
  return (
    <div className="card-style p-4">
      <img
        src="./icons/icon-rules.svg"
        className={styles["icon-rules"]}
      />
      <h6 className="my-3 title-card text-center">
        {props.title}
      </h6>

      <p className="text-gray text-center">
        {props.description}
      </p>
    </div>
  );
}