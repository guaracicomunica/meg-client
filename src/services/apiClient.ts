import axios from "axios";
import * as next from "next";
import { parseCookies } from "nookies";

// para chamadas no lado do servidor (SSR)
export function getAPIClient(ctx?: Pick<next.NextPageContext, 'req'> | {
  req: next.NextApiRequest;
} | null | undefined) {
  const api = axios.create({
    baseURL: 'http://localhost:8000/api'
  })

  api.interceptors.request.use(function(request) {
    const { 'meg.token': token } = parseCookies();
    api.defaults.headers['Authorization'] = token ? `Bearer ${token}` : '';
    return request;
  })

  return api;
}