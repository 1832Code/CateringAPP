import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import { Pedido } from "@/components/Interfaces/Pedido";
import React, { useState } from "react";

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
    <div>
      <h2>Detalle de Extras</h2>
      {formData.extraInfo.map((item, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Tipo de Extra"
            value={item.tipoExtra}
            onChange={(e) => handleChange(index, "tipoExtra", e.target.value)}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={item.cantidad}
            onChange={(e) => handleChange(index, "cantidad", e.target.value)}
          />
          <button onClick={() => handleRemove(index)}>Eliminar</button>
        </div>
      ))}
      <button onClick={handleAdd}>Agregar Extra</button>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={onBack}>Atrás</button>
        <button onClick={handleSubmit}>Siguiente</button>
      </div>
    </div>
  );
};
