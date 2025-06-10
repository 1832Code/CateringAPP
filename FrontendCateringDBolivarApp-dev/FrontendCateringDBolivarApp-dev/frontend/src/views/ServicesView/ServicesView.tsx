import React, { useEffect, useState } from "react";
import NavComponent from "../../components/layouts/NavComponents/NavComponent";
import { CarouselDemo } from "@/components/features/carousel-demo";
import styles from "./ServicesView.module.css";
import { HeaderComponent } from "@/components/layouts/HeaderComponents/HeaderComponent";
import { InfoMenu } from "@/components/Interfaces/InfoMenu";
import { Carousel } from "primereact/carousel";
import CircularCarousel from "@/components/features/CircularCarousel";
import { info } from "console";

export const ServicesView = () => {
  const [infoMenu, setInfoMenu] = useState<InfoMenu[]>([]);
  useEffect(() => {
    fetch("http://localhost:8084/api/infomenu")
      .then((res) => res.json())
      .then((data: InfoMenu[]) => {
        console.log("Contenido real de la respuesta:", data); //  Verify that it is an array
        setInfoMenu(data);
      })
      .catch((err) => console.error("Error fetching menu packages:", err));
  }, []);
  return (
    <>
      <div className={styles.MainArea}>
        <div className={styles.Header}>
          <HeaderComponent></HeaderComponent>
        </div>
        <div className={styles.ContainerArea}>
          <NavComponent></NavComponent>
          <div className={styles.ServicesArea}>
            <div className={styles.CarouselArea}>
              <div className={styles.CarouselCards}>
                <CarouselDemo items={infoMenu}></CarouselDemo>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ServicesView;
