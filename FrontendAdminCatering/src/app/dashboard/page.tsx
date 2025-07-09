/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCharts from "./Starta";
import { Usuario } from "@/interfaces/Usuario";

interface UserCounts {
  totalUsers: number | null;
  totalAdmins: number | null;
}

const ServiceCountCard: React.FC = () => {
  const [serviceCount, setServiceCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServiceCount = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8084/api/admin/dashboard/infomenu/cant-predeterminados",
        {
          method: "GET",
          credentials: "include", 
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setServiceCount(data);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      console.error("Error al obtener el conteo de servicios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceCount();
    const intervalId = setInterval(fetchServiceCount, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-xs text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex items-end space-x-2 justify-center">
      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {serviceCount}
      </p>
      <span className="text-sm text-gray-500 mb-1">servicios</span>
    </div>
  );
};

const ArrowUpIcon = ({ className = "h-4 w-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);

export default function Dashboard() {
  const [admin, setAdmin] = useState<Usuario | null>(null);
  const [userCounts, setUserCounts] = useState<UserCounts>({
    totalUsers: null,
    totalAdmins: null,
  });
  const [loadingAdmin, setLoadingAdmin] = useState<boolean>(true);
  const [loadingUserCounts, setLoadingUserCounts] = useState<boolean>(true);
  const [errorAdmin, setErrorAdmin] = useState<string | null>(null);
  const [errorUserCounts, setErrorUserCounts] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminDetails = async () => {
      setLoadingAdmin(true);
      setErrorAdmin(null);

      try {
        const res = await fetch("http://localhost:8084/api/usuarios/me", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data: Usuario = await res.json();
          setAdmin(data);
        } else {
          const errorText = await res.text();
          if (res.status === 401 || res.status === 403) {
            setErrorAdmin(
              `Autenticación fallida: ${errorText}. Redirigiendo al inicio de sesión.`
            );
            localStorage.removeItem("token");
            router.push("/auth/login");
          } else {
            setErrorAdmin(
              `Fallo al cargar los datos del administrador: ${errorText}`
            );
          }
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

      try {
        const res = await fetch(
          "http://localhost:8084/api/admin/dashboard/userCounts",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.ok) {
          const data: UserCounts = await res.json();
          setUserCounts(data);
        } else {
          const errorText = await res.text();
          if (res.status === 401 || res.status === 403) {
            setErrorUserCounts(
              `Acceso denegado a las estadísticas de usuarios: ${errorText}.`
            );
          } else {
            setErrorUserCounts(
              `Fallo al cargar los recuentos de usuarios: ${errorText}`
            );
          }
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
    try {
      const res = await fetch(
        "http://localhost:8084/api/export/usuarios/excel",
        {
          method: "GET",
          credentials: "include",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Panel de control y estadísticas del sistema
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {loadingAdmin ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    Cargando...
                  </span>
                </div>
              ) : admin ? (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {admin.nombres?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {admin.nombres} {admin.apellidos}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Administrador
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alerts */}
        {errorAdmin && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{errorAdmin}</p>
              </div>
            </div>
          </div>
        )}

        {errorUserCounts && (
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">{errorUserCounts}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Users Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col h-full">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Usuarios Registrados
              </p>
              <div className="flex-grow flex items-center justify-center">
                {loadingUserCounts ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                    <span className="text-gray-400 text-sm">Cargando...</span>
                  </div>
                ) : (
                  <div className="flex items-end space-x-2 justify-center">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      {userCounts.totalUsers !== null ? userCounts.totalUsers.toLocaleString() : "N/A"}
                    </p>
                    <span className="text-sm text-gray-500 mb-1">usuarios</span>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    12%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">vs mes anterior</span>
                </div>
                <button className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  Ver todos
                </button>
              </div>
            </div>
          </div>

          {/* Admins Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col h-full">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Administradores
              </p>
              <div className="flex-grow flex items-center justify-center">
                {loadingUserCounts ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-500 border-t-transparent"></div>
                    <span className="text-gray-400 text-sm">Cargando...</span>
                  </div>
                ) : (
                  <div className="flex items-end space-x-2 justify-center">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      {userCounts.totalAdmins !== null ? userCounts.totalAdmins.toLocaleString() : "N/A"}
                    </p>
                    <span className="text-sm text-gray-500 mb-1">admin</span>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    5%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">vs mes anterior</span>
                </div>
                <button className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                  Ver todos
                </button>
              </div>
            </div>
          </div>

          {/* Services Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col h-full">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Servicios Activos
              </p>
              <div className="flex-grow flex items-center justify-center">
                <ServiceCountCard />
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    8%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">vs mes anterior</span>
                </div>
                <button className="text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors">
                  Ver todos
                </button>
              </div>
            </div>
          </div>

          {/* Placeholder Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-300">
            <div className="flex flex-col h-full">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Estadísticas
              </p>
              <div className="flex-grow flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    +25
                  </p>
                  <p className="text-sm text-gray-500">Nuevos este mes</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <ArrowUpIcon className="h-3 w-3 mr-1" />
                    15%
                  </span>
                  <span className="text-xs text-gray-500 ml-2">vs mes anterior</span>
                </div>
                <button className="text-xs font-medium text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Acciones Rápidas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleExportExcel}
                className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportar Usuarios
              </button>
              
              <button
                onClick={() => router.push("/dashboard/servicios")}
                className="flex items-center justify-center p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Nuevo Servicio
              </button>
              
              <button
                onClick={() => router.push("/dashboard/usuarios")}
                className="flex items-center justify-center p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Gestionar Usuarios
              </button>
              
              <button
                onClick={() => router.push("/dashboard/informes")}
                className="flex items-center justify-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Ver Reportes
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Actividad Reciente
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Nuevo pedido recibido
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Hace 5 minutos
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Usuario registrado
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Hace 15 minutos
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Servicio actualizado
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Hace 1 hora
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Pedido completado
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Hace 2 horas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Estadísticas y Gráficos
          </h3>
          <StatsCharts />
        </div>
      </div>
    </div>
  );
}