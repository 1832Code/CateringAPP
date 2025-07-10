"use client";
import { AuthContextType } from "@/components/Interfaces/AuthContextType";
import { LoginData } from "@/components/Interfaces/LoginData";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

interface DecodedToken {
  roles: string[];
  email: string;
  id: number;
  exp: number;
  iat: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const router = useRouter();
  const decodeAndSetRoles = (jwt: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(jwt);
      setRoles(decoded.roles || []);
    } catch (e) {
      setRoles([]);
    }
  };

  const login = async (data: LoginData) => {
    setIsAuthenticating(true);
    try {
      const res = await fetch("http://localhost:8084/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al iniciar sesión");

      const result = await res.json();
      // Leer token directamente desde cookie
      const cookieToken = getTokenFromCookie();
      console.log("Token desde cookie luego del login:", cookieToken);

      if (cookieToken) {
        setToken(cookieToken);
        decodeAndSetRoles(cookieToken);
      }

      setEmail(result.email); // el backend devuelve solo el email
      localStorage.setItem("email", result.email);

      router.refresh();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:8084/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Error al cerrar sesión", e);
    } finally {
      setToken(null);
      setEmail(null);
      setRoles([]);
      localStorage.clear();

      // ⚠️ Espera antes de ejecutar checkAuth
      setTimeout(() => {
        router.refresh();
      }, 300); // 300 ms es suficiente para la mayoría de navegadores
    }
  };

  const getTokenFromCookie = (): string | null => {
    const match = document.cookie.match(/(^| )token=([^;]+)/);
    const token = match?.[2] ?? null;
    return token && token !== "undefined" && token !== "null" ? token : null;
  };

  const isExpired = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.exp * 1000 < Date.now(); // JWT exp está en segundos
    } catch {
      return true;
    }
  };

  const checkAuth = () => {
    const savedToken = getTokenFromCookie();
    const savedEmail = localStorage.getItem("email");

    if (savedToken && !isExpired(savedToken)) {
      setToken(savedToken);
      setEmail(savedEmail);
      decodeAndSetRoles(savedToken);
    } else {
      setToken(null);
      setEmail(null);
      setRoles([]);
    }
  };

  useEffect(() => {
    checkAuth();
    setLoadingAuth(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        email,
        roles,
        login,
        logout,
        showLogin,
        setShowLogin,
        isAuthenticating,
        setIsAuthenticating,
        loadingAuth,
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
