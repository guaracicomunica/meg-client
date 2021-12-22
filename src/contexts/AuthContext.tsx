import { createContext, useEffect, useState } from "react";
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { api } from '../services/api';
import { options } from '../utils/defaultToastOptions';

type User = {
  id: number;
  name: string;
  email: string;
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextType = {
  user: User;
  setUser: (data: User) => void;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => void;
  logoff: () => void;
}

type DataAuth = {
  access_token: string;
  user: User;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'meg.token': token } = parseCookies();

    if (token) {
      const { 'meg.user': user } = parseCookies();
      const userJSON: User = JSON.parse(user);

      setUser({
        id: userJSON.id,
        name: userJSON.name,
        email: userJSON.email,
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const response = await api.post<DataAuth>('auth/login', {
      email,
      password
    });

    setCookie(undefined, 'meg.token', response.data.access_token, {
      maxAge: 60 * 60, // 1 hour
    });
    const userString = JSON.stringify(response.data.user);

    api.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;

    setUser(response.data.user);
    setCookie(null, 'meg.user', userString, {
      maxAge: 60 * 60, // 1 hour
    });

    Router.push('/turmas');
  }

  async function logoff() {
    await api.post('auth/logout').then(function (response) {
      destroyCookie(null, 'meg.token');
      destroyCookie(null, 'meg.user');
      Router.push('/login');
    })
    .catch(function (error) {
      toast.error('Ops! Não foi possível sair da sua conta. Tente novamente ou entre em contato com o suporte.', options);
    });
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, signIn, logoff }}>
      { children }
    </AuthContext.Provider>
  )
}