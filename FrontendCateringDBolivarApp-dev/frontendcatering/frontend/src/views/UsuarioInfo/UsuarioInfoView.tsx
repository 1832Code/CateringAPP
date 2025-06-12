import React from "react";
import NavComponent from "../../components/layouts/NavComponents/NavComponent";
import UsuarioInfo from "../../components/UsuarioInfo/UsuarioInfoo";
import styles from "./UsuarioInfoView.module.css";
import { HeaderComponent } from "@/components/layouts/HeaderComponents/HeaderComponent";

export const UsuarioInfoView = () => {
  // Prueba
  const usuario = {
    nombre: "Jorge",
    apellidos: "Chicana",
    telefono: "999888777",
    dni: "87654321",
    direccion: "Jr. Luisa 456, Lima Norte",
    correo: "Aji@gmail.com",
  };

  return (
    <>
      <div className={styles.MainArea}>
        <div className={styles.Header}>
          <HeaderComponent></HeaderComponent>
        </div>
        <div className={styles.NavArea}>
          <NavComponent></NavComponent>
          <h1>Perfil</h1>
        </div>
        <div className={styles.ContainerForm}>
          <div className={styles.UsuarioInfocontainer}>
            <UsuarioInfo
              nombre={usuario.nombre}
              apellidos={usuario.apellidos}
              telefono={usuario.telefono}
              dni={usuario.dni}
              direccion={usuario.direccion}
              correo={usuario.correo}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UsuarioInfoView;
