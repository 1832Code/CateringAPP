import React, { useState } from "react";
import "./ReservaTarj.css";

type ReservaData = {
  nombreCliente: string;
  fecha: string;
  hora: string;
  servicio: string;
  invitados: number;
  ubicacion: string;
};

const ReservaTarj: React.FC = () => {
  const [reserva, setReserva] = useState<ReservaData | null>(null);

  const obtenerDetallesReserva = async () => {
    //Ejemplo con datos no reales Falta poner mas datos 
    const data: ReservaData = {
      nombreCliente: "Rodri",
      fecha: "2025-06-10",
      hora: "15:30",
      servicio: "gourmet",
      invitados: 80,
      ubicacion: "Av. El Polo 123, Los Olivos",
    };
    setReserva(data);
  };

  return (
    <div className="reserva-contenedor">
      <div className="reserva-tarjeta">
        <div className="reserva-imagen">
       //Fallo con la imagen que no se ve bien  
          <img src="/images.jpg" alt="Servicio de catering" />
        </div>
        <div className="reserva-info">
          <h2>Reserva de Catering</h2>
          <p>Servicios de Catering para cualquier tipo de eventos en Lima Norte</p>
          <button onClick={obtenerDetallesReserva}>Ver detalles</button>

          {reserva && (
            <div className="reserva-detalles">
              <h3>Detalles de la reserva</h3>
              <p><strong>Cliente:</strong> {reserva.nombreCliente}</p>
              <p><strong>Fecha:</strong> {reserva.fecha}</p>
              <p><strong>Hora:</strong> {reserva.hora}</p>
              <p><strong>Servicio:</strong> {reserva.servicio}</p>
              <p><strong>Invitados:</strong> {reserva.invitados}</p>
              <p><strong>Ubicación:</strong> {reserva.ubicacion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservaTarj;
