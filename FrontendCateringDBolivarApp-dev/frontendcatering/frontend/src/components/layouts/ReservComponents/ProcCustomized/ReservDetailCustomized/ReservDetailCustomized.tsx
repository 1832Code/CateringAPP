import React from "react";
import styles from "./ReservDetailCustomized.module.css";
import { Pedido } from "@/components/Interfaces/Pedido";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import ButtonNext from "@/components/features/ButtonNext";
import Card from "@/components/features/Card";

interface ReservDetailCustomizedProps {
  pedido: Pedido;
  onBack: () => void;
  onNext: () => void;
}
export const ReservDetailCustomized: React.FC<ReservDetailCustomizedProps> = ({
  onBack,
  onNext,
  pedido,
}) => {
  const handleNext = () => {
    console.log("Pedido:", JSON.parse(JSON.stringify(pedido)));
    onNext();
  };
  return (
    <div className={styles.InteractionArea}>
      <div className={styles.DetailsArea}>
        <div className={styles.InfoArea}>
          <h1>Resumen de la Reserva</h1>
          <h5>Datos del Evento</h5>
          <p>
            <strong>Tipo de Evento:</strong> {pedido.datosEvento.tipoEvento}
          </p>
          <p>
            <strong>Cantidad de Horas:</strong> {pedido.datosEvento.cantHoras}
          </p>
          <p>
            <strong>Fecha del Evento:</strong> {pedido.datosEvento.fechaEvento}
          </p>
          <p>
            <strong>Hora de Inicio:</strong> {pedido.datosEvento.horaInicio}
          </p>
          <p>
            <strong>Distrito:</strong> {pedido.datosEvento.distrito}
          </p>
          <p>
            <strong>Dirección del Evento:</strong>{" "}
            {pedido.datosEvento.direccion}
          </p>
          <h5>Datos del Servicio</h5>
          <p>
            <strong>Tipo de Servicio:</strong>{" "}
            {pedido.infoMenu.servicio.tipoServicio.nombre}
          </p>
          <div className={styles.ResultDetailArea}>
            <strong>Detalles del Servicio</strong>
            <div>
              {pedido.infoMenu.servicio.items.map((item, index) => (
                <div key={index}>- {item.item.nombre} </div>
              ))}
            </div>
          </div>
          {pedido.infoMenu.personal.personalInfo.length > 0 && (
            <div className={styles.ResultDetailArea}>
              <strong>Detalles del Personal</strong>
              <div>
                {pedido.infoMenu.personal.personalInfo.map((item, index) => (
                  <div key={index}>
                    - {item.tipoPersonal} | {item.cantidad}{" "}
                  </div>
                ))}
              </div>
            </div>
          )}
          {pedido.infoMenu.extra.extraInfo.length > 0 && (
            <div className={styles.ResultDetailArea}>
              <strong>Detalles de Extra</strong>
              <div>
                {pedido.infoMenu.extra.extraInfo.map((item, index) => (
                  <div key={index}>
                    - {item.tipoExtra} | {item.cantidad}{" "}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className={styles.ButtonArea}>
          <ButtonPrevious texto="Anterior" onClick={onBack} />
          <ButtonNext texto="Reservar" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
