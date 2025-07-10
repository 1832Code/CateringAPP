"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AuthContextType } from "@/interfaces/AuthContextType";
import { LoginData } from "@/interfaces/LoginData";
import { DecodedToken } from "@/interfaces/DecodedToken";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      const res = await fetch("http://localhost:8084/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());

      const { email, roles } = await res.json();
      setAuthState({ email, roles });
      return { email, roles, exp: 0, iat: 0, id: 0 }; // opcional, no lo usas aquí
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logout = async () => {
    setIsAuthenticating(true);
    try {
      await fetch("http://localhost:8084/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setAuthState({ email: null, roles: [] });
      setIsAuthenticating(false);
      router.push("/login");
    }
  };

  const checkAuth = async () => {
    try {
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
    }
  };

  useEffect(() => {
    checkAuth();

    const interval = setInterval(checkAuth, 5 * 60 * 1000); // refresca cada 5 min
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        email,
        roles,
        login,
        logout,
        isAuthenticating,
        setIsAuthenticating,
        isAuthenticated,
        loading,
        refreshAuth: checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
