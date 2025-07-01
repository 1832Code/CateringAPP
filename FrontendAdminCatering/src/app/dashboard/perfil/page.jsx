"use client"; // This component will be a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Spinner, Alert } from "flowbite-react"; // Import Flowbite components for better UI

const Perfil = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "No se encontró token de autenticación. Por favor, inicie sesión."
        );
        setLoading(false);
        // Optionally redirect to login if no token
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/auth/me-admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include", // Keep if your backend requires it for session or CSRF
        });

        if (res.ok) {
          const data = await res.json();
          setAdminData(data);
        } else if (res.status === 401 || res.status === 403) {
          // Unauthorized or Forbidden (e.g., token expired, not an admin)
          const errorText = await res.text();
          setError(
            `Acceso denegado o sesión expirada: ${errorText}. Por favor, inicie sesión nuevamente.`
          );
          // Clear invalid token and redirect
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userRoles");
          router.push("/auth/login");
        } else {
          const errorText = await res.text();
          setError(`Error al cargar el perfil: ${errorText}`);
        }
      } catch (err) {
        console.error("Error fetching admin profile:", err);
        setError("Error de conexión al servidor. Intente de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [router]); // Include router in dependencies if you push inside useEffect

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <Spinner size="xl" />
        <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">
          Cargando perfil...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert color="failure" onDismiss={() => setError(null)}>
          <span className="font-medium">Error:</span> {error}
        </Alert>
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <Alert color="warning">
          <span className="font-medium">Advertencia:</span> No se pudo cargar la
          información del administrador.
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex justify-center items-center py-10 px-4">
      <Card className="w-full max-w-2xl shadow-xl rounded-lg p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-amber-500 dark:border-amber-400 shadow-lg mb-4"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" // Placeholder: Consider dynamic image later
            alt="Profile Picture"
          />
          <h2 className="text-4xl font-extrabold text-amber-700 dark:text-amber-300 mb-2">
            {adminData.firstName} {adminData.lastName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Administrador
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 dark:text-gray-300">
          <div>
            <p className="text-md font-semibold text-amber-600 dark:text-amber-300">
              Correo Electrónico:
            </p>
            <p className="text-lg">{adminData.email}</p>
          </div>
          <div>
            <p className="text-md font-semibold text-amber-600 dark:text-amber-300">
              DNI:
            </p>
            <p className="text-lg">{adminData.dni || "No especificado"}</p>
          </div>
          <div>
            <p className="text-md font-semibold text-amber-600 dark:text-amber-300">
              Teléfono:
            </p>
            <p className="text-lg">
              {adminData.telephone || "No especificado"}
            </p>
          </div>
          <div>
            <p className="text-md font-semibold text-amber-600 dark:text-amber-300">
              Roles:
            </p>
            <p className="text-lg">
              {adminData.roles && adminData.roles.length > 0
                ? adminData.roles.map((role, index) => (
                    <span
                      key={index}
                      className="inline-block bg-amber-200 dark:bg-amber-600 text-amber-800 dark:text-amber-100 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2"
                    >
                      {role.replace("ROLE_", "")}
                    </span>
                  ))
                : "No roles asignados"}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Acciones del Perfil
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() =>
                alert("Funcionalidad de editar perfil aún no implementada.")
              }
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Editar Perfil
            </button>
            <button
              onClick={() =>
                alert(
                  "Funcionalidad de cambiar contraseña aún no implementada."
                )
              }
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Perfil;
