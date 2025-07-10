import ButtonNext from "@/components/features/ButtonNext";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import { Pedido } from "@/components/Interfaces/Pedido";
import React, { useState } from "react";
import styles from "./DetailPersonal.module.css";

interface DetailPersonalProps {
  personal: InfoMenu["personal"];
  onBack: () => void;
  onNext: (personal: InfoMenu["personal"]) => void;
}

export const DetailPersonal: React.FC<DetailPersonalProps> = ({
  onBack,
  onNext,
  personal,
}) => {
  const [formData, setFormData] = useState(() => ({
    //Convierte los datos y los asegura en string y number
    personalInfo: personal.personalInfo.map((item) => ({
      tipoPersonal: item.tipoPersonal,
      cantidad: Number(item.cantidad),
    })),
  }));

  type Field = "tipoPersonal" | "cantidad";

  const handleChange = (index: number, field: Field, value: string) => {
    const updated = [...formData.personalInfo];
    updated[index] = {
      ...updated[index],
      [field]: field === "cantidad" ? parseInt(value, 10) || 0 : value,
    };
    setFormData({ personalInfo: updated });
  };

  const handleAdd = () => {
    setFormData((prev) => ({
      personalInfo: [...prev.personalInfo, { tipoPersonal: "", cantidad: 0 }],
    }));
  };

  const handleRemove = (index: number) => {
    const updated = [...formData.personalInfo];
    updated.splice(index, 1);
    setFormData({ personalInfo: updated });
  };

  const handleSubmit = () => {
    if (formData.personalInfo.length === 0) {
      // Si no hay ningún bloque, no actualizar y pasar el original
      onNext(personal); // se envían los datos originales sin cambios
      return;
    }
    for (let i = 0; i < formData.personalInfo.length; i++) {
      const item = formData.personalInfo[i];

      //Validamos que los campos de tipoPersonal esten llenos
      if (!item.tipoPersonal.trim()) {
        alert(`El campo "Tipo de Personal" en el bloque ${i + 1} está vacío.`);
        return;
      }
      //Validamos que los campos de cantidad esten llenos y entre 1 y 9
      if (!item.cantidad) {
        alert(`La "Cantidad" en el bloque ${i + 1} está vacio`);
        return;
      }
      console.log(
        "Tipo de cantidad:",
        typeof formData.personalInfo[0].cantidad
      );
    }
    console.log(formData);
    onNext(formData);
  };

  // Lista completa de tipos de personal
  const tiposDisponibles = ["Mozo", "Cocinero"];

  // Función que retorna las opciones que aún no han sido seleccionadas en otros bloques
  const getTipoPersonalOptions = (index: number) => {
    const seleccionados = formData.personalInfo
      .map((item, i) => (i !== index ? item.tipoPersonal : null))
      .filter(Boolean); // quita nulos y vacíos

    return tiposDisponibles.filter(
      (tipo) =>
        !seleccionados.includes(tipo) ||
        tipo === formData.personalInfo[index].tipoPersonal
    );
  };

  //Función que retorna las opciones de cantidad de cada personal
  const getCantidadOptions = (tipo: string) => {
    const max = tipo === "Cocinero" ? 3 : tipo === "Mozo" ? 7 : 0;
    return Array.from({ length: max }, (_, i) => i + 1);
  };

  return (
    <div className={styles.InteractionArea}>
      <h3>Detalle de Personal</h3>
      <div className={styles.TextArea}>
        <p>
          Por medio del presente formulario, el cliente puede solicitar el
          personal necesario para cubrir sus requerimientos. A continuación,
          complete los siguientes datos:
        </p>
        <p>
          Tipo de personal requerido:<br></br>
          <b>Primer Bloque:</b> Seleccione el cargo o perfil solicitado (ej.:
          "Mozo", "Cocinero", etc.)
        </p>
        <p>
          Cantidad de personas requeridas:<br></br>
          <b>Segundo Bloque:</b> Indique la cantidad de personal solicitado
        </p>
      </div>
      <div className={styles.ListArea}>
        {formData.personalInfo.map((item, index) => (
          <div
            className={styles.FormBlock}
            key={index}
            style={{ marginBottom: "1rem" }}
          >
            <div className={styles.InputArea}>
              {/* Select de Tipo de Personal */}
              <select
                value={item.tipoPersonal}
                onChange={(e) =>
                  handleChange(index, "tipoPersonal", e.target.value)
                }
              >
                <option value="">Tipo de Personal</option>
                {getTipoPersonalOptions(index).map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>

              {/* Select de Cantidad */}
              <select
                value={item.cantidad || ""}
                onChange={(e) =>
                  handleChange(index, "cantidad", e.target.value)
                }
                disabled={!item.tipoPersonal}
              >
                <option value="">Cantidad</option>
                {getCantidadOptions(item.tipoPersonal).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={() => handleRemove(index)}>Eliminar</button>
          </div>
        ))}
        <button
          onClick={handleAdd}
          disabled={formData.personalInfo.length >= tiposDisponibles.length}
        >
          Agregar Personal
        </button>
      </div>
      <div className={styles.ButtonArea}>
        <ButtonPrevious onClick={onBack} texto="Anterior"></ButtonPrevious>
        <ButtonNext onClick={handleSubmit} texto="Siguiente"></ButtonNext>
      </div>
    </div>
  );
};
