"use client";
import React, { useState } from "react";
import styles from "./EmailVerificationForm.module.css"; // Crea este archivo CSS si usas módulos
import axios from "axios";
import { useRouter } from "next/navigation";

type EmailVerificationFormProps = {
  userEmail: string; // El email del usuario que se acaba de registrar
  onVerificationSuccess: () => void; // Callback para cuando la verificación sea exitosa
};

export const EmailVerificationForm = ({
  userEmail,
  onVerificationSuccess,
}: EmailVerificationFormProps) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!verificationCode) {
      setError("Por favor, ingresa el código de verificación.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/verify", // Endpoint de verificación en tu backend
        {
          email: userEmail,
          code: verificationCode,
        }
      );
      console.log(response.data);
      setSuccessMessage(
        "¡Verificación exitosa! Redirigiendo para iniciar sesión..."
      );
      onVerificationSuccess(); // Llama al callback para indicar que la verificación fue exitosa
    } catch (err: any) {
      console.error("Error al verificar:", err.response?.data || err.message);
      setError(
        err.response?.data || "Código de verificación incorrecto o expirado."
      );
    }
  };

  return (
    <div className={styles.Container}>
      <h1>Verifica tu correo electrónico</h1>
      <p>Hemos enviado un código de verificación a **{userEmail}**.</p>
      <p>Por favor, ingresa el código para activar tu cuenta.</p>

      <form onSubmit={handleSubmit} className={styles.Form}>
        <input
          type="text"
          placeholder="Código de Verificación"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          className={styles.InputField}
          required
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}
        <button type="submit" className={styles.VerifyButton}>
          Verificar
        </button>
      </form>
    </div>
  );
};
