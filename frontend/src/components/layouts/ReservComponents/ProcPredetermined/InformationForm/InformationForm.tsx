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
    // Validación de fecha del evento
    const today = new Date();
    const eventDate = new Date(fechaEvento);

    // El mínimo permitido es dentro de exactamente 7 días
    const minDate = new Date();
    minDate.setDate(today.getDate() + 6);

    if (eventDate < minDate) {
      alert("La fecha del evento debe ser al menos dentro de 7 días.");
      return;
    }
    onNext(datosEvento);
    console.log(datosEvento);
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
              <select
                className={styles.SelectForm}
                id="tipoEvento"
                value={datosEvento.tipoEvento}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --Tipo de Evento--
                </option>
                <option value="corporativo-empresarial">
                  Corporativo | Empresarial
                </option>
                <option value="social-particular">Social | Particular</option>
                <option value="publico-institucional">
                  Público | Institucional
                </option>
              </select>
            </div>

            <div className={styles.FormInputs}>
              <label htmlFor="cantHoras">Cantidad de Horas</label>
              <select
                className={styles.SelectForm}
                id="cantHoras"
                value={datosEvento.cantHoras}
                onChange={handleChange}
              >
                <option value="" disabled>
                  --Cantidad de Horas--
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
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
                className={styles.SelectForm}
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
