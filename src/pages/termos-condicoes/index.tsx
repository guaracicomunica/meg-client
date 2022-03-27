import Head from 'next/head';
import { useContext } from "react";

import { ThemeContext } from "../../contexts/ThemeContext";

import styles from './styles.module.css';

export default function TermosCondicoes() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <title>Termos e condições do MEG</title>
      </Head>

      <main className={`page-container ${styles["page-layout"]} theme-${theme}`}>
        <div className='col-12 col-md-9 col-lg-8 col-xl-7'>
          <h1 className={`title-blue-dark mb-4`}>Termos e condições do MEG</h1>
          <ol className='text-blue-dark'>
            <li className={styles.li}>Da aceitação</li>
            <p>O presente Termo estabelece obrigações contratadas de livre e espontânea vontade, por tempo indeterminado, entre a plataforma e as pessoas físicas ou jurídicas, usuárias do MEG - O Mundo Encantado da Geografia.</p>
            <p>Ao utilizar a plataforma o usuário aceita integralmente as presentes normas e compromete-se a observá-las, sob o risco de aplicação das penalidades cabíveis.</p>
            <p>A aceitação do presente instrumento é imprescindível para o acesso e para a utilização de quaisquer serviços fornecidos pelo sistema web MEG - O Mundo Encantado da Geografia. Caso não concorde com as disposições deste instrumento, o usuário não deverá utilizá-los.</p>

            <li className={styles.li}>Do acesso dos usuários</li>
            <p>Serão utilizadas todas as soluções técnicas à disposição do(s) responsável(is) pela plataforma para permitir o acesso ao serviço 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana. No entanto, a navegação na plataforma, ou em alguma de suas páginas, poderá ser interrompida, limitada ou suspensa para atualizações, modificações ou quaisquer ações necessárias ao seu bom funcionamento.</p>

            <li className={styles.li}>Do cadastro</li>
            <p>O acesso às funcionalidades da plataforma exigirá a realização de um cadastro prévio, de acordo com as normas estabelecidas.</p>
            <p>O usuário se compromete a não informar seus dados cadastrais e/ou de acesso à plataforma a terceiros, responsabilizando-se integralmente pelo uso que deles seja feito.</p>
            <p>Menores de 18 anos e aqueles que não possuírem plena capacidade civil deverão obter previamente o consentimento expresso de seus responsáveis legais para utilização da plataforma e dos serviços ou produtos, sendo de responsabilidade exclusiva dos mesmos, o eventual acesso por menores de idade e por aqueles que não possuem plena capacidade civil sem a prévia autorização.</p>
            <p>Mediante a realização do cadastro o usuário declara e garante expressamente ser plenamente capaz, podendo exercer e usufruir livremente dos serviços.</p>
            <p>O usuário deverá fornecer um endereço de e-mail válido, através do qual o site realizará todas as comunicações necessárias.</p>
            <p>Após a confirmação do cadastro, o usuário possuirá um login e uma senha pessoal, a qual assegura ao usuário o acesso individual à mesma. Desta forma, compete ao usuário, exclusivamente, a manutenção da referida senha de maneira confidencial e segura, evitando o acesso indevido às informações pessoais.</p>
            <p>Toda e qualquer atividade realizada com o uso da senha será de responsabilidade do usuário, que deverá informar prontamente a plataforma em caso do seu uso indevido.</p>
            <p>Não será permitido ceder, vender, alugar ou transferir, de qualquer forma, a conta, que é pessoal e intransferível.</p>
            <p>Caberá ao usuário assegurar que o seu equipamento seja compatível com as características técnicas que viabilizem a utilização da plataforma e dos serviços.</p>
            <p>Sendo essas características: Acesso estável à internet e uso de (browser web) navegadores seguros.</p>
            <p>O usuário poderá, a qualquer tempo, requerer o cancelamento de seu cadastro junto ao sistema web MEG - O Mundo Encantado da Geografia. O seu descadastramento será realizado o mais rapidamente possível.</p>
            <p>O usuário, ao aceitar os Termos e Política de Privacidade, autoriza expressamente a plataforma a coletar, usar, armazenar, tratar, ceder ou utilizar as informações derivadas do uso dos serviços, do site e quaisquer plataformas, incluindo todas as informações preenchidas pelo usuário no momento em que realizar ou atualizar seu cadastro, além de outras expressamente descritas na Política de Privacidade que deverá ser autorizada pelo usuário.</p>

            <li className={styles.li}>Do suporte</li>
            <p>Em caso de quaisquer dúvidas, sugestões ou problemas com a utilização da plataforma, o usuário poderá entrar em contato com o suporte, através do email: <a href="mailto:mundoencantado.geo@gmail.com">mundoencantado.geo@gmail.com</a>.</p>
            <p>Estes serviços de atendimento ao usuário estarão disponíveis nos seguintes dias e horários: Segunda à sexta-feira: das 8:00 às 17:00.</p>

            <li className={styles.li}>Das responsabilidades</li>
            <p>É de responsabilidade do usuário:</p>
            <ol style={{listStyleType: "lower-alpha"}}>
              <li>defeitos ou vícios técnicos originados no próprio sistema do usuário;</li>
              <li>a correta utilização da plataforma, dos serviços ou produtos oferecidos, prezando pela boa convivência, pelo respeito e cordialidade entre os usuários;</li>
              <li>pelo cumprimento e respeito ao conjunto de regras disposto nesse Termo de Condições Geral de Uso, na respectiva Política de Privacidade e na legislação nacional e internacional;</li>
              <li>pela proteção aos dados de acesso à sua conta/perfil (login e senha).</li>
            </ol>
            <p>É de responsabilidade da plataforma MEG - O Mundo Encantado da Geografia:</p>
            <ol style={{listStyleType: "lower-alpha"}}>
              <li>indicar as características do serviço ou produto;</li>
              <li>os defeitos e vícios encontrados no serviço ou produto oferecido desde que lhe tenha dado causa;</li>
              <li>as informações que foram por ela divulgadas, sendo que os comentários ou informações divulgadas por usuários são de inteira responsabilidade dos próprios usuários;</li>
            </ol>

            <li className={styles.li}>Dos direitos autorais</li>
            <p>O presente Termo de Uso concede aos usuários uma licença não exclusiva, não transferível e não sublicenciável, para acessar e fazer uso da plataforma e dos serviços e produtos por ela disponibilizados.</p>
            <p>A estrutura do site ou aplicativo, as marcas, logotipos, nomes comerciais, layouts, gráficos e design de interface, imagens, ilustrações, fotografias, apresentações, vídeos, conteúdos escritos, de som e áudio, programas de computador, banco de dados, arquivos de transmissão e quaisquer outras informações e direitos de propriedade intelectual do MEG - O Mundo Encantado da Geografia, observados os termos da Lei da Propriedade Industrial (Lei nº 9.279/96), Lei de Direitos Autorais (Lei nº 9.610/98) e Lei do Software (Lei nº 9.609/98), estão devidamente reservados.</p>
            <p>Este Termos de Uso não cede ou transfere ao usuário qualquer direito, de modo que o acesso não gera qualquer direito de propriedade intelectual ao usuário, exceto pela licença limitada ora concedida.</p>
            <p>O uso da plataforma pelo usuário é pessoal, individual e intransferível, sendo vedado qualquer uso não autorizado, comercial ou não-comercial. Tais usos consistirão em violação dos direitos de propriedade intelectual do MEG - O Mundo Encantado da Geografia, puníveis nos termos da legislação aplicável.</p>

            <li className={styles.li}>Das sanções</li>
            <p>Sem prejuízo das demais medidas legais cabíveis, o MEG - O Mundo Encantado da Geografia poderá, a qualquer momento, advertir, suspender ou cancelar a conta do usuário:</p>
            <ol style={{listStyleType: "lower-alpha"}}>
              <li>que violar qualquer dispositivo do presente Termo;</li>
              <li>que descumprir os seus deveres de usuário;</li>
              <li>que tiver qualquer comportamento fraudulento, doloso ou que ofenda a terceiros.</li>
            </ol>

            <li className={styles.li}>Da rescisão</li>
            <p>A não observância das obrigações pactuadas neste Termo de Uso ou da legislação aplicável poderá, sem prévio aviso, ensejar a imediata rescisão unilateral por parte do MEG - O Mundo Encantado da Geografia e o bloqueio de todos os serviços prestados ao usuário.</p>

            <li className={styles.li}>Das alterações</li>
            <p>Os itens descritos no presente instrumento poderão sofrer alterações, unilateralmente e a qualquer tempo, por parte do MEG - O Mundo Encantado da Geografia, para adequar ou modificar os serviços, bem como para atender novas exigências legais. As alterações serão veiculadas pelo sistema web MEG - O Mundo Encantado da Geografia e o usuário poderá optar por aceitar o novo conteúdo ou por cancelar o uso dos serviços.</p>

            <li className={styles.li}>Da política de privacidade</li>
            <p>Além do presente Termo, o usuário deverá consentir com as disposições contidas na respectiva Política de Privacidade a ser apresentada a todos os interessados dentro da interface da plataforma.</p>

            <li className={styles.li}>Do foro</li>
            <p>Para a solução de controvérsias decorrentes do presente instrumento será aplicado integralmente o Direito brasileiro.</p>
            <p>Os eventuais litígios deverão ser apresentados no foro da comarca em que se encontra a sede do MEG - O Mundo Encantado da Geografia.</p>
          </ol>
        </div>
      </main>
    </>
  );
}