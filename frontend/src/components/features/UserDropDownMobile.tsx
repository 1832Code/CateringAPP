"use client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import ReservarImg from "@/assets/images/ReservaWhite.png";
import HistorialImg from "@/assets/images/HistorialReservaWhite.png";
import UserEditImg from "@/assets/images/UserEditWhite.png";
const UserDropdownMobile = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const goToReservar = () => router.push("/reservar");
  const goToHistorial = () => router.push("/historial");
  const goToUsuarioInfo = () => router.push("/gestionarusuario");

  // Detectar clic fuera del menú para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <StyledWrapper ref={popupRef}>
      <div className="popup">
        <button onClick={() => setIsOpen(!isOpen)} className="burger">
          <svg
            viewBox="0 0 24 24"
            fill="white"
            style={{ width: 27, height: 27 }}
          >
            <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" />
          </svg>
        </button>

        {isOpen && (
          <nav className="popup-window">
            <legend>Opciones</legend>
            <ul>
              <li>
                <button onClick={goToReservar}>
                  <img className="icon" src={ReservarImg.src} alt="Reservar" />
                  <span>Reservar</span>
                </button>
              </li>
              <li>
                <button onClick={goToHistorial}>
                  <img
                    className="icon"
                    src={HistorialImg.src}
                    alt="Historial"
                  />
                  <span>Historial de Reservas</span>
                </button>
              </li>
              <li>
                <button onClick={goToUsuarioInfo}>
                  <img className="icon" src={UserEditImg.src} alt="Usuario" />
                  <span>Gestionar Usuario</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .popup {
    --burger-line-width: 1.125em;
    --burger-line-height: 0.125em;
    --burger-offset: 0.625em;
    --burger-bg: #120808;
    --burger-color: #333;
    --burger-line-border-radius: 0.1875em;
    --burger-diameter: 3.125em;
    --burger-btn-border-radius: calc(var(--burger-diameter) / 2);
    --burger-line-transition: 0.3s;
    --burger-transition: all 0.5s ease-in-out;
    --burger-hover-scale: 1.1;
    --burger-active-scale: 0.95;
    --burger-enable-outline-color: var(--burger-bg);
    --burger-enable-outline-width: 0.125em;
    --burger-enable-outline-offset: var(--burger-enable-outline-width);
    /* nav */
    --nav-padding-x: 0.25em;
    --nav-padding-y: 0.625em;
    --nav-border-radius: 0.375em;
    --nav-border-color: #ccc;
    --nav-border-width: 0.0625em;
    --nav-shadow-color: rgba(0, 0, 0, 0.2);
    --nav-shadow-width: 0 1px 5px;
    --nav-bg: #C7BCAE;
    --nav-font-family: "Poppins", sans-serif;
    --nav-default-scale: 0.8;
    --nav-active-scale: 1;
    --nav-position-left: -10em;
    --nav-position-right: unset;
    /* if you want to change sides just switch one property */
    /* from properties to "unset" and the other to 0 */
    /* title */
    --nav-title-size: 0.625em;
    --nav-title-color: #777;
    --nav-title-padding-x: 1rem;
    --nav-title-padding-y: 0.25em;
    /* nav button */
    --nav-button-padding-x: 1rem;
    --nav-button-padding-y: 0.375em;
    --nav-button-border-radius: 0.375em;
    --nav-button-font-size: 17px;
    --nav-button-hover-bg: #9b9393;
    --nav-button-hover-text-color: #fff;
    --nav-button-distance: 0.875em;
    /* underline */
    --underline-border-width: 0.0625em;
    --underline-border-color: #ccc;
    --underline-margin-y: 0.3125em;
  }

  .popup {
    position: relative;
  }

  .burger {
    width: 7vh;
    height: 7vh;
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px white solid;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .popup-window {
    transform: scale(var(--nav-default-scale));
    position: fixed;
    top: 6.9vh;
    right: 0;
    background-color: rgba(26, 26, 26, 0.78); 
    padding: 1rem;
    z-index: 100;
    width: 100vw;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 14vh;
  }

  .popup-window legend {
    font-size: 1rem;
    color: #777;
    margin-bottom: 0.5rem;
  }

  .popup-window ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
  }

  .popup-window li {
    margin-bottom: 0.75rem;
    color:white;
    font-family: "Italiana", sans-serif;
    
  }

  .popup-window button {
    width: 100%;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 2.4vh;
    
    cursor: pointer;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    transition: background 0.3s;
  }

  .popup-window button:hover {
    background-color: #9b9393;
    color: white;
  }

  .icon {
    width: 4vh;
    height: 4vh;
    object-fit: contain;
  }
  @media (min-width: 220px) {
    .burger{
      width:7vh;
      height:7vh;
      
    }
    
  @media (min-width:600px) {
    
    .popup-window button {
      font-size: 1.1rem;
    }

    .popup-window legend {
      font-size: 0.9rem;
    }
  }
  @media(min-width:1024px){
    .popup{
        display:none;
        display: inline-block;
        text-rendering: optimizeLegibility;
    }
    .popup input {
      display: none;
    }
  }
  

`;

export default UserDropdownMobile;
