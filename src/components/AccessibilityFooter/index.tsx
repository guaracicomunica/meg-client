
export default function AccessibilityFooter() {
  return (
    <div className={`sr-only`}>
      <img className='pr-3' src="/icons/file-gray.svg" alt="Arquivo para download" />
      <a target="_blank" href="">Baixar arquivo </a>
    </div>
  );
}