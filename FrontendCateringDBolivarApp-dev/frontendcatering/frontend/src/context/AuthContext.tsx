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
  const [authError, setAuthError] = useState<string | null>(null);
  const login = async (data: LoginData) => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const res = await fetch("http://localhost:8084/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        if (result.error === "user_not_verified") {
          throw new Error(
            "Por favor confirma tu correo antes de iniciar sesión."
          );
        } else {
          throw new Error(result.message || "Error al iniciar sesión");
        }
      }

      const cookieToken = getTokenFromCookie();
      if (!cookieToken) {
        throw new Error("No se pudo obtener el token después del login");
      }

      setToken(cookieToken);
      decodeAndSetRoles(cookieToken);
      setEmail(result.email);
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
        setToken,
        email,
        setEmail,
        roles,
        decodeAndSetRoles,
        login,
        logout,
        showLogin,
        setShowLogin,
        isAuthenticating,
        setIsAuthenticating,
        loadingAuth,
        authError,
        setAuthError,
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
