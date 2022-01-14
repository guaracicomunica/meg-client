import axios from "axios";
import * as next from "next";
import { parseCookies } from "nookies";

// para chamadas no lado do servidor (SSR)
export function getAPIClient(ctx?: Pick<next.NextPageContext, 'req'> | {
  req: next.NextApiRequest;
} | null | undefined) {
  const api = axios.create({
    baseURL: 'http://192.168.2.105:8000/api'
  })

  api.interceptors.request.use(function(request) {
    const { 'meg.token': token } = parseCookies();
    api.defaults.headers['Authorization'] = token ? `Bearer ${token}` : '';
    return request;
  });

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.response.status == 401)
    {
      return {
        redirect: {
          destination: '/sessao-expirada',
          permanent: false,
        }
      }
    }
  });

  return api;
}