import React from "react";
import InformationMainView from "../../components/layouts/InicioComponents/InformationMainView";
import styles from "./MainView.module.css";
import image1 from "@/assets/images/ImageMobileCarousel1.png";
import image2 from "@/assets/images/ImageMobileCarousel2.png";
import image3 from "@/assets/images/ImageMobileCarousel3.png";
import image4 from "@/assets/images/ImageMobileCarousel4.png";
import image5 from "@/assets/images/ImageMobileCarousel5.png";

import imagedesktop1 from "@/assets/images/ImagenMainRecortada.jpg";
import imagedesktop2 from "@/assets/images/nosotros imagen 3.jpg";
import imagedesktop3 from "@/assets/images/ImageCarouselDesktop2.jpg";
import imagedesktop4 from "@/assets/images/ImageCarouselDesktop3.jpg";
import imagedesktop5 from "@/assets/images/nosotros imagen 4.jpg";

import { HeaderComponent } from "@/components/layouts/HeaderComponents/HeaderComponent";
import NavComponent from "@/components/layouts/NavComponents/NavComponent";
import { CarouselComponent } from "@/components/layouts/CarouselComponent/CarouselComponent";
export const MainView = () => {
  return (
    //3 Area for the MainView
    <div className={styles.MainArea}>
      <div className={styles.Header}>
        <HeaderComponent></HeaderComponent>
      </div>
      <div className={styles.CarouselArea}>
        <div className={styles.CarouselMobile}>
          <NavComponent></NavComponent>
          <CarouselComponent
            image1={image1.src}
            image2={image2.src}
            image3={image3.src}
            image4={image4.src}
            image5={image5.src}
          ></CarouselComponent>
        </div>
        <div className={styles.CarouselDesktop}>
          <NavComponent></NavComponent>
          <CarouselComponent
            image1={imagedesktop1.src}
            image2={imagedesktop2.src}
            image3={imagedesktop3.src}
            image4={imagedesktop4.src}
            image5={imagedesktop5.src}
          ></CarouselComponent>
        </div>
      </div>
      <InformationMainView></InformationMainView>
    </div>
  );
};
export default MainView;
