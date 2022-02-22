import { createContext, useState, useEffect } from "react";
import { enumTheme } from '../enums/enumTheme';

type ThemeContextType = {
  theme: string;
  switchTheme: (theme: string) => void;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    const themeActive = localStorage.getItem("theme");

    if (themeActive) {
      setTheme(themeActive);
    } else {
      localStorage.setItem("theme", enumTheme.light);
      setTheme(enumTheme.light);
    }
  }, []);

  function switchTheme(newTheme: string) {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      { children }
    </ThemeContext.Provider>
  );
}