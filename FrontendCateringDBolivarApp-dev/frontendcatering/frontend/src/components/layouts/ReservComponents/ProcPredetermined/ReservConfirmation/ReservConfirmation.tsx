import React from "react";
import styles from "./ReservConfirmation.module.css";
import Card from "@/components/features/Card";
import check from "@/assets/images/Check.png";
import ButtonNext from "@/components/features/ButtonNext";
import { useRouter } from "next/navigation";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";

interface ReservConfirmationProps {
  menu: InfoMenu;
}

export const ReservConfirmation: React.FC<ReservConfirmationProps> = ({
  menu,
}) => {
  const router = useRouter();
  const goToHistorial = () => {
    router.push("/historial");
  };

  return (
    <>
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
              Dirijase al Historial de Reservas para hacer el pago y nos
              pondremos en contacto con Usted.
            </p>
            <ButtonNext
              onClick={goToHistorial}
              texto="Historial de Reservas"
            ></ButtonNext>
          </div>
          <div className={styles.ServiceInfo}>
            <Card menu={menu} />
          </div>
        </div>
      </div>
    </>
  );
};
