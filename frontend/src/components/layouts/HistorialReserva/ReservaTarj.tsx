import React, { useState } from "react";
import "./ReservaTarj.css";
import { Pedido } from "@/components/Interfaces/Pedido";

const ReservaTarj: React.FC = () => {
  const [reservas, setReservas] = useState<Pedido[]>([]);
  const [selectedReserva, setSelectedReserva] = useState<Pedido | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tabActiva, setTabActiva] = useState<"reservas" | "pagadas">(
    "reservas"
  );

  const obtenerDetallesReserva = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8084/api/pedidos/mis-pedidos",
        {
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Error al obtener pedidos");

      const data = await response.json();
      setReservas(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      alert("Hubo un error al obtener los detalles de la reserva.");
    }
  };

  const abrirModal = (pedido: Pedido) => {
    setSelectedReserva(pedido);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setSelectedReserva(null);
  };

  // Filtro
  const reservasFiltradas = reservas.filter((reserva) => {
    if (tabActiva === "pagadas") return reserva.estado === "pagada";
    else return reserva.estado !== "pagada";
  });

  return (
    <div className="reserva-contenedor">
      <div className="tabs-centro">
        <span
          className={`tab ${tabActiva === "reservas" ? "activa" : ""}`}
          onClick={() => setTabActiva("reservas")}
        >
          Reservas
        </span>
        <span
          className={`tab ${tabActiva === "pagadas" ? "activa" : ""}`}
          onClick={() => setTabActiva("pagadas")}
        >
          Pagadas
        </span>
      </div>

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
        {reservasFiltradas.map((reserva, index) => (
          <div
            className="reserva-mini"
            key={index}
            onClick={() => abrirModal(reserva)}
          >
            <h3>{reserva.infoMenu.servicio.tipoServicio.nombre}</h3>
            <p>
              <strong>Fecha:</strong> {reserva.datosEvento.fechaEvento}
            </p>
            <p>
              <strong>Dirección:</strong> {reserva.datosEvento.direccion}
            </p>
            <span className="ver-detalles">Ver detalles</span>
          </div>
        ))}
      </div>

      {modalVisible && selectedReserva && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Detalles de la Reserva</h3>
            <p>
              <strong>Fecha del Evento:</strong>{" "}
              {selectedReserva.datosEvento.fechaEvento}
            </p>
            <p>
              <strong>Hora de Inicio:</strong>{" "}
              {selectedReserva.datosEvento.horaInicio}
            </p>
            <p>
              <strong>Horas Contratadas:</strong>{" "}
              {selectedReserva.datosEvento.cantHoras}
            </p>
            <p>
              <strong>Tipo de Evento:</strong>{" "}
              {selectedReserva.datosEvento.tipoEvento}
            </p>
            <p>
              <strong>Dirección:</strong>{" "}
              {selectedReserva.datosEvento.direccion}
            </p>
            <p>
              <strong>Distrito:</strong> {selectedReserva.datosEvento.distrito}
            </p>
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservaTarj;
