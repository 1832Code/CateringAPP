import React from "react";
import NavComponent from "../../components/layouts/NavComponents/NavComponent";
import "./NosotrosView.css";
import imgNosotros from "../../assets/images/nosotros imagen 5.jpg";
import imgMision from "../../assets/images/nosotros imagen 3.jpg";
import imgVision from "../../assets/images/nosotros imagen 4.jpg";
import NosotrosArea from "../../components/layouts/NosotrosComponents/NosotrosArea";
import { HeaderComponent } from "@/components/layouts/HeaderComponents/HeaderComponent";

export const NosotrosView = () => {
  return (
    <div className="page-container">
      <div className="header">
        <HeaderComponent></HeaderComponent>
      </div>
      <div className="container-area">
        <NavComponent></NavComponent>
        <div className="area-information">
          {/*Component NosotrosArea */}
          <NosotrosArea
            title="¿QUIÉNES SOMOS?"
            text="Somos una empresa comprometida con la excelencia y la innovación tecnológica en servicios alimentarios."
            image={imgNosotros.src}
          ></NosotrosArea>
          <NosotrosArea
            reverse={true}
            title="MISIÓN"
            text="Deleitar paladares y crear momentos inolvidables a través de experiencias gastronómicas excepcionales, utilizando ingredientes de calidad y un servicio personalizado que supere las expectativas de nuestros clientes en cada evento."
            image={imgMision.src}
          ></NosotrosArea>
          <NosotrosArea
            title="VISIÓN"
            text="Ser reconocidos como el referente gastronómico preferido en servicios de catering, distinguiéndonos por nuestra innovación culinaria, excelencia operativa y capacidad para transformar cualquier celebración en una experiencia extraordinaria y memorable."
            image={imgVision.src}
          ></NosotrosArea>
        </div>
      </div>
    </div>
  );
};
export default NosotrosView;
