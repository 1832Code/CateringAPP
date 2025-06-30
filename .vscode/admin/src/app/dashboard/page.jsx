// src/app/dashboard/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner, Alert, Card } from "flowbite-react";
import { api } from "../auth/api"; // <--- IMPORT YOUR API INSTANCE!
import StatsCharts from "./Starta";
import ServiceCountCard from "./servicios/ServiceCountCard";

export default function Dashboard() {
  const [admin, setAdmin] = useState(null);
  const [userCounts, setUserCounts] = useState({
    totalUsers: null,
    totalAdmins: null,
  });
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [loadingUserCounts, setLoadingUserCounts] = useState(true);
  const [errorAdmin, setErrorAdmin] = useState(null);
  const [errorUserCounts, setErrorUserCounts] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // No need to manually get token here, 'api' instance handles it
    // const token = localStorage.getItem("token");

    const fetchAdminDetails = async () => {
      setLoadingAdmin(true);
      setErrorAdmin(null);

      // The API interceptor will handle missing tokens and redirects
      try {
        const res = await api.get("/auth/me-admin"); // <--- USE API INSTANCE
        setAdmin(res.data); // Axios directly gives data in 'response.data'
      } catch (err) {
        console.error("Error fetching admin details:", err);
        // The interceptor in api.js should handle 401/403 redirects
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          setErrorAdmin(`Acceso denegado. Redirigiendo al inicio de sesión.`);
          // Interceptor will likely already clear token and redirect, but can be explicit here
          localStorage.removeItem("token");
          router.push("/auth/login");
        } else {
          setErrorAdmin(
            `Fallo al cargar los datos del administrador: ${err.message}`
          );
        }
      } finally {
        setLoadingAdmin(false);
      }
    };

    const fetchUserCounts = async () => {
      setLoadingUserCounts(true);
      setErrorUserCounts(null);

      try {
        // Use the 'api' instance for the request
        const res = await api.get("/admin/dashboard/userCounts");
        setUserCounts(res.data); // Axios directly gives data in 'response.data'
      } catch (err) {
        console.error("Error fetching user counts:", err);
        // Interceptor will handle 401/403 redirects
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          setErrorUserCounts(`Acceso denegado a las estadísticas de usuarios.`);
        } else {
          setErrorUserCounts(
            `Fallo al cargar los recuentos de usuarios: ${err.message}`
          );
        }
      } finally {
        setLoadingUserCounts(false);
      }
    };

    // Call fetch functions. The API interceptor will handle token presence.
    fetchAdminDetails();
    fetchUserCounts();
  }, [router]); // router as dependency because it's used inside useEffect

  const handleExportExcel = async () => {
    // The api instance handles the token check internally.
    // If you need a pre-check for UX, you can keep this, but the interceptor is the ultimate guard.
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No hay token de autenticación. Por favor, inicie sesión.");
      // router.push("/auth/login"); // Consider redirecting here immediately
      return;
    }

    try {
      const res = await api.get(
        "/v1/users/export/excel", // <--- USE API INSTANCE, adjust path if API_BASE_URL handles /v1
        { responseType: "blob" } // Important for downloading files with Axios
      );

      const blob = new Blob([res.data], { type: res.headers["content-type"] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "usuarios.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      alert("Archivo de usuarios exportado exitosamente!");
    } catch (err) {
      console.error(
        "Error exporting Excel:",
        err.response?.data || err.message
      );
      alert(
        `No se pudo exportar el archivo: ${
          err.response?.statusText || err.message
        }`
      );
    }
  };

  return (
    <div className="text-gray-800 p-8 dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      {/* Welcome Admin Section */}
      <div className="p-4 mb-6 dark:bg-gray-950 dark:text-gray-100 text-gray-950 text-center rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-2">Bienvenido Administrador</h1>
        {loadingAdmin ? (
          <div className="flex justify-center items-center py-4">
            <Spinner size="md" />
            <p className="ml-2">Cargando datos del administrador...</p>
          </div>
        ) : errorAdmin ? (
          <Alert color="failure" onDismiss={() => setErrorAdmin(null)}>
            <span className="font-medium">Error:</span> {errorAdmin}
          </Alert>
        ) : admin ? (
          <div>
            <p className="text-lg">
              <strong className="font-semibold">Nombre:</strong>{" "}
              {admin.firstName} {admin.lastName}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Email:</strong> {admin.email}
            </p>
          </div>
        ) : (
          <p>No se pudo cargar la información del administrador.</p>
        )}
      </div>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 p-3 ">
        <Card className="rounded-xl p-6 shadow-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 group flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <svg width="50" height="50" viewBox="0 0 58 58" fill="none">
              <circle cx="29" cy="29" r="29" fill="#090642"></circle>
              <ellipse
                cx="25.7511"
                cy="22.4998"
                rx="4.33333"
                ry="4.33333"
                fill="#fff"
              ></ellipse>
              <ellipse
                cx="25.7511"
                cy="34.4178"
                rx="7.58333"
                ry="4.33333"
                fill="#fff"
              ></ellipse>
              <path
                d="M38.75 34.417c0 1.795-2.206 3.25-4.898 3.25.793-.867 1.339-1.955 1.339-3.248 0-1.295-.547-2.384-1.342-3.252 2.693 0 4.9 1.455 4.9 3.25zM35.5 22.501a3.25 3.25 0 01-4.364 3.054 6.163 6.163 0 00.805-3.055c0-1.11-.293-2.152-.804-3.053A3.25 3.25 0 0135.5 22.5z"
                fill="#fff"
              ></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-950 dark:text-gray-100">
              Total Usuarios
            </h3>
          </div>
          <div className="flex items-end justify-between">
            {loadingUserCounts ? (
              <Spinner size="md" />
            ) : errorUserCounts ? (
              <p className="text-red-500 text-sm">Error</p>
            ) : (
              <span className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                {userCounts.totalUsers !== null ? userCounts.totalUsers : "N/A"}
              </span>
            )}
            {/* You might want to replace this static percentage with real data */}
            <div className="text-sm font-medium text-red-500">
              <span className="flex items-center gap-1.5"></span>
              <dd className="sr-only">Total de Usuarios Disminuyó en -0.95%</dd>
            </div>
          </div>
        </Card>

        <Card className="rounded-xl p-6 shadow-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 group flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <svg
              className="w-12 h-12 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h-5v-9H4L2 9l10-7 10 7-2 2h-8v9h-5v-9h-2L3 9l10-7 10 7-2 2h-8v9z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-950 dark:text-gray-100">
              Total Administradores
            </h3>
          </div>
          <div className="flex items-end justify-between">
            {loadingUserCounts ? (
              <Spinner size="md" />
            ) : errorUserCounts ? (
              <p className="text-red-500 text-sm">Error</p>
            ) : (
              <span className="text-5xl font-extrabold text-purple-600 dark:text-purple-400">
                {userCounts.totalAdmins !== null
                  ? userCounts.totalAdmins
                  : "N/A"}
              </span>
            )}
            {/* You can add a dynamic percentage for admins if you track it */}
          </div>
        </Card>

        {/* Service Count Card (Existing) */}
        <div className="">
          <ServiceCountCard />
        </div>

        {/* Placeholder Card: Total Servicios Predeterminados */}
        <Card className="rounded-xl p-6 shadow-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-950 dark:text-gray-100">
              Servicios Predeterminados
            </h3>
            <span className="text-4xl font-extrabold text-amber-600 dark:text-amber-400">
              {/* Replace with actual count fetched from backend */}
              XX
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total de servicios ofrecidos por defecto.
          </p>
        </Card>

        {/* Placeholder Card: Total Pedidos */}
        <Card className="rounded-xl p-6 shadow-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 group flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-950 dark:text-gray-100">
              Total de Pedidos
            </h3>
            <span className="text-4xl font-extrabold text-green-600 dark:text-green-400">
              {/* Replace with actual count fetched from backend */}
              YY
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Cantidad total de pedidos realizados.
          </p>
        </Card>

        {/* Export Excel Button */}
        <Card className="rounded-xl p-6 shadow-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 group flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-1">
          <button
            onClick={handleExportExcel}
            className="flex items-center justify-center p-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Exportar Usuarios (Excel)
          </button>
        </Card>
      </main>

      {/* Charts Section */}
      <section className="mt-8">
        <StatsCharts />
      </section>
    </div>
  );
}
