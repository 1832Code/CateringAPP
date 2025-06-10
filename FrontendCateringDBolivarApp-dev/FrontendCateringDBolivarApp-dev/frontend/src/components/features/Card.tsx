import React from "react";
import styled from "styled-components";
import { InfoMenu } from "../Interfaces/InfoMenu";

const Card = ({ menu }: { menu: InfoMenu }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <img className="img" src={menu.imageURL}></img>
        <div className="textBox">
          <p className="text head">{menu.titulo}</p>
          <span>{menu.descripcion}</span>
          <p className="text price">S/. {menu.precio}</p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 195px;
    height: 285px;
    background: #313131;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    transition: 0.2s ease-in-out;
    overflow: hidden;
    position: relative;
  }

  .img {
    width: 100%;
    height: 100%;
    position: absolute;
    transition: 0.2s ease-in-out;
    z-index: 1;
    object-fit: cover;
  }

  .textBox {
    opacity: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    transition: 0.2s ease-in-out;
    z-index: 2;
    margin: 1em;
  }

  .textBox > .text {
    font-weight: bold;
    text-align: center;
    color: white;
  }

  .textBox > .head {
    font-size: 3vw;
    font-family: "Abel";
  }

  .textBox > .price {
    font-size: 1.4vw;
  }

  .textBox > span {
    font-size: 1.1vw;
    font-family: "Abel";
    white-space: normal;

    text-align: center;
    color: white;
  }

  .card:hover > .textBox {
    opacity: 1;
  }

  .card:hover > .img {
    height: 150%;
    filter: blur(5px);
    animation: anim 3s infinite;
  }

  @keyframes anim {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-20px);
    }

    100% {
      transform: translateY(0);
    }
  }

  .card:hover {
    transform: scale(1.04) rotate(-1deg);
  }
`;

export default Card;
