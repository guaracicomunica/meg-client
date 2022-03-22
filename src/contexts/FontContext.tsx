import { createContext, useState, useEffect } from "react";

type FontContextType = {
  font: number;
  setFontNormal: () => void;
  increaseFont: () => void;
  decreaseFont: () => void;
}

export const FontContext = createContext({} as FontContextType);

export function FontProvider({ children }) {
  const [font, setFont] = useState(0);

  useEffect(() => {
    const fontSizeActive = Number(localStorage.getItem("size"));

    if (fontSizeActive) {
      setFont(fontSizeActive);
    } else {
      setFontNormal();
    }
  }, []);

  function setFontNormal() {
    localStorage.setItem("size", "0");
    setFont(0);
  }

  function increaseFont() {
    const newFont = font + 1;
    if (newFont <= 5) {
      setFont(newFont);
      localStorage.setItem("size", newFont.toString());
    }
  }

  function decreaseFont() {
    const newFont = font - 1;
    if (newFont >= 0) {
      setFont(newFont);
      localStorage.setItem("size", newFont.toString());
    }
  }
  
  return (
    <FontContext.Provider value={{ font, setFontNormal, increaseFont, decreaseFont }}>
      { children }
    </FontContext.Provider>
  );
}