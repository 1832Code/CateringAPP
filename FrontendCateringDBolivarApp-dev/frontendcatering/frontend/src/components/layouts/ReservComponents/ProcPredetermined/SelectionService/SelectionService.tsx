import React from "react";
import styles from "./SelectionService.module.css";
import ButtonPrevious from "@/components/features/ButtonPrevious";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import CardReservar from "@/components/features/CardReservar";

interface SelectionServiceProps {
  onSeleccionar: (card: InfoMenu) => void;
  items: InfoMenu[];
  onBack: () => void;
}

export const SelectionService: React.FC<SelectionServiceProps> = ({
  onSeleccionar,
  items,
  onBack,
}) => {
  return (
    <div className={styles.InteractionArea}>
      <div className={styles.TextAreaSelection}>
        <p>
          Reserva hoy mismo tu paquete de menú predeterminado y sorprende a tus
          invitados con sabores únicos, atención de calidad y una experiencia
          inolvidable.
        </p>
      </div>
      <div className={styles.CarouselArea}>
        <div className={styles.ExpandableCardDemo}>
          {items.map((item, index) => (
            <CardReservar
              onSeleccionar={onSeleccionar}
              key={index}
              item={item}
            />
          ))}
        </div>
        <ButtonPrevious
          customStyles={{ fontSize: 16 }}
          texto="Anterior"
          onClick={onBack}
        ></ButtonPrevious>
      </div>
    </div>
  );
};
