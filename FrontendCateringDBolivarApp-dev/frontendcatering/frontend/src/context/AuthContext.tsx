"use client";

import { AuthContextType } from "@/components/Interfaces/AuthContextType";
import { LoginData } from "@/components/Interfaces/LoginData";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const router = useRouter();

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

      if (!res.ok) {
        const result = await res.json();
        if (result.error === "user_not_verified") {
          throw new Error(
            "Por favor confirma tu correo antes de iniciar sesión."
          );
        } else {
          throw new Error(result.message || "Error al iniciar sesión");
        }
      }

      // Después del login el servidor ya guardó la cookie HttpOnly.
      // Consultamos /me para obtener los datos del usuario.
      await checkAuth();

      router.refresh();
    } catch (err: any) {
      setAuthError(err.message);
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
      setEmail(null);
      setRoles([]);
      setShowLogin(false);

      router.refresh();
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:8084/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.status === 401) {
        console.info("Usuario no autenticado");
        setEmail(null);
        setRoles([]);
        return;
      }

      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const user = await res.json();
          if (user?.email && Array.isArray(user?.roles)) {
            setEmail(user.email);
            setRoles(user.roles);
          } else {
            setEmail(null);
            setRoles([]);
          }
        } else {
          console.warn("Respuesta inesperada (no JSON)");
          setEmail(null);
          setRoles([]);
        }
      } else {
        setEmail(null);
        setRoles([]);
      }
    } catch (e) {
      console.error("Error verificando sesión", e);
      setEmail(null);
      setRoles([]);
    } finally {
      setLoadingAuth(false);
    }
  };

  useEffect(() => {
    (async () => {
      await checkAuth();
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        roles,
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
