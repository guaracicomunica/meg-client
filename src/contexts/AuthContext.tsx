import { createContext, useContext, useEffect, useState } from "react";
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { toast, ToastOptions } from 'react-toastify';

import { api } from '../services/api';
import { options } from '../utils/defaultToastOptions';
import { User } from '../types/User';
import { enumRoleUser } from "../enums/enumRoleUser";
import { ThemeContext } from "./ThemeContext";

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
  isStudent: boolean;
  isTeacher: boolean;
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
  const { isHighContrast } = useContext(ThemeContext);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const toastOptions: ToastOptions = {
    ...options,
    hideProgressBar: isHighContrast ? true : false,
    theme: isHighContrast ? "dark" : "light"
  }

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
      setIsStudent(userJSON.role === enumRoleUser.student);
      setIsTeacher(userJSON.role === enumRoleUser.teacher);
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
      toast.success('Conta criada com sucesso!', toastOptions); 
      toast.success(
        'Foi enviado um e-mail de confirmação. Acesse sua caixa de entrada e confirme-o para ter acesso.',
        toastOptions
      ); 
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
    setIsStudent(response.data.user.role === enumRoleUser.student);
    setIsTeacher(response.data.user.role === enumRoleUser.teacher);

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
          setIsStudent(false);
          setIsTeacher(false);
          Router.push('/login');
        });
      }
    } catch(error) {
      toast.error(
        'Ops! Não foi possível sair da sua conta. Tente novamente ou entre em contato com o suporte.',
        toastOptions
      );
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, isStudent, isTeacher, signIn, signUp, logoff }}>
      { children }
    </AuthContext.Provider>
  )
}