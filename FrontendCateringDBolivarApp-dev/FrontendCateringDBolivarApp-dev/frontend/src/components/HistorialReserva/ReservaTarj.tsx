import React, { useState } from "react";
import "./ReservaTarj.css";

type ReservaData = {
  fechaEvento: string;
  horaInicio: string;
  cantHorasEvento: number;
  tipoEvento: string;
  direccion: string;
  distrito: string;
  telefonoCliente: string;
};

const ReservaTarj: React.FC = () => {
  const [reserva, setReserva] = useState<ReservaData | null>(null);

  const obtenerDetallesReserva = async () => {
    try {
      const response = await fetch("http://localhost:8084/api/eventos");
      if (!response.ok) {
        throw new Error("No se pudieron obtener los datos");
      }

      const data = await response.json();

      if (data.length > 0) {
        const evento = data[0];

        const reservaData: ReservaData = {
          fechaEvento: evento.fechaEvento,
          horaInicio: evento.horaInicio,
          cantHorasEvento: evento.cantHorasEvento,
          tipoEvento: evento.tipoEvento,
          direccion: evento.direccion,
          distrito: evento.distrito,
          telefonoCliente: evento.telefonoCliente
        };

        setReserva(reservaData);
      } else {
        alert("No hay eventos disponibles");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      alert("Hubo un error al obtener los detalles de la reserva.");
    }
  };

  return (
    <div className="reserva-contenedor">
      <div className="reserva-tarjeta">
        <div className="reserva-imagen">
          <img src="/images.jpg" alt="Servicio de catering" />
        </div>
        <div className="reserva-info">
          <h2>Reserva de Catering</h2>
          <p>Servicios profesionales para eventos inolvidables</p>
          <button onClick={obtenerDetallesReserva}>Ver detalles</button>

          {reserva && (
            <div className="reserva-detalles">
              <h3>Detalles de la Reserva</h3>
              <p><strong>Fecha del Evento:</strong> {reserva.fechaEvento}</p>
              <p><strong>Hora de Inicio:</strong> {reserva.horaInicio}</p>
              <p><strong>Horas Contratadas:</strong> {reserva.cantHorasEvento}</p>
              <p><strong>Tipo de Evento:</strong> {reserva.tipoEvento}</p>
              <p><strong>Dirección:</strong> {reserva.direccion}</p>
              <p><strong>Distrito:</strong> {reserva.distrito}</p>
              <p><strong>Teléfono:</strong> {reserva.telefonoCliente}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservaTarj;
