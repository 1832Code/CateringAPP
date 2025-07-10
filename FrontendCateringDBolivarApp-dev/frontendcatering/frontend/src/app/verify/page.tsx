"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Confirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setEmail, setShowLogin } = useAuth();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      setError("Código de verificación no proporcionado");
      setStatus("error");
      return;
    }

    const confirmarCuenta = async () => {
      try {
        const res = await fetch(
          `http://localhost:8084/api/auth/verify?code=${code}`,
          { credentials: "include" }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Error al confirmar la cuenta");
          setStatus("error");
          return;
        }

        // guarda datos en contexto

        setEmail(data.email);

        setStatus("success");

        setTimeout(() => {
          setShowLogin(false);
          router.push("/");
          router.refresh();
        }, 2000);
      } catch (err) {
        setError("Error inesperado al confirmar la cuenta");
        setStatus("error");
      }
    };

    confirmarCuenta();
  }, []);

  if (status === "error") {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          color: "#333",
          padding: "2rem 3rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
          textAlign: "center",
          fontSize: "1.25rem",
        }}
      >
        {status === "loading" && "Confirmando tu cuenta..."}
        {status === "success" && "✅ Cuenta verificada con éxito"}
      </div>
    </div>
  );
}
