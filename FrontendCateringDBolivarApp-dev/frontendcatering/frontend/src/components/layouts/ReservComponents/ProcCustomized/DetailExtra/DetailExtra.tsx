import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import { Pedido } from "@/components/Interfaces/Pedido";
import React, { useState } from "react";
import styles from "./DetailExtra.module.css";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import ButtonNext from "@/components/features/ButtonNext";

interface DetailExtraProps {
  extra: InfoMenu["extra"];
  onBack: () => void;
  onNext: (extra: InfoMenu["extra"]) => void;
}

export const DetailExtra: React.FC<DetailExtraProps> = ({
  onBack,
  onNext,
  extra,
}) => {
  const [formData, setFormData] = useState(() => ({
    //Convierte los datos y los asegura en string y number
    extraInfo: extra.extraInfo.map((item) => ({
      tipoExtra: item.tipoExtra,
      cantidad: Number(item.cantidad),
    })),
  }));

  type Field = "tipoExtra" | "cantidad";

  const handleChange = (index: number, field: Field, value: string) => {
    const updated = [...formData.extraInfo];
    updated[index] = {
      ...updated[index],
      [field]: field === "cantidad" ? parseInt(value, 10) || 0 : value,
    };
    setFormData({ extraInfo: updated });
  };

  const handleAdd = () => {
    setFormData((prev) => ({
      extraInfo: [...prev.extraInfo, { tipoExtra: "", cantidad: 0 }],
    }));
  };

  const handleRemove = (index: number) => {
    const updated = [...formData.extraInfo];
    updated.splice(index, 1);
    setFormData({ extraInfo: updated });
  };

  const handleSubmit = () => {
    if (formData.extraInfo.length === 0) {
      // Si no hay ningún bloque, no actualizar y pasar el original
      onNext(extra); // se envían los datos originales sin cambios
      return;
    }
    for (let i = 0; i < formData.extraInfo.length; i++) {
      const item = formData.extraInfo[i];

      //Validamos que los campos de tipoextra esten llenos
      if (typeof item.tipoExtra !== "string" || item.tipoExtra.trim() === "") {
        alert(`El campo "Tipo de Extra" en el bloque ${i + 1} está vacío.`);
        return;
      }
      //Validamos que los campos de cantidad esten llenos y entre 1 y 9
      if (!item.cantidad || item.cantidad < 20 || item.cantidad > 100) {
        alert(`La "Cantidad" en el bloque ${i + 1} debe estar entre 20 y 100.`);
        return;
      }
      console.log("Tipo de cantidad:", typeof formData.extraInfo[0].cantidad);
    }
    console.log(formData);
    onNext(formData);
  };

  return (
    <div className={styles.InteractionArea}>
      <h3>Detalle de Extras</h3>
      <div className={styles.TextArea}>
        <p>
          Por medio del presente formulario, el cliente puede solicitar items
          extras según su preferencia. A continuación, complete los siguientes
          datos:
        </p>
        <p>
          Tipo de extra requerido:<br></br>
          <b>Primer Bloque:</b> Seleccione el item extra a solicitar (ej.:
          "Pisco Sour", "Mojito", "Machu Picchu", "Daikiri", etc.)
        </p>
        <p>
          Cantidad de items extras requeridos:<br></br>
          <b>Segundo Bloque:</b> Indique la cantidad de items extras.
        </p>
      </div>
      <div className={styles.ListArea}>
        {formData.extraInfo.map((item, index) => (
          <div
            className={styles.FormBlock}
            key={index}
            style={{ marginBottom: "1rem" }}
          >
            <div className={styles.InputArea}>
              <input
                type="text"
                placeholder="Tipo de Extra"
                value={item.tipoExtra}
                onChange={(e) =>
                  handleChange(index, "tipoExtra", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={item.cantidad}
                onChange={(e) =>
                  handleChange(index, "cantidad", e.target.value)
                }
              />
            </div>
            <button onClick={() => handleRemove(index)}>Eliminar</button>
          </div>
        ))}
        <button onClick={handleAdd}>Agregar Extra</button>
      </div>
      <div className={styles.ButtonArea} style={{ marginTop: "1rem" }}>
        <ButtonPrevious texto="Anterior" onClick={onBack}></ButtonPrevious>
        <ButtonNext texto="Siguiente" onClick={handleSubmit}></ButtonNext>
      </div>
    </div>
  );
};
