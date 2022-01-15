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

  return api;
}