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
          Tipo de extra requerido:<br></br>- Seleccione el item extra a
          solicitar (ej.: "Pisco Sour", "Mojito", "Machu Picchu", "Daikiri",
          etc.)
        </p>
        <p>
          Cantidad de items extras requeridos:<br></br>- Indique la cantidad de
          items extras.
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
