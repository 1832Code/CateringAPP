import React from "react";
import NavComponent from "../../components/layouts/NavComponents/NavComponent";
import ReservaTarje from "../../components/HistorialReserva/ReservaTarj";
import styles from "./Historial.module.css";
import { HeaderComponent } from "@/components/layouts/HeaderComponents/HeaderComponent";
export const HistorialView = () => {
  return (
    <>
      <div className={styles.MainArea}>
        <div className={styles.Header}>
          <HeaderComponent></HeaderComponent>
        </div>
        <div className={styles.NavArea}>
          <NavComponent></NavComponent>
          <h1>Historial de Reservas</h1>
        </div>
        <div className={styles.ContainerForm}>
          <div className={styles.HistorialContainer}>
            <ReservaTarje />
          </div>
        </div>
      </div>
    </>
  );
};
export default HistorialView;
