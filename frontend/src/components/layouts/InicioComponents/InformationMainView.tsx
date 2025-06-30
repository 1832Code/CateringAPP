"use client";
import React, { useState } from "react";
import styles from "./InformationMainView.module.css";
import { TextGenerateEffectDemo } from "@/components/features/texto-demo";
import ButtonReservar from "@/components/features/ButtonReservar";
import { Usuario } from "@/components/Interfaces/Usuario";
interface Props {
  user: Usuario | null;
  onLogin: () => void;
}

export const InformationMainView: React.FC<Props> = ({ user, onLogin }) => {
  return (
    <div className={styles.MainArea}>
      <div className={styles.InformationArea}>
        {/*Component Text */}
        <div className={styles.TitleText}>
          <TextGenerateEffectDemo
            words="D'Bolivar Gourmet"
            className="text-[8vh] md:text-[8vh] lg:text-[12vh] xl:text-[12vh]"
            style={{
              fontFamily: "Italiana, sans-serif",
              fontWeight: 400,
            }}
          ></TextGenerateEffectDemo>
        </div>
        <div className={styles.FirstText}>
          <TextGenerateEffectDemo
            words="Sabores que enamoran, eventos que inspiran..."
            className="text-[4vh] md:text-[4vh] lg:text-[6vh] xl:text-[6vh]"
            style={{
              fontFamily: "Italiana, sans-serif",
            }}
          ></TextGenerateEffectDemo>
        </div>
        <p className={styles.SecondText}>Reserva tu catering ahora!!</p>
        <ButtonReservar></ButtonReservar>
      </div>
    </div>
  );
};
export default InformationMainView;
