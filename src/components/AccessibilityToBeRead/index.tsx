
/**
 * entrada das propriedade do componente de informações de leitura
 */
 type readEntry = {
  textToBeReaded: string;
}


/**
 * 
 * @param props componente que exibe informações para os leitores de tela e mantém oculto para videntes.
 * @returns 
 */
export default function AccessibilityToBeRead(props: readEntry) {
  return (
      <span className="sr-only" >
         {props.textToBeReaded}
       </span>
  );
}