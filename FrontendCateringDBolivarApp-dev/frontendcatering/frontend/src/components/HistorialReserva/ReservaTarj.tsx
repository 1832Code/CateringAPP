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
  const [reservas, setReservas] = useState<ReservaData[]>([]);
  const [selectedReserva, setSelectedReserva] = useState<ReservaData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const obtenerDetallesReserva = async () => {
    try {
      const response = await fetch("http://localhost:8084/api/eventos");
      if (!response.ok) {
        throw new Error("No se pudieron obtener los datos");
      }

      const data = await response.json();

      if (data.length > 0) {
        setReservas(data);
      } else {
        alert("No hay eventos disponibles");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      alert("Hubo un error al obtener los detalles de la reserva.");
    }
  };

  const abrirModal = (reserva: ReservaData) => {
    setSelectedReserva(reserva);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setSelectedReserva(null);
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
          <button onClick={obtenerDetallesReserva}>Ver reservas</button>
        </div>
      </div>

      
      <div className="tarjetas-grid">
        {reservas.map((reserva, index) => (
          <div className="reserva-mini" key={index} onClick={() => abrirModal(reserva)}>
            <h3>{reserva.tipoEvento}</h3>
            <p><strong>Fecha:</strong> {reserva.fechaEvento}</p>
            <p><strong>Distrito:</strong> {reserva.distrito}</p>
            <span className="ver-detalles">Ver detalles</span>
          </div>
        ))}
      </div>

     
      {modalVisible && selectedReserva && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Detalles de la Reserva</h3>
            <p><strong>Fecha del Evento:</strong> {selectedReserva.fechaEvento}</p>
            <p><strong>Hora de Inicio:</strong> {selectedReserva.horaInicio}</p>
            <p><strong>Horas Contratadas:</strong> {selectedReserva.cantHorasEvento}</p>
            <p><strong>Tipo de Evento:</strong> {selectedReserva.tipoEvento}</p>
            <p><strong>Dirección:</strong> {selectedReserva.direccion}</p>
            <p><strong>Distrito:</strong> {selectedReserva.distrito}</p>
            <p><strong>Teléfono:</strong> {selectedReserva.telefonoCliente}</p>
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservaTarj;
