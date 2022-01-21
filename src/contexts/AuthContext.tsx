import { createContext, useEffect, useState } from "react";
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { api } from '../services/api';
import { options } from '../utils/defaultToastOptions';
import { User } from '../types/User';

type SignInData = {
  email: string;
  password: string;
}

type SignUpData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: number;
}

type AuthContextType = {
  user: User;
  setUser: (data: User) => void;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => void;
  signUp: (data: SignUpData, makeLogin: boolean) => void;
  logoff: () => void;
}

type DataAuth = {
  access_token: string;
  user: User;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const { 'meg.token': token } = parseCookies();

    if (token) {
      const { 'meg.user': userCookie } = parseCookies();
      const userJSON: User = JSON.parse(userCookie);

      setUser({
        id: userJSON.id,
        name: userJSON.name,
        email: userJSON.email,
        role: userJSON.role,
        avatar_path: userJSON.avatar_path
      });

      setIsAuthenticated(true);
    }
  }, []);

  async function signUp(data: SignUpData) {
    await api.post<DataAuth>('/auth/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
      role: data.role
    }).then(function (success) {
      toast.success('Conta criada com sucesso!', options); 
      toast.success('Foi enviado um e-mail de confirmação. Acesse sua caixa de entrada e confirme-o para ter acesso.', options); 
    });
  }

  async function signIn({ email, password }: SignInData) {
    const response = await api.post<DataAuth>('auth/login', {
      email,
      password
    });

    setCookie(undefined, 'meg.token', response.data.access_token, {
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });
    const userString = JSON.stringify(response.data.user);

    api.defaults.headers['Authorization'] = `Bearer ${response.data.access_token}`;

    setUser({
      id: response.data.user.id,
      name: response.data.user.name,
      email: response.data.user.email,
      role: response.data.user.role,
      avatar_path: response.data.user.avatar_path
    });
    
    setCookie(null, 'meg.user', userString, {
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });
    
    setIsAuthenticated(true);

    Router.push('/turmas');
  }

  async function logoff() {
    try {
      const { 'meg.token': token } = parseCookies();

      if(token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        await api.post('auth/logout')
        .then(function (success) { 
          destroyCookie(null, 'meg.token', {
            path: "/"
          });
          destroyCookie(null, 'meg.user', {
            path: "/"
          });
          setUser(null);
          setIsAuthenticated(false);
          Router.push('/login');
        });
      }
    } catch(error) {
      toast.error('Ops! Não foi possível sair da sua conta. Tente novamente ou entre em contato com o suporte.', options);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, signIn, signUp, logoff }}>
      { children }
    </AuthContext.Provider>
  )
}