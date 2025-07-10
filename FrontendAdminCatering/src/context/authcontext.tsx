"use client";
<<<<<<< HEAD

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
=======
import { createContext, useContext, useState, useEffect } from "react";
>>>>>>> origin/auth
import { useRouter } from "next/navigation";
import { AuthContextType } from "@/interfaces/AuthContextType";
import { LoginData } from "@/interfaces/LoginData";
import { DecodedToken } from "@/interfaces/DecodedToken";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

<<<<<<< HEAD
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true); // inicializando
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();

  const isAuthenticated = !!email;

  const setAuthState = (data: { email: string | null; roles: string[] }) => {
    setEmail(data.email);
    setRoles(data.roles);
  };

  const login = async (data: LoginData): Promise<DecodedToken | null> => {
    setIsAuthenticating(true);
    try {
=======
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState({
    token: null as string | null,
    email: null as string | null,
    roles: [] as string[],
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();

  const login = async (data: LoginData): Promise<DecodedToken | null> => {
    setIsAuthenticating(true);
    try {
      console.log("Iniciando login con:", data.email);
      
>>>>>>> origin/auth
      const res = await fetch("http://localhost:8084/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

<<<<<<< HEAD
      if (!res.ok) throw new Error(await res.text());

      const { email, roles } = await res.json();
      setAuthState({ email, roles });
      return { email, roles, exp: 0, iat: 0, id: 0 }; // opcional, no lo usas aquí
    } catch (err) {
      console.error("Login error:", err);
      throw err;
=======
      console.log("Respuesta de login:", res.status, res.statusText);
      console.log("Headers de respuesta de login:", Object.fromEntries(res.headers.entries()));

      if (!res.ok) throw new Error(await res.text());

      const { email, roles } = await res.json();
      console.log("Login exitoso:", { email, roles });

      setAuthState({
        token: "cookie-httpOnly", // Simulamos que tenemos el token
        email,
        roles: roles || [],
      });

      return { email, roles, exp: 0, iat: 0, id: 0 }; // Datos simulados
    } catch (error) {
      console.error("Login error:", error);
      throw error;
>>>>>>> origin/auth
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
<<<<<<< HEAD
    setIsAuthenticating(true);
=======
>>>>>>> origin/auth
    try {
      await fetch("http://localhost:8084/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
<<<<<<< HEAD
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAuthState({ email: null, roles: [] });
      setIsAuthenticating(false);
=======
    } finally {
      setAuthState({ token: null, email: null, roles: [] });
>>>>>>> origin/auth
      router.push("/login");
    }
  };

  const checkAuth = async () => {
    try {
<<<<<<< HEAD
      const res = await fetch("http://localhost:8084/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const { email, roles } = await res.json();
        setAuthState({ email, roles });
      } else {
        console.warn("Sesión inválida o expirada");
        setAuthState({ email: null, roles: [] });
      }
    } catch (err) {
      console.error("Error verificando sesión:", err);
      setAuthState({ email: null, roles: [] });
    } finally {
      setLoading(false);
=======
      console.log("Verificando autenticación...");
      
      // Log de cookies disponibles
      console.log("Cookies disponibles:", document.cookie);
      
      const res = await fetch("http://localhost:8084/api/auth/me", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta de /api/auth/me:", res.status, res.statusText);
      console.log("Headers de respuesta:", Object.fromEntries(res.headers.entries()));

      if (res.ok) {
        const { email, roles } = await res.json();
        console.log("Datos de autenticación recibidos:", { email, roles });
        
        setAuthState({
          token: "cookie-httpOnly",
          email,
          roles: roles || [],
        });
      } else {
        console.log("Sesión no válida, redirigiendo a login");
        // sesión no válida
        setAuthState({ token: null, email: null, roles: [] });
      }
    } catch (error) {
      console.error("Auth validation error:", error);
      setAuthState({ token: null, email: null, roles: [] });
>>>>>>> origin/auth
    }
  };

  useEffect(() => {
    checkAuth();

<<<<<<< HEAD
    const interval = setInterval(checkAuth, 5 * 60 * 1000); // refresca cada 5 min
=======
    const interval = setInterval(() => {
      checkAuth();
    }, 5 * 60 * 1000); // Chequea cada 5 minutos

>>>>>>> origin/auth
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
<<<<<<< HEAD
        email,
        roles,
=======
        ...authState,
>>>>>>> origin/auth
        login,
        logout,
        isAuthenticating,
        setIsAuthenticating,
<<<<<<< HEAD
        isAuthenticated,
        loading,
        refreshAuth: checkAuth,
=======
>>>>>>> origin/auth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
<<<<<<< HEAD
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
=======
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
>>>>>>> origin/auth
};
