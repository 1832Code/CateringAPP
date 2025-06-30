"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginData } from "@/interfaces/LoginData";
import { useAuth } from "@/context/authcontext";

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticating } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const loginData: LoginData = { email, password };

    const decoded = await login(loginData);

    if (!decoded) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      alert("Token no válido o no recibido");
      return;
    }

    // Verificamos el rol de dos formas posibles
    const hasAdminRole = decoded.roles?.includes("ROLE_ADMIN");

    if (!hasAdminRole) {
      setError("Acceso denegado. No tienes el rol de administrador.");
      alert("Acceso denegado. Tu rol no es ROLE_ADMIN");
      return;
    }

    // Si todo está bien
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br to-gray-400 via-gray-600 to-gray-700">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-amber-100">
        <img
          src="/logo.svg"
          alt="Logo"
          className="w-20 h-20 mb-4 drop-shadow-lg"
        />
        <h1 className="text-3xl font-extrabold text-amber-700 mb-2 text-center">
          Bienvenido a Catering Admin
        </h1>
        <p className="text-gray-500 text-base mb-6 text-center">
          Por favor, inicia sesión para continuar
        </p>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-amber-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all bg-white shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-amber-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all bg-white shadow-sm"
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <div className="flex flex-col gap-2 mt-2">
            <button
              type="submit"
              disabled={isAuthenticating}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
            >
              {isAuthenticating ? "Ingresando..." : "Iniciar sesión"}
            </button>

            <button
              type="button"
              className="bg-white border border-blue-300 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 mt-2"
              onClick={() => router.push("/auth/register-admin")}
            >
              Registrarse (Administrador)
            </button>
          </div>
        </form>
        <div className="mt-6 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Catering Admin. Todos los derechos
          reservados.
        </div>
      </div>
    </div>
  );
}
