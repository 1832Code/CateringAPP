"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContextType } from "@/interfaces/AuthContextType";
import { LoginData } from "@/interfaces/LoginData";
import { DecodedToken } from "@/interfaces/DecodedToken";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      
      const res = await fetch("http://localhost:8084/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

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
    } finally {
      setAuthState({ token: null, email: null, roles: [] });
      router.push("/login");
    }
  };

  const checkAuth = async () => {
    try {
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
    }
  };

  useEffect(() => {
    checkAuth();

    const interval = setInterval(() => {
      checkAuth();
    }, 5 * 60 * 1000); // Chequea cada 5 minutos

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
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
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
