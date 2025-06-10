import React, { useEffect, useState } from "react";
import styles from "./SelectionType.module.css";
import { Pedido } from "@/components/Interfaces/Pedido";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import { TipoServicio } from "@/components/Interfaces/TipoServicio";
import CardSelectionTypeService from "@/components/features/CardSelectionTypeService";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import ButtonNext from "@/components/features/ButtonNext";
import { DatosEvento } from "@/components/Interfaces/DatosEvento";

interface SelectionTypeServiceProps {
  onBack: () => void;
  onSeleccionar: (data: InfoMenu["servicio"]["tipoServicio"]) => void;
}

export const SelectionTypeService: React.FC<SelectionTypeServiceProps> = ({
  onBack,
  onSeleccionar,
}) => {
  const [typeService, setTypeService] = useState<TipoServicio[]>([]);
  useEffect(() => {
    fetch("http://localhost:8084/api/tipo-servicio")
      .then((res) => res.json())
      .then((data: TipoServicio[]) => {
        setTypeService(data);
      })
      .catch((err) => console.error("Error fetching items:", err));
  }, []);
  return (
    <div className={styles.InteractionArea}>
      <h1>Seleccione el tipo de servicio</h1>
      <div className={styles.CardsArea}>
        {typeService.map((tipoServicio) => (
          <CardSelectionTypeService
            key={tipoServicio.id}
            tipoServicio={tipoServicio}
            onSeleccionar={onSeleccionar}
          ></CardSelectionTypeService>
        ))}
      </div>
      <div className={styles.ButtonArea}>
        <ButtonPrevious texto="Anterior" onClick={onBack} />
      </div>
    </div>
  );
};
export default SelectionTypeService;
