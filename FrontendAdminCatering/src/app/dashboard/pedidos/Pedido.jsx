"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/authcontext";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const { roles } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  // Debug: Log roles cuando cambien
  useEffect(() => {
    console.log("Roles del usuario:", roles);
  }, [roles]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8084/api/pedidos", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const handleEstadoChange = async (id, nuevoEstado) => {
    // Verificar si el usuario tiene rol ADMIN
    if (!roles.includes("ROLE_ADMIN")) {
      alert(
        "No tienes permisos para cambiar el estado. Se requiere rol ADMIN."
      );
      return;
    }

    try {
      setUpdating(true);

      const response = await fetch(
        `http://localhost:8084/api/export/pedidos/${id}/estado`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ estado: nuevoEstado }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "No tienes permisos para cambiar el estado. Se requiere rol ADMIN."
          );
        } else {
          throw new Error("Error al actualizar el estado del pedido.");
        }
      }

      await fetchOrders(); // recarga los pedidos tras el cambio
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  };

  const downloadFactura = async (pedidoId) => {
    // Verificar si el usuario tiene rol ADMIN
    if (!roles.includes("ROLE_ADMIN")) {
      alert(
        "No tienes permisos para descargar facturas. Se requiere rol ADMIN."
      );
      return;
    }

    try {
      console.log("Iniciando descarga de factura para pedido:", pedidoId);

      const response = await fetch(
        `http://localhost:8084/api/pedidos/${pedidoId}/reporte?tipoDocumento=FACTURA`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      console.log(
        "Respuesta del servidor:",
        response.status,
        response.statusText
      );

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error(
            "No tienes permisos para descargar facturas. Se requiere rol ADMIN."
          );
        } else if (response.status === 404) {
          throw new Error("Pedido no encontrado.");
        } else if (response.status === 500) {
          throw new Error("Error interno del servidor al generar el PDF.");
        } else {
          throw new Error(
            `Error del servidor: ${response.status} ${response.statusText}`
          );
        }
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error("El archivo PDF generado está vacío.");
      }

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `pedido_${pedidoId}_factura.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Limpiar la URL del objeto
      window.URL.revokeObjectURL(url);

      console.log("Factura descargada exitosamente");
    } catch (error) {
      console.error("Error al descargar factura:", error);
      alert(`Error al descargar la factura: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full mb-4"></div>
          <div className="text-xl font-medium text-gray-700 dark:text-gray-300">
            Cargando pedidos...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
              Error al cargar los pedidos
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Asegúrate de que tienes permisos de ADMIN y que el servidor esté
            disponible.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="http://localhost:8084/api/export/pedidos/excel"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Exportar a Excel
          </a>
          <a
            href="http://localhost:8084/api/export/pedidos/pdf"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Exportar a PDF
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Gestión de Pedidos
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Administra y actualiza el estado de los pedidos
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Actualizar
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No hay pedidos disponibles
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Cuando los usuarios realicen pedidos, aparecerán aquí.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isExpanded = expandedOrders.has(order.id);
              return (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  {/* Header del acordeón - Siempre visible */}
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                          Pedido #{order.id}
                        </h2>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.estado === "Nuevo"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : order.estado === "En Proceso"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : order.estado === "Recibido"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                              : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          }`}
                        >
                          {order.estado}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Usuario ID: {order.usuarioId}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Cambiar estado:
                          </label>
                          <select
                            className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={order.estado}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleEstadoChange(order.id, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            disabled={updating}
                          >
                            <option value="Nuevo">Nuevo</option>
                            <option value="En Proceso">En Proceso</option>
                            <option value="Recibido">Recibido</option>
                            <option value="Pagado">Pagado</option>
                          </select>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadFactura(order.id);
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                        >
                          Descargar Factura
                        </button>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Contenido expandible del acordeón */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isExpanded ? "max-h-none" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Datos del Evento */}
                          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              Datos del Evento
                            </h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Tipo:
                                </span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {order.datosEvento?.tipoEvento || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Fecha:
                                </span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {order.datosEvento?.fechaEvento || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Distrito:
                                </span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {order.datosEvento?.distrito || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Hora Inicio:
                                </span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {order.datosEvento?.horaInicio || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Dirección:
                                </span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {order.datosEvento?.direccion || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">
                                  Horas:
                                </span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">
                                  {order.datosEvento?.cantHoras || "N/A"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Información del Menú */}
                          {order.infoMenu && (
                            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                              <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Menú Contratado
                              </h3>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Título:
                                  </span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {order.infoMenu.titulo}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Descripción:
                                  </span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {order.infoMenu.descripcion}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Precio:
                                  </span>
                                  <span className="font-medium text-blue-600 dark:text-blue-400">
                                    ${order.infoMenu.precio}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Personas:
                                  </span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {order.infoMenu.cantPersonas}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600 dark:text-gray-400">
                                    Tipo:
                                  </span>
                                  <span className="font-medium text-gray-800 dark:text-gray-200">
                                    {order.infoMenu.tipoInfoMenu}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Detalles adicionales */}
                        {order.infoMenu && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Servicio */}
                            {order.infoMenu.servicio && (
                              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                  </svg>
                                  Servicio
                                </h3>
                                <div className="space-y-1">
                                  <p className="font-medium text-gray-800 dark:text-gray-200">
                                    {
                                      order.infoMenu.servicio.tipoServicio
                                        ?.nombre
                                    }
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {
                                      order.infoMenu.servicio.tipoServicio
                                        ?.descripcion
                                    }
                                  </p>
                                </div>
                                {order.infoMenu.servicio.items?.length > 0 && (
                                  <div className="mt-3">
                                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                                      Items incluidos:
                                    </h4>
                                    <ul className="space-y-1">
                                      {order.infoMenu.servicio.items.map(
                                        (itemWrapper, idx) => (
                                          <li
                                            key={idx}
                                            className="flex justify-between text-sm"
                                          >
                                            <span className="text-gray-600 dark:text-gray-300">
                                              {itemWrapper.item?.nombre}
                                            </span>
                                            <span className="text-gray-800 dark:text-gray-200 font-medium">
                                              ${itemWrapper.item?.precio}
                                            </span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Personal */}
                            {order.infoMenu.personal?.personalInfo?.length >
                              0 && (
                              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                  </svg>
                                  Personal
                                </h3>
                                <ul className="space-y-2">
                                  {order.infoMenu.personal.personalInfo.map(
                                    (pers, idx) => (
                                      <li
                                        key={idx}
                                        className="flex justify-between"
                                      >
                                        <span className="text-gray-600 dark:text-gray-300">
                                          {pers.tipoPersonal}
                                        </span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                          {pers.cantidad}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                            {/* Extras */}
                            {order.infoMenu.extra?.extraInfo?.length > 0 && (
                              <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  Extras
                                </h3>
                                <ul className="space-y-2">
                                  {order.infoMenu.extra.extraInfo.map(
                                    (ext, idx) => (
                                      <li
                                        key={idx}
                                        className="flex justify-between"
                                      >
                                        <span className="text-gray-600 dark:text-gray-300">
                                          {ext.tipoExtra}
                                        </span>
                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                          {ext.cantidad}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
