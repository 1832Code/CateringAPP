// src/app/dashboard/page.jsx (or wherever your Dashboard component is)
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCharts from "./Starta";
import ServiceCountCard from "./servicios/ServiceCountCard";
import { Spinner, Alert, Card } from "flowbite-react";

export default function Dashboard() {
  const [admin, setAdmin] = useState(null);
  const [userCounts, setUserCounts] = useState({
    totalUsers: null,
    totalAdmins: null,
  }); // Combined state for user counts
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [loadingUserCounts, setLoadingUserCounts] = useState(true);
  const [errorAdmin, setErrorAdmin] = useState(null);
  const [errorUserCounts, setErrorUserCounts] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAdminDetails = async () => {
      setLoadingAdmin(true);
      setErrorAdmin(null);
      if (!token) {
        setErrorAdmin(
          "No se encontró token de autenticación. Por favor, inicie sesión."
        );
        setLoadingAdmin(false);
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8080/api/auth/me-admin", {
          method: "GET",
          credentials: "include",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setAdmin(data);
        } else if (res.status === 401 || res.status === 403) {
          const errorText = await res.text();
          setErrorAdmin(
            `Autenticación fallida: ${errorText}. Redirigiendo al inicio de sesión.`
          );
          localStorage.removeItem("token");
          router.push("/auth/login");
        } else {
          const errorText = await res.text();
          setErrorAdmin(
            `Fallo al cargar los datos del administrador: ${errorText}`
          );
        }
      } catch (err) {
        console.error("Error fetching admin details:", err);
        setErrorAdmin("Error de red al obtener detalles del administrador.");
      } finally {
        setLoadingAdmin(false);
      }
    };

    const fetchUserCounts = async () => {
      setLoadingUserCounts(true);
      setErrorUserCounts(null);
      if (!token) {
        setLoadingUserCounts(false);
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:8080/api/admin/dashboard/userCounts",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setUserCounts(data); // This will set { totalUsers: X, totalAdmins: Y }
        } else if (res.status === 401 || res.status === 403) {
          const errorText = await res.text();
          setErrorUserCounts(
            `Acceso denegado a las estadísticas de usuarios: ${errorText}.`
          );
        } else {
          const errorText = await res.text();
          setErrorUserCounts(
            `Fallo al cargar los recuentos de usuarios: ${errorText}`
          );
        }
      } catch (err) {
        console.error("Error fetching user counts:", err);
        setErrorUserCounts("Error de red al obtener recuentos de usuarios.");
      } finally {
        setLoadingUserCounts(false);
      }
    };

    fetchAdminDetails();
    fetchUserCounts();
  }, [router]);

  const handleExportExcel = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No hay token de autenticación. Por favor, inicie sesión.");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/users/export/excel",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "usuarios.xlsx";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        alert("Archivo de usuarios exportado exitosamente!");
      } else {
        const errorText = await res.text();
        alert(`No se pudo exportar el archivo: ${errorText || res.statusText}`);
      }
    } catch (err) {
      console.error("Error exporting Excel:", err);
      alert("Error de conexión al exportar el archivo.");
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

      {/* Main Dashboard Cards */}
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 p-3 ">
        {/* Total Users Card */}
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
              <span className="flex items-center gap-1.5">
                -0.95%
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.643 7.607L9.09 4.255l.909.884L5 10 0 5.139l.909-.884 3.448 3.353V0h1.286v7.607z"></path>
                </svg>
              </span>
              <dd className="sr-only">Total de Usuarios Disminuyó en -0.95%</dd>
            </div>
          </div>
        </Card>

        {/* Total Admins Card (New) */}
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
