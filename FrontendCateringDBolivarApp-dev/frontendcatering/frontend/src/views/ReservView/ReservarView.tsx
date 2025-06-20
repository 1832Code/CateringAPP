"use client";
import NavComponent from "@/components/layouts/NavComponents/NavComponent";
import React from "react";
import styles from "./ReservarView.module.css";
import { ReservPredetermined } from "@/components/layouts/ReservComponents/ProcPredetermined/ReservPredetermined";
import { ReservCustomized } from "@/components/layouts/ReservComponents/ProcCustomized/ReservCustomized";
import { useState, useEffect } from "react";
import { SelectOptionForm } from "@/components/layouts/ReservComponents/SelectOptionForm";
import { HeaderComponent } from "@/components/layouts/HeaderComponents/HeaderComponent";
import RouteLoadingProvider from "@/context/RouteLoadingProvider";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";

export const ReservarView = () => {
  const [selectedOption, setSelectedOption] = useState<
    "predeterminado" | "personalizado" | null
  >(null);

  const [isMounted, setIsMounted] = useState(false);
  const [items, setItems] = useState<InfoMenu[]>([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/infomenu")
      .then((res) => res.json())
      .then((data: InfoMenu[]) => {
        console.log("Contenido real de la respuesta:", data); //  Verify that it is an array
        setItems(data);
      })
      .catch((err) => console.error("Error fetching menu packages:", err));
  }, []);

  return (
    <>
      <div className={styles.MainArea}>
        <div className={styles.Header}>
          <HeaderComponent></HeaderComponent>
        </div>
        <div className={styles.NavArea}>
          <NavComponent></NavComponent>
          <h1>Reservaciones</h1>
        </div>
        <div className={styles.ContainerForm}>
          <div className={styles.InteractionArea}>
            {!isMounted && (
              <SelectOptionForm
                onSelectOption={(option) => {
                  setSelectedOption(option);
                  setIsMounted(true); // Al seleccionar, ocultamos SelectOptionForm y mostramos el formulario
                }}
              />
            )}

            {isMounted && selectedOption === "predeterminado" ? (
              <RouteLoadingProvider>
                <ReservPredetermined
                  items={items}
                  onBack={() => setIsMounted(false)}
                />
              </RouteLoadingProvider>
            ) : isMounted && selectedOption === "personalizado" ? (
              <RouteLoadingProvider>
                <ReservCustomized
                  items={items}
                  onBack={() => setIsMounted(false)}
                ></ReservCustomized>
              </RouteLoadingProvider>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default ReservarView;
