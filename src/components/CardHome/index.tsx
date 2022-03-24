import { enumTheme } from "../../enums/enumTheme";

type CardRule = {
  theme: string;
  title: string;
  description: string;
}

export function CardHome(props: CardRule) {
  const isHighContrast = props.theme === enumTheme.contrast;
  return (
    <div className="card-style p-4" style={{ height: "100%" }}>
      <img
        src="./icons/icon-rules.svg"
        className={isHighContrast ? "img-contrast-white" : ""}
        style={{ height: "3rem" }}
        alt="Ícone de caderneta"
      />
      <strong className="my-3 title-card text-center">{props.title}</strong>
      <p className="text-card text-center">{props.description}</p>
    </div>
  );
}