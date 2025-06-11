import React from "react";
import styled from "styled-components";

interface ButtonPreviousProps {
  texto: string;
  customStyles?: React.CSSProperties;
  onClick?: () => void;
}
const ButtonPrevious: React.FC<ButtonPreviousProps> = ({
  onClick,
  texto,
  customStyles,
}) => {
  return (
    <StyledWrapper>
      <button className="animated-button" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="arr-2"
          viewBox="0 0 24 24"
        >
          <path d="M7.8284 13.0001L13.1924 18.3641L11.7782 19.7783L4 12.0001L11.7782 4.22205L13.1924 5.63627L7.8284 11.0001H20V13.0001H7.8284Z" />
        </svg>
        <span style={customStyles} className="text">
          {texto}
        </span>
        <span className="circle" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="arr-1"
          viewBox="0 0 24 24"
        >
          <path d="M7.8284 13.0001L13.1924 18.3641L11.7782 19.7783L4 12.0001L11.7782 4.22205L13.1924 5.63627L7.8284 11.0001H20V13.0001H7.8284Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 30px;
    border: 1px solid;
    border-color: transparent;
    font-size: 2vh;
    background-color: inherit;
    border-radius: 100px;
    font-weight: 600;
    color: #1e1e1e;
    box-shadow: 0 0 0 1px #1e1e1e;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button svg {
    position: absolute;
    width: 24px;
    fill: #1e1e1e;
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .arr-1 {
    left: 16px;
  }

  .animated-button .arr-2 {
    right: -25%;
  }

  .animated-button .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 20px;
    background-color: #fd8a26;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button .text {
    position: relative;
    z-index: 1;
    transform: translateX(12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button:hover {
    box-shadow: 0 0 0 12px transparent;
    color: #1e1e1e;
    border-radius: 12px;
  }

  .animated-button:hover .arr-1 {
    left: -25%;
  }

  .animated-button:hover .arr-2 {
    right: 16px;
  }

  .animated-button:hover .text {
    transform: translateX(-12px);
  }

  .animated-button:hover svg {
    fill: #1e1e1e;
  }

  .animated-button:active {
    scale: 0.95;
    box-shadow: 0 0 0 4px #fd8a26;
  }

  .animated-button:hover .circle {
    width: 220px;
    height: 220px;
    opacity: 1;
  }
`;

export default ButtonPrevious;
