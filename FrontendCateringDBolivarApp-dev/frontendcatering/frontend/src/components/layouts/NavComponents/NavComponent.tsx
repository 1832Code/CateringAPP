// src/components/layouts/NavComponent/NavComponent.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./NavComponent.module.css";
import logo from "../../../assets/images/Logo Blanco.png";
import { LoginButtom } from "../LoginComponents/LoginButtom";
import Link from "next/link";
import { UserButton } from "../LoginComponents/UserButton"; // Asegúrate de que esta importación esté correcta
import { AreaForm } from "../LoginComponents/AreaForm"; // Para el formulario de login modal
import { UserDropdownMenu } from "./UserDropdownMenu"; // Importar el nuevo componente de dropdown
import { useRouter } from "next/navigation"; // Usar next/navigation para App Router
import clsx from "clsx";

// Removidas las props no utilizadas en NavComponent directamente
// interface NavComponentProps {
//   isCardExpanded: boolean;
//   onCardToggle: () => void;
// }

export const NavComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Para el menú móvil/hamburguesa
  const [scrolled, setScrolled] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Nuevo estado para la autenticación
  const [loggedInUserName, setLoggedInUserName] = useState("Usuario"); // Nuevo estado para el nombre del usuario
  const [showUserDropdown, setShowUserDropdown] = useState(false); // Nuevo estado para el dropdown del usuario

  const menuRef = useRef<HTMLDivElement>(null); // Ref para el menú móvil
  const buttonRef = useRef<HTMLDivElement>(null); // Ref para el botón de hamburguesa
  const userButtonRef = useRef<HTMLButtonElement>(null); // Ref para el UserButton para detectar clics fuera
  const userDropdownRef = useRef<HTMLDivElement>(null); // Ref para el UserDropdownMenu

  const router = useRouter(); // Inicializar el router

  // Efecto para cerrar el menú móvil/dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Lógica para el menú móvil
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }

      // Lógica para el dropdown del usuario
      if (
        showUserDropdown &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, showUserDropdown]); // Dependencias para re-ejecutar el efecto

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto para comprobar el estado de autenticación al cargar y al cambiar de ruta
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("jwtToken");
      const email = localStorage.getItem("userEmail"); // Asumimos que guardaste el email
      if (token && email) {
        setIsUserLoggedIn(true);
        // Puedes usar el email o un nombre de usuario más amigable si lo guardaste
        setLoggedInUserName(email.split("@")[0]); // Ejemplo: usa la parte antes del @
      } else {
        setIsUserLoggedIn(false);
        setLoggedInUserName("Usuario");
      }
    };

    checkLoginStatus(); // Ejecutar al montar el componente

    // Escuchar cambios en localStorage (ej. cuando el loginForm guarda el token)
    window.addEventListener("storage", checkLoginStatus);

    // Limpiar el event listener al desmontar
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []); // Se ejecuta una vez al montar, y luego los listeners se encargan

  const handleToggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown);
  };

  const handleCloseLoginModal = () => {
    setShowLogin(false);
    // Vuelve a verificar el estado de login después de cerrar el modal de login
    // Esto es útil si el usuario inició sesión desde el modal
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsUserLoggedIn(true);
      setLoggedInUserName(
        localStorage.getItem("userEmail")?.split("@")[0] || "Usuario"
      );
    }
  };

  return (
    <>
      <div className={clsx(styles.MainArea)}>
        <div className={styles.LayoutNav}></div>
        <div
          className={clsx(styles.NavMainArea, { [styles.Scrolled]: scrolled })}
        >
          <div className={styles.LogoArea}>
            <Link href="/">
              {" "}
              {/* Haz el logo clicable a la página de inicio */}
              <img className={styles.logo} src={logo.src} alt="Logo" />
            </Link>
          </div>

          <div className={styles.NavAndButtom}>
            <div
              className={styles.Hamburger}
              onClick={() => setIsOpen(!isOpen)}
              ref={buttonRef}
            >
              ☰
            </div>
            {isOpen && (
              <div className={styles.MobileMenu} ref={menuRef}>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  Inicio
                </Link>
                <Link href="/servicios" onClick={() => setIsOpen(false)}>
                  Servicios
                </Link>
                <Link href="/explorar" onClick={() => setIsOpen(false)}>
                  Explorar
                </Link>
                <Link href="/nosotros" onClick={() => setIsOpen(false)}>
                  Nosotros
                </Link>
                {isUserLoggedIn ? (
                  // Mostrar opciones del usuario en móvil si está logueado
                  <>
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsOpen(false)}
                    >
                      Mi Perfil
                    </Link>
                    <Link
                      href="/dashboard/historial"
                      onClick={() => setIsOpen(false)}
                    >
                      Historial
                    </Link>
                    <Link
                      href="/dashboard/pagos"
                      onClick={() => setIsOpen(false)}
                    >
                      Pagos
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsOpen(false)}
                    >
                      Configuración
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem("jwtToken");
                        localStorage.removeItem("userEmail");
                        localStorage.removeItem("userId");
                        localStorage.removeItem("userRoles");
                        setIsUserLoggedIn(false);
                        setIsOpen(false); // Cierra el menú móvil
                        router.push("/"); // Redirige a inicio
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setIsOpen(false);
                    }}
                  >
                    Iniciar Sesión
                  </button>
                )}
              </div>
            )}
            <nav className={styles.NavArea}>
              <ul className={styles.NavRowArea}>
                <li className={styles.NavItem}>
                  <Link href="/">Inicio</Link>
                </li>
                <li className={styles.NavItem}>
                  <Link href="/servicios">Servicios</Link>{" "}
                </li>
                <li className={styles.NavItem}>
                  <Link href="/explorar">Explorar</Link>{" "}
                </li>
                <li className={styles.NavItem}>
                  <Link href="/nosotros">Nosotros</Link>{" "}
                </li>
              </ul>
            </nav>

            <div className={styles.LoginArea}>
              {isUserLoggedIn ? (
                <div style={{ position: "relative" }}>
                  {" "}
                  {/* Contenedor para posicionar el dropdown */}
                  <UserButton
                    userName={loggedInUserName}
                    onClick={handleToggleUserDropdown}
                    ref={userButtonRef} // Asignar la ref al UserButton
                  />
                  {showUserDropdown && (
                    <UserDropdownMenu
                      userName={loggedInUserName}
                      onClose={() => setShowUserDropdown(false)}
                      ref={userDropdownRef} // Asignar la ref al UserDropdownMenu
                    />
                  )}
                </div>
              ) : (
                <LoginButtom onClick={() => setShowLogin(true)} />
              )}
            </div>
          </div>
        </div>
        {showLogin && <AreaForm onClose={handleCloseLoginModal} />}{" "}
        {/* Pasa la nueva función de cierre */}
      </div>
    </>
  );
};

export default NavComponent;
