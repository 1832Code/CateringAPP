"use client";
import React, { useState } from "react";
import { FiPackage, FiSettings, FiPlus } from "react-icons/fi";
import PredeterminedReservations from "./predeterminado";

const Reservas = () => {
  const [activeTab, setActiveTab] = useState("predeterminadas");
  const [showNewReservationModal, setShowNewReservationModal] = useState(false);

  // Datos de ejemplo para estadísticas
  const stats = [
    { title: "Total Reservas", value: "24", change: "+12%", trend: "up" },
    { title: "Confirmadas", value: "18", change: "+5%", trend: "up" },
    { title: "Pendientes", value: "4", change: "-2%", trend: "down" },
    { title: "Canceladas", value: "2", change: "0%", trend: "neutral" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Panel de Administración
          </h1>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
              <FiPlus className="mr-2" />
              Nueva Reserva
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <div
                className={`mt-1 flex items-center text-sm ${
                  stat.trend === "up"
                    ? "text-green-600"
                    : stat.trend === "down"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {stat.change} desde el mes pasado
              </div>
            </div>
          ))}
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("predeterminadas")}
              className={`${
                activeTab === "predeterminadas"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Reservas Predeterminadas
            </button>
            <button
              onClick={() => setActiveTab("personalizadas")}
              className={`${
                activeTab === "personalizadas"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Reservas Personalizadas
            </button>
            <button
              onClick={() => setActiveTab("configuracion")}
              className={`${
                activeTab === "configuracion"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              <FiSettings className="inline mr-1" />
              Configuración
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "predeterminadas" && (
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Reservas Predeterminadas
                </h2>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Buscar reservas..."
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Filtrar por estado</option>
                    <option>Confirmadas</option>
                    <option>Pendientes</option>
                    <option>Canceladas</option>
                  </select>
                </div>
              </div>
              <PredeterminedReservations />
            </div>
          )}

          {activeTab === "personalizadas" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Reservas Personalizadas
              </h2>
              <div className="text-center py-12">
                <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No hay reservas personalizadas
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Empieza creando una nueva reserva personalizada.
                </p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FiPlus className="-ml-1 mr-2 h-5 w-5" />
                    Nueva Reserva Personalizada
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "configuracion" && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Configuración
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Configuración de Paquetes
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Administra los paquetes predeterminados disponibles.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Configuración de Precios
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Actualiza los precios de los servicios.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Notificaciones
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Configura las alertas y notificaciones por correo.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* New Reservation Modal (Ejemplo) */}
      {showNewReservationModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Nueva Reserva
                  </h3>
                  <div className="mt-2">
                    {/* Formulario para nueva reserva iría aquí */}
                    <p className="text-sm text-gray-500">
                      Complete los detalles de la nueva reserva.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                  onClick={() => setShowNewReservationModal(false)}
                >
                  Crear Reserva
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setShowNewReservationModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservas;
