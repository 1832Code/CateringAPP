"use client";
import { AuthContextType } from "@/interfaces/AuthContextType";
import { LoginData } from "@/interfaces/LoginData";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { DecodedToken } from "@/interfaces/DecodedToken";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
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

  const login = async (data: LoginData): Promise<DecodedToken | null> => {
    setIsAuthenticating(true);
    try {
      const res = await fetch("http://localhost:8084/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Credenciales incorrectas");
      }

      const result = await res.json();
      const cookieToken = getTokenFromCookie();

      if (cookieToken) {
        setToken(cookieToken);
        const decoded = jwtDecode<DecodedToken>(cookieToken);
        decodeAndSetRoles(cookieToken);
        setEmail(result.email);
        localStorage.setItem("email", result.email);
        return decoded;
      }

      return null;
    } catch (err) {
      alert("Usuario o contraseña incorrectos");
      return null;
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
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        email,
        roles,
        login,
        logout,
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
