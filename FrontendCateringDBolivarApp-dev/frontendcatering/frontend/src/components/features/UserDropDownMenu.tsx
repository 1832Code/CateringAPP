"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import ReservarImg from "@/assets/images/ReservaWhite.png";
import HistorialImg from "@/assets/images/HistorialReservaWhite.png";
import UserEditImg from "@/assets/images/UserEditWhite.png";
import imgPerfil from "@/assets/images/PerfilWhite.png";
import { Usuario } from "../Interfaces/Usuario";

interface UserDropdownMenuProps {
  user: Usuario;
}
export const UserDropdownMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  //Cerrar Sesión
  const handleLogout = () => {
    try {
      // Elimina el token JWT
      localStorage.removeItem("token");

      // Redirige al home
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión");
    }
  };

  const goTo = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detectar si el dispositivo es touch
  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  // Cierre por clic fuera en mobile
  useEffect(() => {
    if (!isTouchDevice || !isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTouchDevice, isOpen]);

  // Handlers
  const handleToggle = () => setIsOpen(!isOpen);

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
    }
  };

  return (
    <StyledWrapper
      ref={popupRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="popup">
        <button
          onClick={handleToggle}
          className="burger"
          style={{ visibility: mounted ? "visible" : "hidden" }}
        >
          <img src={imgPerfil.src}></img>
        </button>

        {isOpen && (
          <nav className="popup-window">
            <legend>Opciones</legend>
            <ul>
              <li>
                <button onClick={() => goTo("/reservar")}>
                  <img src={ReservarImg.src} className="icon" alt="Reservar" />
                  <span>Reservar</span>
                </button>
              </li>
              <li>
                <button onClick={() => goTo("/historial")}>
                  <img
                    src={HistorialImg.src}
                    className="icon"
                    alt="Historial"
                  />
                  <span>Historial de Reservas</span>
                </button>
              </li>
              <li>
                <button onClick={() => goTo("/gestionarusuario")}>
                  <img src={UserEditImg.src} className="icon" alt="Usuario" />
                  <span>Gestionar Usuario</span>
                </button>
              </li>
              <li>
                <button onClick={handleLogout}>
                  <img src={UserEditImg.src} className="icon" alt="Usuario" />
                  <span>Cerrar Sesión</span>
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
    position: relative;
  }

  .burger {
    width: 7vh;
    height: 7vh;
    background-color: transparent;
    border: 1px white solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .popup-window {
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
    color: white;
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
`;

export default UserDropdownMenu;
