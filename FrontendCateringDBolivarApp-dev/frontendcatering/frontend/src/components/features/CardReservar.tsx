import React from "react";
import styled from "styled-components";
import { InfoMenu } from "../Interfaces/InfoMenu";

export interface CardReservarProps {
  item: InfoMenu;
  onSeleccionar: (menu: InfoMenu) => void;
}

const CardReservar: React.FC<CardReservarProps> = ({ item, onSeleccionar }) => {
  const handleClick = () => {
    onSeleccionar(item);
  };

  return (
    <StyledWrapper>
      <div className="card" onClick={handleClick}>
        <div
          className="first-content"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.imageURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "darken",
          }}
        >
          <p className="title">{item.titulo}</p>
          <p className="category">{item.servicio.tipoServicio.nombre}</p>
          <p className="category">{item.cantPersonas} personas</p>
        </div>
        <div className="second-content">
          <div className="scroll-container">
            <div className="subtitle">Descripción del Paquete</div>
            <div className="text">{item.descripcion}</div>
            <div className="subtitle">Detalles de Servicio</div>
            <div className="text">Cuenta con los siguientes items: </div>
            <div className="text">
              {item.servicio.items.map((item, index) => (
                <div key={index}>- {item.item.nombre} </div>
              ))}
            </div>
            <div className="subtitle">Detalles de Personal</div>
            <div className="text">
              {item.personal.personalInfo.map((item, index) => (
                <div key={index}>
                  - {item.tipoPersonal} ({item.cantidad}){" "}
                </div>
              ))}
            </div>
            <div className="subtitle">Detalles Extras</div>
            <div className="text">
              {item.extra.extraInfo.map((item, index) => (
                <div key={index}>
                  - {item.tipoExtra} ({item.cantidad}){" "}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 18vw;
    height: 20vw;
    transition: all 0.4s;
    border-radius: 15px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.4);
  }

  .card:hover {
    border-radius: 15px;
    cursor: pointer;
    transform: scale(1.2);
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.4);
    background: rgb(99, 97, 97);
  }

  .first-content {
    height: 100%;
    width: 100%;
    transition: all 0.4s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 1;
    border-radius: 15px;
  }
  .title {
    
    text-align: center;
    font-family: "Italiana";
    font-size: 3vw;
  }
  .category {
    text-align: center;}
    color: white;
    font-family: "Abel";
    font-size: 1.4vw;
  }

  .card:hover .first-content {
    height: 0px;
    opacity: 0;
  }

  .second-content {
    height: 0%;
    width: 100%;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    border-radius: 15px;
    transition: all 0.4s;
    transform: rotate(90deg) scale(-1);
    padding: 1vw;
  }
  .subtitle {
    font-family: "Abel";
    font-size: 1.4vw;
  }
  .text {
    font-family: "Abel";
    font-size: 1vw;
  }

  .card:hover .second-content {
    opacity: 1;
    height: 100%;
    font-size: 1.8rem;
    transform: rotate(0deg);
  }
  .scroll-container {
    width: 100%;
    height: 100%;
    padding: 1vw;
    overflow-y: auto; /* Scroll solo en este contenedor */

    /* Personalización del scrollbar */
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.1);

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
      border: none;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }
`;

export default CardReservar;
