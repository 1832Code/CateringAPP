"use client";
import { useState } from "react";
import { Label } from "flowbite-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dni, setDni] = useState("");
  const [telephone, setTelephone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validaciones básicas de frontend
    if (!nombre || !apellido || !email || !password || !dni || !telephone) {
      setError("Por favor, rellena todos los campos.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (!/^[0-9]{8}$/.test(dni)) {
      setError("El DNI debe contener 8 dígitos numéricos.");
      return;
    }
    if (!/^[0-9]{9}$/.test(telephone)) {
      setError("El teléfono debe contener 9 dígitos numéricos.");
      return;
    }

    try {
      // Determina si es registro de usuario o administrador según la ruta
      // Si esta es tu única página de registro y siempre es para admin, puedes mantener el endpoint fijo.
      // Si tienes otra página para usuario normal, cambiarías el endpoint aquí.
      const registerEndpoint = "http://localhost:8080/api/auth/registeradmin"; // O "/api/auth/register" para usuarios normales

      const res = await fetch(registerEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: nombre,
          lastName: apellido,
          email,
          password,
          dni,
          telephone,
        }),
      });

      if (res.ok) {
        setSuccess(
          "¡Registro exitoso! Se ha enviado un código de verificación a tu email. Por favor, ingrésalo para activar tu cuenta."
        );
        // Redirigir a la página de verificación, pasando el email
        setTimeout(() => router.push(`/auth/verify?email=${email}`), 2500);
      } else {
        const errorData = await res.text();
        setError(
          `Error al registrar: ${
            errorData || res.statusText
          }. Intenta con otro correo o verifica los datos.`
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
    <div className="flex h-auto items-center justify-center bg-gray-100 dark:bg-gray-900 py-10 min-h-screen">
      <div className="flex flex-col items-center justify-center gap-8 bg-amber-50 p-8 rounded-xl shadow-2xl w-full max-w-4xl mx-auto">
        {/* Sección informativa centrada arriba */}
        <div className="flex flex-col justify-center items-center max-w-xl text-center">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
            Registro de Administrador
          </h1>
          <p className="text-gray-700 mb-4">
            Regístrate para acceder al panel de administración de Catering.
            <br />
            Podrás gestionar productos, ventas, usuarios y mucho más.
          </p>
          <ul className="text-gray-600 text-sm mb-4 list-disc pl-5 text-left mx-auto max-w-xs">
            <li>Acceso seguro y personalizado</li>
            <li>Gestión de pedidos y servicios</li>
            <li>Soporte dedicado</li>
          </ul>
          <span className="text-xs text-gray-400">
            Al registrarte aceptas nuestros{" "}
            <a href="#" className="underline">
              Términos y Condiciones
            </a>
            .
          </span>
        </div>
        {/* Formulario e imagen abajo */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full h-full">
          {/* Formulario de registro */}
          <form
            onSubmit={handleRegister}
            className="flex max-w-md flex-col gap-4 bg-gray-50 rounded-lg shadow-lg p-6 w-full"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center md:hidden">
              Crea tu cuenta de Administrador
            </h2>
            <p className="text-gray-600 text-center mb-2 md:hidden">
              Regístrate para acceder al panel de administración.
            </p>

            <div className="flex gap-3">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="nombre">Nombre</Label>
                </div>
                <input
                  type="text"
                  id="nombre"
                  placeholder="John"
                  value={nombre}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                      ""
                    );
                    setNombre(value);
                  }}
                  required
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                  title="Solo se permiten letras"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {nombre && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre) && (
                  <p className="text-red-500 text-xs mt-1">
                    Solo se permiten letras
                  </p>
                )}
              </div>

              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="apellido">Apellido</Label>
                </div>
                <input
                  id="apellido"
                  type="text"
                  placeholder="Doe"
                  value={apellido}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                      ""
                    );
                    setApellido(value);
                  }}
                  required
                  pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+"
                  title="Solo se permiten letras"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {apellido && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido) && (
                  <p className="text-red-500 text-xs mt-1">
                    Solo se permiten letras
                  </p>
                )}
              </div>
            </div>

            {/* DNI y Teléfono - Añadidos para el registro de administrador */}
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="dni">DNI</Label>
                </div>
                <input
                  id="dni"
                  type="text"
                  placeholder="XXXXXXXX" // 8 dígitos
                  value={dni}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 8); // Solo números, máx 8
                    setDni(value);
                  }}
                  required
                  pattern="[0-9]{8}"
                  title="Ingrese un DNI válido de 8 dígitos"
                  maxLength={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {dni && !/^[0-9]{8}$/.test(dni) && (
                  <p className="text-red-500 text-xs mt-1">
                    El DNI debe tener 8 dígitos numéricos.
                  </p>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor="telephone">Teléfono</Label>
                </div>
                <input
                  id="telephone"
                  type="text"
                  placeholder="9XXXXXXXX" // 9 dígitos
                  value={telephone}
                  onChange={(e) => {
                    const value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 9); // Solo números, máx 9
                    setTelephone(value);
                  }}
                  required
                  pattern="[0-9]{9}"
                  title="Ingrese un número de teléfono válido de 9 dígitos"
                  maxLength={9}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {telephone && !/^[0-9]{9}$/.test(telephone) && (
                  <p className="text-red-500 text-xs mt-1">
                    El teléfono debe tener 9 dígitos numéricos.
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Email</Label>
              </div>
              <input
                id="email"
                type="email"
                placeholder="name@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Ingrese un email válido"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {email &&
                !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email) && (
                  <p className="text-red-500 text-xs mt-1">
                    Ingrese un email válido
                  </p>
                )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                title="La contraseña debe tener al menos 8 caracteres"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {password && password.length < 8 && (
                <p className="text-red-500 text-xs mt-1">Mínimo 8 caracteres</p>
              )}
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && (
              <div className="text-green-500 text-sm mt-2">{success}</div>
            )}

            <button
              className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={
                !nombre ||
                !apellido ||
                !email ||
                !password ||
                !dni ||
                !telephone ||
                password.length < 8 ||
                !/^[0-9]{8}$/.test(dni) ||
                !/^[0-9]{9}$/.test(telephone) ||
                !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email)
              }
            >
              Registrar Administrador
            </button>

            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="border-2 border-gray-300 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-300 transition"
            >
              Iniciar sesión
            </button>
          </form>
          {/* Imagen decorativa */}
          <div className="hidden md:flex items-center justify-center h-full">
            <img
              src="/image.png" // Asegúrate de que esta imagen exista en tu carpeta /public
              alt="Imagen de registro de administrador"
              className="object-cover h-full rounded-lg shadow-lg max-h-[400px] min-w-[200px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
