// src/components/layouts/LoginComponents/UserButton.tsx
import styles from "./UserButton.module.css";
import React, { forwardRef } from "react";
import img from "@/assets/images/ImageUserDefault.png"; // Asegúrate de que esta ruta sea correcta

interface UserButtonProps {
  userName: string; // Nueva prop para el nombre del usuario
  userType?: string; // Opcional, si quieres mostrar el rol/tipo de usuario
  onClick: () => void; // Para el evento de clic que abrirá el dropdown
}

export const UserButton = ({
  userName,
  userType = "Cliente",
  onClick,
}: UserButtonProps) => {
  return (
    <>
      <button className={styles.MainArea} onClick={onClick}>
        {" "}
        {/* Cambiado a <button> para accesibilidad */}
        <div className={styles.ImageArea}>
          <img src={img.src} alt="User Avatar"></img> {/* Agregado alt text */}
        </div>
        <div className={styles.UserArea}>
          <div className={styles.nameUser}>{userName}</div>
          <div className={styles.typeUser}>{userType}</div>
        </div>
      </button>
    </>
  );
};
