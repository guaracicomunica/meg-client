import { createContext, useState, useEffect } from "react";

type PageActiveContextType = {
  pageActive: string;
  setPageActive: (pageActive: string) => void;
}

export const PageActiveContext = createContext({} as PageActiveContextType);

export function PageActiveProvider({ children }) {
  const [pageActive, setPageActive] = useState<string>("");

  useEffect(() => {
    const pathname = document.location.pathname;
    if (pathname.includes("minha-conta")) {
      setPageActive("Minha Conta")
    }
    else if(pathname.includes("login") || pathname.includes("cadastro"))
    {
      setPageActive("Entrar"); 
    }
    else if (pathname.includes("turmas")) {
      setPageActive("Turmas");
    }
    else if (pathname === "/") {
      setPageActive("Início");
    } else {
      setPageActive(null);
    }
  });

  return (
    <PageActiveContext.Provider value={{ pageActive, setPageActive }}>
      { children }
    </PageActiveContext.Provider>
  );
}