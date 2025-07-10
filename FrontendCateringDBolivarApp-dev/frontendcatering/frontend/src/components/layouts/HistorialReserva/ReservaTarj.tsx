import React, { useState, useEffect } from "react";
import "./ReservaTarj.css";

interface PedidoReserva {
  id: number;
  usuarioId: number;
  infoMenuId: number;
  estado: string;
  datosEvento: {
    fechaEvento: string;
    horaInicio: string;
    cantHoras: number;
    tipoEvento: string;
    direccion: string;
    distrito: string;
  };
  infoMenu: {
    servicio: {
      tipoServicio: {
        nombre: string;
      };
    };
  };
}

const ReservaTarj: React.FC = () => {
  const [reservas, setReservas] = useState<PedidoReserva[]>([]);
  const [selectedReserva, setSelectedReserva] = useState<PedidoReserva | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [tabActiva, setTabActiva] = useState<"reservas" | "pagadas">(
    "reservas"
  );

  const [modoAccion, setModoAccion] = useState<"modificar" | "eliminar" | null>(
    null
  );
  const [esperandoSeleccion, setEsperandoSeleccion] = useState(false);

  useEffect(() => {
    obtenerDetallesReserva();
  }, []);

  const obtenerDetallesReserva = async () => {
    try {
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

  const handleClickReserva = (reserva: PedidoReserva) => {
    if (esperandoSeleccion && modoAccion) {
      if (reserva.estado === "Pagado") {
        alert("No se puede modificar o eliminar una reserva pagada.");
        setModoAccion(null);
        setEsperandoSeleccion(false);
        return;
      }

      setSelectedReserva(reserva);
      setEsperandoSeleccion(false);

      if (modoAccion === "modificar") {
        setModoEdicion(true);
        setModalVisible(true);
      } else if (modoAccion === "eliminar") {
        eliminarPedido(reserva.id);
      }

      setModoAccion(null);
    } else {
      setSelectedReserva(reserva);
      setModoEdicion(false);
      setModalVisible(true);
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setModoEdicion(false);
    setSelectedReserva(null);
  };

  const eliminarPedido = async (id: number) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que deseas eliminar esta reserva?"
    );
    if (!confirmacion) return;

    try {
      const response = await fetch(`http://localhost:8084/api/pedidos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        alert("Reserva eliminada exitosamente");
        cerrarModal();
        obtenerDetallesReserva();
      } else {
        alert("Error al eliminar la reserva");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al eliminar");
    }
  };

  const guardarCambios = async () => {
    if (!selectedReserva) return;

    try {
      const response = await fetch(
        `http://localhost:8084/api/pedidos/v2/${selectedReserva.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(selectedReserva),
        }
      );

      if (response.ok) {
        alert("Reserva modificada correctamente");
        cerrarModal();
        obtenerDetallesReserva();
      } else {
        alert("Error al modificar la reserva");
      }
    } catch (error) {
      console.error("Error al modificar:", error);
      alert("Ocurrió un error al modificar la reserva.");
    }
  };

  const reservasFiltradas = reservas.filter((reserva) =>
    tabActiva === "pagadas"
      ? reserva.estado === "Pagado"
      : reserva.estado !== "Pagado"
  );

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

          {tabActiva === "reservas" && (
            <div className="botones-horizontales">
              <button className="btn-pagar">Pagar</button>
              <button
                onClick={() => {
                  setModoAccion("modificar");
                  setEsperandoSeleccion(true);
                  alert("Haz clic en una reserva para modificar.");
                }}
              >
                Modificar
              </button>
              <button
                onClick={() => {
                  setModoAccion("eliminar");
                  setEsperandoSeleccion(true);
                  alert("Haz clic en una reserva para eliminar.");
                }}
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="tarjetas-grid">
        {reservasFiltradas.map((reserva, index) => (
          <div
            className={`reserva-mini ${
              selectedReserva?.id === reserva.id ? "seleccionada" : ""
            }`}
            key={index}
            onClick={() => handleClickReserva(reserva)}
          >
            <h3>{reserva.infoMenu.servicio.tipoServicio.nombre}</h3>
            <p>
              <strong>Fecha:</strong> {reserva.datosEvento.fechaEvento}
            </p>
            <p>
              <strong>Dirección:</strong> {reserva.datosEvento.direccion}
            </p>
            <span
              className="ver-detalles"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedReserva(reserva);
                setModoEdicion(false);
                setModalVisible(true);
              }}
            >
              Ver detalles
            </span>
          </div>
        ))}
      </div>

      {modalVisible && selectedReserva && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Detalles de la Reserva</h3>

            {modoEdicion ? (
              <>
                <label>Fecha del Evento:</label>
                <input
                  type="date"
                  value={selectedReserva.datosEvento.fechaEvento}
                  onChange={(e) =>
                    setSelectedReserva({
                      ...selectedReserva,
                      datosEvento: {
                        ...selectedReserva.datosEvento,
                        fechaEvento: e.target.value,
                      },
                    })
                  }
                />

                <label>Hora de Inicio:</label>
                <input
                  type="time"
                  value={selectedReserva.datosEvento.horaInicio}
                  onChange={(e) =>
                    setSelectedReserva({
                      ...selectedReserva,
                      datosEvento: {
                        ...selectedReserva.datosEvento,
                        horaInicio: e.target.value,
                      },
                    })
                  }
                />

                <label>Horas Contratadas:</label>
                <input
                  type="number"
                  value={selectedReserva.datosEvento.cantHoras}
                  onChange={(e) =>
                    setSelectedReserva({
                      ...selectedReserva,
                      datosEvento: {
                        ...selectedReserva.datosEvento,
                        cantHoras: Number(e.target.value),
                      },
                    })
                  }
                />

                <label>Tipo de Evento:</label>
                <input
                  type="text"
                  value={selectedReserva.datosEvento.tipoEvento}
                  onChange={(e) =>
                    setSelectedReserva({
                      ...selectedReserva,
                      datosEvento: {
                        ...selectedReserva.datosEvento,
                        tipoEvento: e.target.value,
                      },
                    })
                  }
                />

                <label>Dirección:</label>
                <input
                  type="text"
                  value={selectedReserva.datosEvento.direccion}
                  onChange={(e) =>
                    setSelectedReserva({
                      ...selectedReserva,
                      datosEvento: {
                        ...selectedReserva.datosEvento,
                        direccion: e.target.value,
                      },
                    })
                  }
                />

                <label>Distrito:</label>
                <input
                  type="text"
                  value={selectedReserva.datosEvento.distrito}
                  onChange={(e) =>
                    setSelectedReserva({
                      ...selectedReserva,
                      datosEvento: {
                        ...selectedReserva.datosEvento,
                        distrito: e.target.value,
                      },
                    })
                  }
                />

                <div className="modal-botones">
                  <button className="btn-editar" onClick={guardarCambios}>
                    Guardar
                  </button>
                  <button onClick={cerrarModal}>Cancelar</button>
                </div>
              </>
            ) : (
              <>
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
                  <strong>Distrito:</strong>{" "}
                  {selectedReserva.datosEvento.distrito}
                </p>

                <div className="modal-botones">
                  <button onClick={cerrarModal}>Cerrar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservaTarj;
