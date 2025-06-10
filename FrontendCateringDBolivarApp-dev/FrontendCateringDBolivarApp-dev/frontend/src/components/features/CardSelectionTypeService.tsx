import React from "react";
import styled from "styled-components";
import { TipoServicio } from "../Interfaces/TipoServicio";
import { InfoMenu } from "../Interfaces/InfoMenu";

interface CardSelectionTypeServiceProps {
  tipoServicio: TipoServicio;
  onSeleccionar: (tipoServicio: InfoMenu["servicio"]["tipoServicio"]) => void;
}

const CardSelectionTypeService = ({
  tipoServicio,
  onSeleccionar,
}: CardSelectionTypeServiceProps) => {
  const handleTipoServicio = () => {
    onSeleccionar(tipoServicio);
    console.log(tipoServicio);
  };
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-details">
          <p className="text-title">{tipoServicio.nombre}</p>
          <p className="text-body">{tipoServicio.descripcion}</p>
        </div>
        <button className="card-button" onClick={handleTipoServicio}>
          Seleccionar
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: auto;
    height: auto;
    border-radius: 20px;
    background: #f5f5f5;
    position: relative;
    padding: 1.8rem;
    border: 2px solid #c3c6ce;
    transition: 0.5s ease-out;
    overflow: visible;
  }

  .card-details {
    color: black;
    height: 100%;
    gap: 0.5em;
    display: grid;
    place-content: center;
  }

  .card-button {
    transform: translate(-50%, 125%);
    width: 60%;
    border-radius: 1rem;
    border: none;
    background-color: #fd8a26;
    color: #fff;
    font-size: 2vh;
    padding: 0.5rem 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    opacity: 0;
    transition: 0.3s ease-out;
    cursor: pointer;
  }

  .text-body {
    color: rgb(134, 134, 134);
    font-family: "Abel";
    font-size: 2vh;
    text-align: justify;
    white-space: normal;
    word-break: break-word;
  }

  /*Text*/
  .text-title {
    font-family: "Italiana";
    font-size: 2em;
    font-weight: bold;
  }

  /*Hover*/
  .card:hover {
    border-color: #fd8a26;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }

  .card:hover .card-button {
    transform: translate(-50%, 50%);
    opacity: 1;
  }

  @media (min-width: 1024px) {
    .card {
    }
  }
`;

export default CardSelectionTypeService;
