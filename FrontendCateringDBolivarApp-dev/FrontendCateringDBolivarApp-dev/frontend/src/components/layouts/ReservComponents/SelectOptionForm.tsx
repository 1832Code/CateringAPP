import React from "react";
import styles from "./SelectOptionForm.module.css";
import RotatingCard from "@/components/features/RotatingCard";
import imageDefault from "@/assets/images/Predeterminado.jpg";
import imageCustomized from "@/assets/images/Personalizado.jpg";

export const SelectOptionForm = ({
  onSelectOption,
}: {
  onSelectOption: (option: "predeterminado" | "personalizado") => void;
}) => {
  return (
    <>
      <div className={styles.InteractionArea}>
        <div className={styles.TextArea}>
          <h1>Elige tu opción de Reserva</h1>
          <p>
            Reserva ahora nuestros paquetes establecidos sofisticadamente para
            todo gusto, u opta por una reserva personalizada desde la comodidad
            de tu hogar!
          </p>
        </div>
        <div className={styles.LayoutArea}>
          <div className={styles.CardsArea}>
            {/*According to the select option, a process is shown*/}
            <div onClick={() => onSelectOption("predeterminado")}>
              <RotatingCard
                texto="Paquetes Catering"
                intro="Ideal para quienes desean una solución completa con platos ya seleccionados"
                parrafo="Selecciona entre nuestros paquetes de menú predefinidos, diseñados para ofrecerte una experiencia rápida, deliciosa y sin complicaciones."
                imageBackground={imageDefault.src}
              ></RotatingCard>
            </div>
            <div onClick={() => onSelectOption("personalizado")}>
              <RotatingCard
                texto="Catering Personalizado"
                intro="Recomendado para celebraciones especiales en la que cada detalle cuente"
                parrafo="Diseña tu evento a tu manera. Elige los platos, servicios adicionales, horarios y detalles específicos según tus gustos y necesidades."
                imageBackground={imageCustomized.src}
              ></RotatingCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
