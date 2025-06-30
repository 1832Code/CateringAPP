"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Label } from "flowbite-react";

export default function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Obtener el email de los parámetros de la URL
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Si no hay email en la URL, redirigir al registro o mostrar un error
      setError("Email no encontrado. Por favor, regresa al registro.");
      // Opcional: Redirigir si no hay email válido después de un tiempo
      // setTimeout(() => router.push("/auth/register"), 3000);
    }
  }, [searchParams, router]);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !verificationCode) {
      setError("Por favor, ingresa tu email y el código de verificación.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (res.ok) {
        setSuccess("¡Cuenta verificada exitosamente! Redirigiendo al login...");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        const errorData = await res.text();
        setError(
          `Error al verificar: ${
            errorData || res.statusText
          }. Por favor, verifica el código.`
        );
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      setError(
        "Error de conexión con el servidor. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex max-w-md flex-col gap-4 bg-white rounded-lg shadow-lg p-8 w-full mx-4">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Verifica tu Correo Electrónico
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Hemos enviado un código de verificación a:{" "}
          <span className="font-semibold text-blue-800">{email}</span>.
          <br /> Por favor, revisa tu bandeja de entrada (y spam) e ingrésalo a
          continuación.
        </p>

        <form onSubmit={handleVerification} className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="emailInput">Tu Email</Label>
            </div>
            <input
              id="emailInput"
              type="email"
              placeholder="name@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly // El email debería ser de solo lectura aquí
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="verificationCode">Código de Verificación</Label>
            </div>
            <input
              id="verificationCode"
              type="text"
              placeholder="Ingresa tu código"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              maxLength={6} // Asumiendo que el código es de 6 caracteres
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg font-mono"
            />
          </div>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          {success && (
            <div className="text-green-500 text-sm mt-2">{success}</div>
          )}

          <button
            className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={
              !email || !verificationCode || verificationCode.length !== 6
            }
          >
            Verificar Cuenta
          </button>

          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="border-2 border-gray-300 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-300 transition"
          >
            Ir a Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
