import ButtonNext from "@/components/features/ButtonNext";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import { Pedido } from "@/components/Interfaces/Pedido";
import React, { useState } from "react";

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
    for (let i = 0; i <= formData.personalInfo.length; i++) {
      console.log(
        "Tipo de cantidad:",
        typeof formData.personalInfo[0].cantidad
      );
    }
    console.log(formData);
    onNext(formData);
  };

  return (
    <div>
      <h2>Detalle de Personal</h2>
      {formData.personalInfo.map((item, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Tipo de Personal"
            value={item.tipoPersonal}
            onChange={(e) =>
              handleChange(index, "tipoPersonal", e.target.value)
            }
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
      <button onClick={handleAdd}>Agregar Personal</button>
      <div style={{ marginTop: "1rem" }}>
        <ButtonPrevious onClick={onBack} texto="Anterior"></ButtonPrevious>
        <ButtonNext onClick={handleSubmit} texto="Siguiente"></ButtonNext>
      </div>
    </div>
  );
};
