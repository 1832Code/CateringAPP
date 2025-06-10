import React from "react";
import styles from "./UserButton.module.css";
import img from "@/assets/images/ImageUserDefault.png";
export const UserButton = () => {
  return (
    <>
      <div className={styles.MainArea}>
        <div className={styles.ImageArea}>
          <img src={img.src}></img>
        </div>
        <div className={styles.UserArea}>
          <div className={styles.nameUser}>Nombre</div>
          <div className={styles.typeUser}>Cliente</div>
        </div>
      </div>
    </>
  );
};
