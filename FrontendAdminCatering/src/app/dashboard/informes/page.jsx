"use client";
import React, { useState, useEffect } from "react";
import { Card, Button, Spinner, Alert, Badge, Table } from "flowbite-react";
// Iconos SVG inline para evitar problemas de compatibilidad
const Iconos = {
  BarChart: ({ className = "w-6 h-6" }) => (
<<<<<<< HEAD
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  ),
  User: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  ),
  Calendar: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  Money: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
      />
    </svg>
  ),
  Download: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  Eye: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  MapPin: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  Clock: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  FileText: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  TrendingUp: ({ className = "w-6 h-6" }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  ),
=======
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  User: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Calendar: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Money: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  ),
  Download: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Eye: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ),
  MapPin: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Clock: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  FileText: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  TrendingUp: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
>>>>>>> origin/auth
};

const Informes = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalPedidos: 0,
    pedidosPendientes: 0,
    pedidosCompletados: 0,
    pedidosCancelados: 0,
    totalIngresos: 0,
    promedioEventosPorMes: 0,
    distritosMasPopulares: [],
<<<<<<< HEAD
    tiposEventoMasPopulares: [],
=======
    tiposEventoMasPopulares: []
>>>>>>> origin/auth
  });
  const [pedidos, setPedidos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: "",
<<<<<<< HEAD
    endDate: "",
=======
    endDate: ""
>>>>>>> origin/auth
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Obtener estadísticas generales
<<<<<<< HEAD
      const statsResponse = await fetch(
        "http://localhost:8084/api/admin/dashboard/stats",
        {
          credentials: "include",
        }
      );
=======
      const statsResponse = await fetch("http://localhost:8084/api/admin/dashboard/stats", {
        credentials: "include"
      });
>>>>>>> origin/auth

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Obtener pedidos
      const pedidosResponse = await fetch("http://localhost:8084/api/pedidos", {
<<<<<<< HEAD
        credentials: "include",
=======
        credentials: "include"
>>>>>>> origin/auth
      });

      if (pedidosResponse.ok) {
        const pedidosData = await pedidosResponse.json();
        setPedidos(pedidosData);
      }

      // Obtener usuarios
<<<<<<< HEAD
      const usuariosResponse = await fetch(
        "http://localhost:8084/api/usuarios",
        {
          credentials: "include",
        }
      );
=======
      const usuariosResponse = await fetch("http://localhost:8084/api/usuarios", {
        credentials: "include"
      });
>>>>>>> origin/auth

      if (usuariosResponse.ok) {
        const usuariosData = await usuariosResponse.json();
        setUsuarios(usuariosData);
      }
<<<<<<< HEAD
=======

>>>>>>> origin/auth
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Error al cargar los datos del dashboard");
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (reportType, pedidoId = null) => {
    try {
      let url = "";
      if (pedidoId) {
        // Descargar reporte individual de pedido
        url = `http://localhost:8084/api/admin/reports/pedido/${pedidoId}`;
      } else {
        // Reportes generales
        const params = new URLSearchParams({
          tipo: reportType,
          fechaInicio: dateRange.startDate,
<<<<<<< HEAD
          fechaFin: dateRange.endDate,
=======
          fechaFin: dateRange.endDate
>>>>>>> origin/auth
        });
        url = `http://localhost:8084/api/admin/reports/${reportType}?${params}`;
      }

      const response = await fetch(url, {
<<<<<<< HEAD
        credentials: "include",
=======
        credentials: "include"
>>>>>>> origin/auth
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadName = pedidoId
<<<<<<< HEAD
          ? `reporte_pedido_${pedidoId}_${
              new Date().toISOString().split("T")[0]
            }.pdf`
          : `reporte_${reportType}_${
              new Date().toISOString().split("T")[0]
            }.pdf`;
=======
          ? `reporte_pedido_${pedidoId}_${new Date().toISOString().split('T')[0]}.pdf`
          : `reporte_${reportType}_${new Date().toISOString().split('T')[0]}.pdf`;
>>>>>>> origin/auth
        const urlBlob = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = urlBlob;
        a.download = downloadName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(urlBlob);
      } else {
        alert("Error al generar el reporte");
      }
    } catch (err) {
      console.error("Error generating report:", err);
      alert("Error al generar el reporte");
    }
  };

  const getStatusBadge = (estado) => {
    const statusColors = {
<<<<<<< HEAD
      pendiente: "warning",
      confirmado: "info",
      en_proceso: "primary",
      completado: "success",
      cancelado: "failure",
      pagado: "success",
    };
    return <Badge color={statusColors[estado] || "gray"}>{estado}</Badge>;
=======
      'pendiente': 'warning',
      'confirmado': 'info',
      'en_proceso': 'primary',
      'completado': 'success',
      'cancelado': 'failure',
      'pagado': 'success'
    };
    return <Badge color={statusColors[estado] || 'gray'}>{estado}</Badge>;
>>>>>>> origin/auth
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="xl" />
        <span className="ml-2">Cargando informes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="failure" className="m-4">
        <span className="font-medium">Error:</span> {error}
      </Alert>
    );
  }

  return (
    <div className="p-2 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Informes y Reportes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestiona y genera reportes detallados de tu negocio de catering
          </p>
        </div>
<<<<<<< HEAD
        <Button
          color="blue"
=======
        <Button 
          color="blue" 
>>>>>>> origin/auth
          onClick={() => setSelectedReport(null)}
          className="flex items-center gap-2 hover:bg-slate-500"
        >
          <Iconos.Eye className="h-5 w-5" />
          Ver Todos los Informes
        </Button>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Iconos.BarChart className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pedidos</p>
<<<<<<< HEAD
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalPedidos}
              </p>
=======
              <p className="text-2xl font-bold text-gray-900">{stats.totalPedidos}</p>
>>>>>>> origin/auth
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
<<<<<<< HEAD
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Iconos.Calendar className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.pedidosPendientes}
              </p>
=======
                      <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Iconos.Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pedidosPendientes}</p>
>>>>>>> origin/auth
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
<<<<<<< HEAD
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Iconos.Money className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Ingresos Totales
              </p>
              <p className="text-2xl font-bold text-gray-900">
                S/. {stats.totalIngresos.toLocaleString()}
              </p>
=======
                      <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Iconos.Money className="h-8 w-8 text-green-600" />
              </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">S/. {stats.totalIngresos.toLocaleString()}</p>
>>>>>>> origin/auth
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Iconos.User className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Eventos/Mes</p>
              <p className="text-2xl font-bold text-gray-900">
                {Number(stats.promedioEventosPorMes).toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Sección de Reportes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generación de Reportes */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Generar Reportes</h3>
<<<<<<< HEAD

=======
          
>>>>>>> origin/auth
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Fechas
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={dateRange.startDate}
<<<<<<< HEAD
                  onChange={(e) =>
                    setDateRange({ ...dateRange, startDate: e.target.value })
                  }
=======
                  onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
>>>>>>> origin/auth
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={dateRange.endDate}
<<<<<<< HEAD
                  onChange={(e) =>
                    setDateRange({ ...dateRange, endDate: e.target.value })
                  }
=======
                  onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
>>>>>>> origin/auth
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
<<<<<<< HEAD
              <Button
                color="blue"
                onClick={() => generateReport("pedidos")}
=======
              <Button 
                color="blue" 
                onClick={() => generateReport('pedidos')}
>>>>>>> origin/auth
                className="flex items-center justify-center gap-2"
              >
                <Iconos.Download className="h-5 w-5" />
                Reporte de Pedidos
              </Button>
<<<<<<< HEAD

              <Button
                color="green"
                onClick={() => generateReport("ventas")}
=======
              
              <Button 
                color="green" 
                onClick={() => generateReport('ventas')}
>>>>>>> origin/auth
                className="flex items-center justify-center gap-2"
              >
                <Iconos.Money className="h-5 w-5" />
                Reporte de Ventas
              </Button>
<<<<<<< HEAD

              <Button
                color="purple"
                onClick={() => generateReport("eventos")}
=======
              
              <Button 
                color="purple" 
                onClick={() => generateReport('eventos')}
>>>>>>> origin/auth
                className="flex items-center justify-center gap-2"
              >
                <Iconos.Calendar className="h-5 w-5" />
                Reporte de Eventos
              </Button>
<<<<<<< HEAD

              <Button
                color="orange"
                onClick={() => generateReport("clientes")}
=======
              
              <Button 
                color="orange" 
                onClick={() => generateReport('clientes')}
>>>>>>> origin/auth
                className="flex items-center justify-center gap-2"
              >
                <Iconos.User className="h-5 w-5" />
                Reporte de Clientes
              </Button>
            </div>
          </div>
        </Card>

        {/* Análisis de Datos */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Análisis de Datos</h3>
<<<<<<< HEAD

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Distritos Más Populares
              </h4>
              <div className="space-y-2">
                {stats.distritosMasPopulares
                  ?.slice(0, 5)
                  .map((distrito, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{distrito.nombre}</span>
                      <Badge color="blue">{distrito.cantidad} eventos</Badge>
                    </div>
                  ))}
=======
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Distritos Más Populares</h4>
              <div className="space-y-2">
                {stats.distritosMasPopulares?.slice(0, 5).map((distrito, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{distrito.nombre}</span>
                    <Badge color="blue">{distrito.cantidad} eventos</Badge>
                  </div>
                ))}
>>>>>>> origin/auth
              </div>
            </div>

            <div>
<<<<<<< HEAD
              <h4 className="font-medium text-gray-700 mb-2">
                Tipos de Evento Más Populares
              </h4>
              <div className="space-y-2">
                {stats.tiposEventoMasPopulares
                  ?.slice(0, 5)
                  .map((tipo, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{tipo.nombre}</span>
                      <Badge color="green">{tipo.cantidad} eventos</Badge>
                    </div>
                  ))}
=======
              <h4 className="font-medium text-gray-700 mb-2">Tipos de Evento Más Populares</h4>
              <div className="space-y-2">
                {stats.tiposEventoMasPopulares?.slice(0, 5).map((tipo, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{tipo.nombre}</span>
                    <Badge color="green">{tipo.cantidad} eventos</Badge>
                  </div>
                ))}
>>>>>>> origin/auth
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabla de Pedidos Recientes */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">Pedidos Recientes</h3>
<<<<<<< HEAD

        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr className="dark:bg-slate-800">
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cliente
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tipo Evento
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha Evento
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Distrito
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pedidos.slice(0, 10).map((pedido) => (
                <tr key={pedido.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-300 dark:bg-slate-700">
                    #{pedido.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300 dark:bg-slate-700">
                    {pedido.usuario?.nombres} {pedido.usuario?.apellidos}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300 dark:bg-slate-700">
                    {pedido.datosEvento?.tipoEvento}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300 dark:bg-slate-700">
                    {new Date(
                      pedido.datosEvento?.fechaEvento
                    ).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300 dark:bg-slate-700">
                    {pedido.datosEvento?.distrito}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-300 dark:bg-slate-700">
                    {getStatusBadge(pedido.estado)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2  dark:text-slate-300 dark:bg-slate-700 focus:ring-blue-500"
                      onClick={() => generateReport("pedido", pedido.id)}
                    >
                      <Iconos.Download className="h-4 w-4 mr-2" />
                      Descargar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
=======
        
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr className="dark:bg-slate-800">
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo Evento
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha Evento
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Distrito
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {pedidos.slice(0, 10).map((pedido) => (
            <tr key={pedido.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-slate-300 dark:bg-slate-700">
                #{pedido.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300 dark:bg-slate-700">
                {pedido.usuario?.nombres} {pedido.usuario?.apellidos}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300 dark:bg-slate-700">
                {pedido.datosEvento?.tipoEvento}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300 dark:bg-slate-700">
                {new Date(pedido.datosEvento?.fechaEvento).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-slate-300 dark:bg-slate-700">
                {pedido.datosEvento?.distrito}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-300 dark:bg-slate-700">
                {getStatusBadge(pedido.estado)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2  dark:text-slate-300 dark:bg-slate-700 focus:ring-blue-500"
                  onClick={() => generateReport('pedido', pedido.id)}
                >
                  <Iconos.Download className="h-4 w-4 mr-2" />
                  Descargar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
          </table>
        </div>


>>>>>>> origin/auth
      </Card>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h4 className="font-semibold mb-3">Estadísticas por Estado</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Pendientes</span>
              <Badge color="warning">{stats.pedidosPendientes}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Completados</span>
              <Badge color="success">{stats.pedidosCompletados}</Badge>
            </div>
            <div className="flex justify-between">
              <span>Cancelados</span>
              <Badge color="failure">{stats.pedidosCancelados}</Badge>
            </div>
          </div>
        </Card>

        <Card>
          <h4 className="font-semibold mb-3">Información de Eventos</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Iconos.Clock className="h-4 w-4 text-gray-500" />
              <span>Promedio de duración: 4 horas</span>
            </div>
            <div className="flex items-center gap-2">
              <Iconos.MapPin className="h-4 w-4 text-gray-500" />
              <span>Eventos en 15 distritos</span>
            </div>
            <div className="flex items-center gap-2">
              <Iconos.Calendar className="h-4 w-4 text-gray-500" />
<<<<<<< HEAD
              <span>
                Eventos programados:{" "}
                {
                  pedidos.filter(
                    (p) => new Date(p.datosEvento?.fechaEvento) > new Date()
                  ).length
                }
              </span>
=======
              <span>Eventos programados: {pedidos.filter(p => new Date(p.datosEvento?.fechaEvento) > new Date()).length}</span>
>>>>>>> origin/auth
            </div>
          </div>
        </Card>

        <Card>
          <h4 className="font-semibold mb-3">Acciones Rápidas</h4>
          <div className="space-y-2">
<<<<<<< HEAD
            <Button
              size="sm"
              color="blue"
              className="w-full flex items-center gap-2"
            >
              <Iconos.Download className="h-4 w-4" />
              Exportar Datos
            </Button>
            <Button
              size="sm"
              color="green"
              className="w-full flex items-center gap-2"
            >
              <Iconos.FileText className="h-4 w-4" />
              Generar Resumen Mensual
            </Button>
            <Button
              size="sm"
              color="purple"
              className="w-full flex items-center gap-2"
            >
=======
            <Button size="sm" color="blue" className="w-full flex items-center gap-2">
              <Iconos.Download className="h-4 w-4" />
              Exportar Datos
            </Button>
            <Button size="sm" color="green" className="w-full flex items-center gap-2">
              <Iconos.FileText className="h-4 w-4" />
              Generar Resumen Mensual
            </Button>
            <Button size="sm" color="purple" className="w-full flex items-center gap-2">
>>>>>>> origin/auth
              <Iconos.TrendingUp className="h-4 w-4" />
              Análisis de Tendencias
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Informes;
