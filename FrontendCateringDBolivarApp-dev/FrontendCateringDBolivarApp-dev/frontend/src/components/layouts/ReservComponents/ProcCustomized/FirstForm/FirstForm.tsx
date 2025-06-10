import React, { useState } from "react";
import styles from "@/components/layouts/ReservComponents/ProcCustomized/FirstForm/FirstForm.module.css";
import ButtonNext from "@/components/features/ButtonNext";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import { Pedido } from "@/components/Interfaces/Pedido";
import { DatosEvento } from "@/components/Interfaces/DatosEvento";

interface FirstFormProps {
  onBack: () => void;
  onNext: (datosEvento: DatosEvento) => void;
  pedido: Pedido;
}

export const FirstForm: React.FC<FirstFormProps> = ({
  onNext,
  onBack,
  pedido,
}) => {
  const [datosEvento, setDatosEvento] = useState(pedido.datosEvento);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setDatosEvento((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNext = () => {
    const {
      tipoEvento,
      fechaEvento,
      distrito,
      horaInicio,
      direccion,
      cantHoras,
    } = datosEvento;

    if (
      !tipoEvento ||
      !fechaEvento ||
      !distrito ||
      !horaInicio ||
      !direccion ||
      !cantHoras
    ) {
      alert("Por favor completa todos los campos");
      console.log("Faltan campos: ", datosEvento);
      return;
    }
    onNext(datosEvento);
  };

  return (
    <div className={styles.InteractionArea}>
      <form className={styles.FormArea} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.InputsArea}>
          <h1>Información del Evento</h1>
          <div className={styles.GridForm}>
            <div className={styles.FormInputs}>
              <label htmlFor="tipoEvento">Tipo de Evento</label>
              <input
                id="tipoEvento"
                placeholder="--Selecciona--"
                value={datosEvento.tipoEvento}
                onChange={handleChange}
              />
            </div>

            <div className={styles.FormInputs}>
              <label htmlFor="cantHoras">Cantidad de Horas</label>
              <input
                id="cantHoras"
                type="number"
                placeholder="Ej: 4"
                value={datosEvento.cantHoras}
                onChange={handleChange}
                min={1}
              />
            </div>

            <div className={styles.FormInputs}>
              <label htmlFor="fechaEvento">Fecha del Evento</label>
              <input
                id="fechaEvento"
                type="date"
                value={datosEvento.fechaEvento}
                onChange={handleChange}
              />
            </div>

            <div className={styles.FormInputs}>
              <label htmlFor="distrito">Distrito</label>
              <select
                className={styles.SelectDistrict}
                id="distrito"
                value={datosEvento.distrito}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --Selecciona un distrito--
                </option>
                <option value="los-olivos">Los Olivos</option>
                <option value="comas">Comas</option>
                <option value="puente-piedra">Puente Piedra</option>
                <option value="carabayllo">Carabayllo</option>
                <option value="smp">San Martín de Porres</option>
                <option value="independencia">Independencia</option>
              </select>
            </div>

            <div className={styles.FormInputs}>
              <label htmlFor="horaInicio">Hora de Inicio</label>
              <input
                id="horaInicio"
                type="time"
                value={datosEvento.horaInicio}
                onChange={handleChange}
              />
            </div>

            <div className={styles.FormInputs}>
              <label htmlFor="direccion">Dirección del Evento</label>
              <input
                id="direccion"
                placeholder="Dirección del evento"
                value={datosEvento.direccion}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.ButtonArea}>
            <ButtonPrevious texto="Anterior" onClick={onBack} />
            <ButtonNext texto="Siguiente" onClick={handleNext} />
          </div>
        </div>
      </form>
    </div>
  );
};
