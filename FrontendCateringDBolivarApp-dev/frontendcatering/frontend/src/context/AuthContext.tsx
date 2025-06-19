"use client";
import { AuthContextType } from "@/components/Interfaces/AuthContextType";
import { LoginData } from "@/components/Interfaces/LoginData";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = async (data: LoginData) => {
    setIsAuthenticating(true);
    try {
      const res = await fetch("http://localhost:8084/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al iniciar sesión");

      const result = await res.json();
      setToken(result.token);
      setEmail(result.email);

      localStorage.setItem("token", result.token);
      localStorage.setItem("email", result.email);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    localStorage.clear();
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");

    if (savedToken) {
      setToken(savedToken);
      setEmail(savedEmail);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        email,
        login,
        logout,
        showLogin,
        setShowLogin,
        isAuthenticating,
        setIsAuthenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
