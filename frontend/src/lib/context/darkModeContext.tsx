import useEf from 'react';
import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";

interface Context {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

const DarkModeContext = createContext<Context>(undefined!);

export const DarkModeProvider = ({ children }: any) => {
  const [darkMode, setDarkMode] = useState(false);

  const ref = React.useRef(false);
  const isMounted = React.useRef(false);

  useEffect(() => {
    if (ref.current) {
      setDarkMode((prevState) => JSON.parse(localStorage.getItem("darkMode")!));
    } else {
      ref.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      if (darkMode) {
        localStorage.setItem("darkMode", JSON.stringify(true));
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
      } else {
        localStorage.setItem("darkMode", JSON.stringify(false));
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
      }
    } else {
      isMounted.current = true;
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ setDarkMode, darkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
