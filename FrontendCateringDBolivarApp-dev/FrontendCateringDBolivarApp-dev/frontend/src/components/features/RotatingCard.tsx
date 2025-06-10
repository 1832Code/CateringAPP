import { url } from "inspector";
import React from "react";
import styled from "styled-components";

interface RotatingCardProps {
  texto: string;
  intro: string;
  parrafo: string;
  imageBackground: string;
}

const RotatingCard: React.FC<RotatingCardProps> = ({
  texto,
  intro,
  parrafo,
  imageBackground,
}) => {
  return (
    <StyledWrapper>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div
            className="flip-card-front"
            style={{
              backgroundImage: `url(${imageBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // oscurece
              backgroundBlendMode: "darken",
            }}
          >
            <p className="title">{texto}</p>
            <p>{intro}</p>
          </div>
          <div className="flip-card-back">
            <p>{parrafo}</p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 35vh;
    height: 35vh;
  }

  .title {
    font-family: "Italiana", sans-serif;
    font-size: 4vh;
    font-weight: 900;
    text-align: center;
    margin: 0;
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transition-timing-function: cubic-bezier(0.61, 0.98, 0.48, 1.01);
    transform-style: preserve-3d;
  }

  .flip-card:hover .flip-card-inner {
    transform: rotate(180deg) rotateX(180deg);
    cursor: pointer;
  }

  .flip-card-front,
  .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 1rem;
    font-family: "Abel", serif;
  }

  .flip-card-front {
    color: white;
  }

  .flip-card-back {
    background: rgba(219, 216, 216, 0.91);
    color: black;
    transform: rotateY(180deg);
  }

  @media (min-width: 600px) {
    .flip-card {
      width: 40vh;
      height: 40vh;
    }
  }
  @media (min-width: 1024px) {
    .flip-card {
      width: 50vh;
      height: 50vh;
    }
  }
`;

export default RotatingCard;
