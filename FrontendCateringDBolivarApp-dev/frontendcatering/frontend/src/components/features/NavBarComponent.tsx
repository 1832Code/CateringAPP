"use client";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

const NavBarComponent = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <StyledWrapper>
      <div className="nav">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
        {isOpen && (
          <div className="mobile-menu">
            <Link href="/">Inicio</Link>
            <Link href="/servicios">Servicios</Link>
            <Link href="/nosotros">Nosotros</Link>
          </div>
        )}
        <div className="container">
          <div className="btn">
            <Link href="/">Inicio</Link>
          </div>
          <div className="btn">
            <Link href="/servicios">Servicios</Link>
          </div>
          <div className="btn">
            <Link href="/nosotros">Nosotros</Link>
          </div>
          <svg
            className="outline"
            overflow="visible"
            width={400}
            height={60}
            viewBox="0 0 400 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="rect"
              pathLength={100}
              x={0}
              y={0}
              width={400}
              height={60}
              fill="transparent"
              strokeWidth={5}
            />
          </svg>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .outline {
    position: absolute;
    inset: 0;
    pointer-events: none;
    visibility: hidden;
  }

  .rect {
    stroke-dashoffset: 5;
    stroke-dasharray: 0 0 10 40 10 40;
    transition: 0.5s;
    stroke: transparent;
  }

  .nav {
    position: relative;
    width: 10em;
    height: 100%;
    background-color: black;
  }

  .container {
    flex: 1;
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.5em 1em;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .container:hover .outline .rect {
    stroke-dashoffset: 1;
    stroke-dasharray: 0;
    stroke: black;
    transition: 999999s;
  }

  .btn {
    padding: 0.5em 2.3em;
    color: black;
    cursor: pointer;
    transition: 0.1s;
  }

  .btn:hover {
    background: #fff3;
  }

  /* Hover effects por botón */
  .btn:nth-child(1):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 3 8 71.5 8 10.7;
    stroke: black;
  }

  .btn:nth-child(2):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 15.5 9 44.5 9 20;
    stroke: black;
  }

  .btn:nth-child(3):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 30.4 9 14.6 9 30;
    stroke: black;
  }

  .btn:hover ~ .outline .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 0 10 40 10 40;
    transition: 0.5s !important;
    stroke: black;
  }
  .hamburger {
    display: none;
    justify-content: center;
    text-align: center;
    width: 2em;
    heigth: 1em;
    font-size: 1.7rem;
    cursor: pointer;
    color: black;
    z-index: 1000;
    border: 1px solid black;
    border-radius: 0.3em;
  }

  .mobile-menu {
    display: none;
  }

  @media (max-width: 630px) {
    .container {
      display: none;
    }
    .nav {
      display: flex;
      width: 100%;
      align-items: center;
    }
    .hamburger {
      display: flex;
      font-size: 2rem;
    }

    .mobile-menu {
      display: flex;
      flex-direction: column;
      background-color: white;
      position: fixed;
      top: 6em;
      left: 0;
      width: 100vw;
      padding: 1em;
      gap: 1em;
      z-index: 999;
    }

    .mobile-menu a {
      font-size: 1.5rem;
      color: black;
      text-decoration: none;
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.5em;
    }
  }
  @media (min-width: 631px) and (max-width: 991px) {
    .container {
      display: none;
    }
    .nav {
      display: flex;
      width: 100%;
      align-items: center;
    }
    .hamburger {
      display: flex;
      font-size: 2rem;
    }

    .mobile-menu {
      display: flex;
      flex-direction: column;
      background-color: white;
      position: fixed;
      top: 6em;
      left: 0;
      width: 100vw;
      padding: 1em;
      gap: 1em;
      z-index: 999;
    }

    .mobile-menu a {
      font-size: 1.5rem;
      color: black;
      text-decoration: none;
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.5em;
    }
  }
`;

export default NavBarComponent;
