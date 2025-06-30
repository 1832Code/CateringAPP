"use client";
import React, { useState } from "react";

const PredeterminedReservations = () => {
  const mockReservations = [
    {
      id: "RES-001",
      userName: "Juan Pérez",
      packageName: "Paquete Premium",
      eventDate: "2024-12-15",
      numberOfGuests: 50,
      status: "Confirmado",
    },
    {
      id: "RES-002",
      userName: "María Gómez",
      packageName: "Paquete Básico",
      eventDate: "2024-11-20",
      numberOfGuests: 30,
      status: "En Proceso",
    },
    {
      id: "RES-003",
      userName: "Carlos Ruiz",
      packageName: "Paquete Personalizado",
      eventDate: "2025-01-10",
      numberOfGuests: 100,
      status: "Recibido",
    },
  ];

  const [reservations, setReservations] = useState(mockReservations);
  const statusOptions = [
    "Recibido",
    "Confirmado",
    "En Proceso",
    "Terminado",
    "Cancelado",
  ];

  const handleStatusChange = (reservationId, newStatus) => {
    setReservations(
      reservations.map((res) =>
        res.id === reservationId ? { ...res, status: newStatus } : res
      )
    );
    alert(`Estado actualizado a: ${newStatus}`); // Feedback visual
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reservas de Clientes</h2>
      {reservations.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">ID Reserva</th>
                <th className="py-2 px-4 border">Cliente</th>
                <th className="py-2 px-4 border">Paquete</th>
                <th className="py-2 px-4 border">Fecha Evento</th>
                <th className="py-2 px-4 border">Invitados</th>
                <th className="py-2 px-4 border">Estado</th>
                <th className="py-2 px-4 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border text-center">
                    {reservation.id}
                  </td>
                  <td className="py-2 px-4 border">{reservation.userName}</td>
                  <td className="py-2 px-4 border">
                    {reservation.packageName}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(reservation.eventDate).toLocaleDateString(
                      "es-PE"
                    )}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {reservation.numberOfGuests}
                  </td>
                  <td className="py-2 px-4 border">
                    <select
                      value={reservation.status}
                      onChange={(e) =>
                        handleStatusChange(reservation.id, e.target.value)
                      }
                      className="p-1 border rounded"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Ver Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PredeterminedReservations;
