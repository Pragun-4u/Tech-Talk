"use client";

import React, { useContext, createContext, useState, useEffect } from "react";

interface ThemeType {
  mode: String;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");

  const HandleTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("prefers-color-scheme: dark").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    HandleTheme();
  }, [mode]);

  return (
    <>
      <ThemeContext.Provider value={{ mode, setMode }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("use theme must be used within a themeProvider");
  }
  return context;
}
