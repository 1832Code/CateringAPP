"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await fetch(
        "http://localhost:8080/api/auth/login-admin", // <-- Updated endpoint
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          // 'credentials: "include"' is typically used for sending cookies,
          // which might not be necessary if you're using JWT stored in localStorage.
          // You can keep it if you have a specific reason (e.g., session cookies for CSRF protection).
          // For JWT in localStorage, it's often not strictly needed.
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("token", data.token); // Store the JWT token
          // Optionally, store user ID, email, roles if needed for client-side logic
          localStorage.setItem("userId", data.id);
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("userRoles", JSON.stringify(data.roles));
        }
        router.push("/dashboard"); // Redirect to dashboard on successful login
      } else {
        const errorData = await res.json(); // Get error message from the backend
        setError(errorData || "Credenciales incorrectas"); // Display error message from backend or a default one
      }
    } catch (err) {
      console.error("Error during login:", err); // Log the full error for debugging
      setError("Error de conexión con el servidor.");
    }
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
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
            >
              Iniciar sesión
            </button>

            <button
              type="button"
              className="bg-white border border-blue-300 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200 mt-2"
              onClick={() => router.push("/auth/register-admin")} // Example for admin registration page
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
