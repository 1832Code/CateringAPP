import React from "react";
import styles from "./InformationForm.module.css";
import Card from "@/components/features/Card";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import ButtonNext from "@/components/features/ButtonNext";
import { useState } from "react";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import { DatosEvento } from "@/components/Interfaces/DatosEvento";
import { Pedido } from "@/components/Interfaces/Pedido";

interface Props {
  pedido: Pedido;
  onNext: (data: DatosEvento) => void;
  onBack: () => void;
}

export const InformationForm: React.FC<Props> = ({
  pedido,
  onNext,
  onBack,
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
  //Function to control the inputs
  const handleNext = () => {
    const {
      tipoEvento,
      fechaEvento,
      horaInicio,
      direccion,
      distrito,
      cantHoras,
    } = datosEvento;
    if (
      !tipoEvento ||
      !fechaEvento ||
      !horaInicio ||
      !direccion ||
      !distrito ||
      !cantHoras
    ) {
      alert("Por favor completa todos los campos");
      return;
    }
    onNext(datosEvento);
  };

  return (
    <div className={styles.InteractionArea}>
      <div className={styles.ServiceInfo}>
        <h2>Menú Seleccionado</h2>
        {/*Show Service Selected */}
        <Card menu={pedido.infoMenu} />
      </div>

      <form className={styles.FormArea} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.AreaForm}>
          <h1>Información del Evento</h1>
          <div className="grid grid-cols-2 gap-4">
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
                placeholder="-- Seleccione --"
                value={datosEvento.cantHoras}
                onChange={handleChange}
              />
            </div>

            <div className={styles.FormInputs}>
              <label htmlFor="fechaEvento">Fecha del Evento</label>
              <input
                id="fechaEvento"
                type="date"
                value={datosEvento.fechaEvento} // usar directamente como string
                onChange={(e) =>
                  setDatosEvento((prev) => ({
                    ...prev,
                    fechaEvento: e.target.value, // guardar como string
                  }))
                }
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
                value={datosEvento.horaInicio} // HH:MM
                onChange={(e) =>
                  setDatosEvento((prev) => ({
                    ...prev,
                    horaInicio: e.target.value,
                  }))
                }
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
