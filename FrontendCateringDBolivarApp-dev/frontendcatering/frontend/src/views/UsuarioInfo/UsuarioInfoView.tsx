import React from "react";
import NavComponent from "../../components/layouts/NavComponents/NavComponent";
import UsuarioInfo from "../../components/UsuarioInfo/UsuarioInfoo"; // asegúrate de que sea la ruta correcta
import styles from "./UsuarioInfoView.module.css";
import { HeaderComponent } from "@/components/layouts/HeaderComponents/HeaderComponent";

export const UsuarioInfoView = () => {
  return (
    <div className={styles.MainArea}>
      <div className={styles.Header}>
        <HeaderComponent />
      </div>
      <div className={styles.NavArea}>
        <NavComponent />
        <h1>Perfil</h1>
      </div>
      <div className={styles.ContainerForm}>
        <div className={styles.UsuarioInfocontainer}>
          <UsuarioInfo />
        </div>
      </div>
    </div>
  );
};

export default UsuarioInfoView;
