import styles from './styles.module.css';

export default function PrivateComment() {
  return (
    <div className={`p-3 mt-2 w-100 ${styles["private-comment"]}`}>
      <div className='border-bottom pb-1 mb-3'>
        <h5 className='mb-1'>Fabiana Pereira</h5>
        <p>professora estou com dúvida sobre atividade. É o seguinte</p>
      </div>
      
      <div className={styles.response}>
        <form method="post" id="response-comment">
          <h5 className='mb-2'>Responder aluno:</h5>
          <textarea
            name="comment"
            id="comment"
            rows={4}
            className='textarea w-100 p-3'
          ></textarea>
          <button
            type='submit'
            form="response-comment"
            className='button button-blue mt-2'
          >Responder</button>
        </form>
      </div>
    </div>
  );
}