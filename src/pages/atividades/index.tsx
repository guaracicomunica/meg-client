import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

import { getAPIClient } from '../../services/apiClient';

export default function Atividades() {
  return (
    <div>página de atividades do usuário</div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['meg.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/sessao-expirada',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}