
/**
 * entrada das propriedade do componente de jump
 */
type jumpEntry = {
  idComponent?: string;
  tagName?: string;
  accessKeyValue: string;
  textJumpReader: string;
}


/**
 * 
 * @param props componente responsável por realizar o 'jump' do leitor de tela (salto de uma seção para outra, através de atalhos)
 * @returns 
 */
export default function AccessibilityJump(props: jumpEntry) {
  return (
      <a href={ 
        props.idComponent != '' && props.idComponent != undefined && props.idComponent != null 
        ? `#${props.idComponent}` 
        : `${props.tagName}`
       } accessKey={props.accessKeyValue} className={`sr-only`} >
         {props.textJumpReader}
       </a>
  );
}