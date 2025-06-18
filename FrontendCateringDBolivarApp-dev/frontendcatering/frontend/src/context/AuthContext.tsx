"use client";
import { AuthContextType } from "@/components/Interfaces/AuthContextType";
import { LoginData } from "@/components/Interfaces/LoginData";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [nombres, setNombres] = useState<string | null>(null);
  const [apellidos, setApellidos] = useState<string | null>(null);

  const login = async (data: LoginData) => {
    const res = await fetch("http://localhost:8084/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al iniciar sesión");

    const result = await res.json();
    setToken(result.token);
    setEmail(result.email);
    setNombres(result.nombres);
    setApellidos(result.apellidos);

    localStorage.setItem("token", result.token);
    localStorage.setItem("email", result.email);
    localStorage.setItem("nombres", result.nombres);
    localStorage.setItem("apellidos", result.apellidos);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setNombres(null);
    setApellidos(null);
    localStorage.clear();
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    const savedNombres = localStorage.getItem("nombres");
    const savedApellidos = localStorage.getItem("apellidos");

    if (savedToken) {
      setToken(savedToken);
      setEmail(savedEmail);
      setNombres(savedNombres);
      setApellidos(savedApellidos);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, email, nombres, apellidos, login, logout }}
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
