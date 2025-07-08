"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./NavComponent.module.css";
import logo from "../../../assets/images/Logo Blanco.png";
import { LoginButtom } from "../LoginComponents/LoginButtom";
import Link from "next/link";
import { AreaForm } from "../LoginComponents/AreaForm";
import UserDropdownMobile from "@/components/features/UserDropDownMobile";
import clsx from "clsx";
import UserDropdownMenu from "@/components/features/UserDropDownMenu";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";

const NavComponent = () => {
  const { loadingAuth, email, showLogin, setShowLogin } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Para abrir login desde query param
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("showLogin") === "true") {
      setShowLogin(true);
    }
  }, [searchParams, setShowLogin]);

  // Click fuera del menú móvil
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Scroll efecto
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={clsx(styles.MainArea)}>
        <div className={styles.LayoutNav}></div>
        <div
          className={clsx(styles.NavMainArea, { [styles.Scrolled]: scrolled })}
        >
          <div className={styles.LogoArea}>
            <img className={styles.logo} src={logo.src} alt="Logo" />
          </div>

          <div className={styles.NavAndButtom}>
            {/* Mobile hamburger */}
            <div
              className={styles.Hamburger}
              onClick={() => setIsOpen(!isOpen)}
              ref={buttonRef}
            >
              ☰
            </div>

            {/* Mobile menu */}
            {isOpen && (
              <div className={styles.MobileMenu} ref={menuRef}>
                <Link href="/">Inicio</Link>
                <Link href="/servicios">Servicios</Link>
                <Link href="/explorar">Explorar</Link>
                <Link href="/nosotros">Nosotros</Link>
              </div>
            )}

            {/* Desktop menu */}
            <nav className={styles.NavArea}>
              <ul className={styles.NavRowArea}>
                <li className={styles.NavItem}>
                  <Link href="/">Inicio</Link>
                </li>
                <li className={styles.NavItem}>
                  <Link href="/servicios">Menús</Link>
                </li>
                <li className={styles.NavItem}>
                  <Link href="/explorar">Explorar</Link>
                </li>
                <li className={styles.NavItem}>
                  <Link href="/nosotros">Nosotros</Link>
                </li>
              </ul>
            </nav>

            {/* Login / User menu */}
            <div className={styles.LoginArea}>
              {loadingAuth ? null : email ? (
                <UserDropdownMenu />
              ) : (
                <LoginButtom onClick={() => setShowLogin(true)} />
              )}
            </div>

            {showLogin && <AreaForm onClose={() => setShowLogin(false)} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavComponent;
