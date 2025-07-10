import React, { useState } from "react";
import styles from "@/components/layouts/ReservComponents/ProcCustomized/FirstForm/FirstForm.module.css";
import ButtonNext from "@/components/features/ButtonNext";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import { Pedido } from "@/components/Interfaces/Pedido";
import { DatosEvento } from "@/components/Interfaces/DatosEvento";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // importa el estilo base
import { format } from "date-fns"; // para formatear a yyyy-MM-dd

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
      <form className={styles.FormArea} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.InputsArea}>
          <h1>Información del Evento</h1>
          <div className={styles.GridForm}>
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
              <DatePicker
                selected={
                  datosEvento.fechaEvento
                    ? new Date(datosEvento.fechaEvento)
                    : null
                }
                onChange={(date: Date | null) => {
                  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";
                  setDatosEvento((prev) => ({
                    ...prev,
                    fechaEvento: formattedDate,
                  }));
                }}
                dateFormat="yyyy-MM-dd"
                className={styles.customInput}
                calendarClassName={styles.customCalendar}
                minDate={new Date()}
                placeholderText="Selecciona la fecha"
                id="fechaEvento"
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
