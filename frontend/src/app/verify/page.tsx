"use client"; // Required for client-side components in App Router

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../components/layouts/LoginComponents/VerificationPage.module.css"; // Create a CSS module for this page

export default function VerifyAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pre-fill email from query parameter if available
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:8084/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Cuenta verificada exitosamente.");
        alert(
          data.message ||
            "Cuenta verificada exitosamente. Ahora serás redirigido al login."
        );
        router.push("/login"); // Redirect to login page
      } else {
        setError(data.error || "Error al verificar el código.");
      }
    } catch (err) {
      setError("Error inesperado al verificar la cuenta.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Verificar tu cuenta</h1>
        <p>
          Por favor, ingresa el código de verificación que enviamos a tu correo
          electrónico.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!!searchParams.get("email")} // Disable if pre-filled from URL
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="code">Código de Verificación</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              minLength={6}
              maxLength={6}
            />
          </div>
          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Verificando..." : "Verificar"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
