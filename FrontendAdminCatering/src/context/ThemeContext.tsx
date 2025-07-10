<<<<<<< HEAD
"use client";
=======
"use client"
>>>>>>> origin/auth
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

<<<<<<< HEAD
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
=======
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
>>>>>>> origin/auth
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Detectar preferencia del sistema
<<<<<<< HEAD
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
=======
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
>>>>>>> origin/auth
      setThemeState(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
<<<<<<< HEAD
};
=======
};
>>>>>>> origin/auth
