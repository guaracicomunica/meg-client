import { ToastOptions } from "react-toastify";

//configurações, por padrão, adotadas no projeto
export const options: ToastOptions = {
  position: "top-right",
  autoClose: 10000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const genericMessageError: string = "Ops! Algo não saiu como o esperado. Tente novamente ou entre em contato com o suporte.";