import React from "react";
import styles from "./ConfirmationCustomized.module.css";
import { useRouter } from "next/navigation";
import check from "@/assets/images/Check.png";
import ButtonNext from "@/components/features/ButtonNext";

export const ReservConfirmationCustomized = () => {
  const router = useRouter();
  const goToHistorial = () => {
    router.push("/historial");
  };
  return (
    <div className={styles.InteractionArea}>
      <div className={styles.LayoutArea}>
        <div className={styles.ConfirmationArea}>
          <div className={styles.ConfirmationText}>
            <h1>Reserva Exitosa</h1>
            <img className={styles.ImageCheck} src={check.src}></img>
          </div>
          <h5>
            Su reserva ha sido guardada con éxito en el Historial de Reservas
          </h5>
          <p>
            Dirijase al Historial de Reservas para hacer el pago y nos pondremos
            en contacto con Usted.
          </p>
          <ButtonNext
            onClick={goToHistorial}
            texto="Historial de Reservas"
          ></ButtonNext>
        </div>
      </div>
    </div>
  );
};
