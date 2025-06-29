"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./NavComponent.module.css";
import logo from "../../../assets/images/Logo Blanco.png";
import { LoginButtom } from "../LoginComponents/LoginButtom";
import Link from "next/link";
import { AreaForm } from "../LoginComponents/AreaForm";
import UserDropdownMobile from "@/components/features/UserDropDownMobile";
import clsx from "clsx";
import UserDropdownMenu from "@/components/features/UserDropDownMenu";
import { Usuario } from "@/components/Interfaces/Usuario";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";

export const NavComponent = () => {
  const { loadingAuth, token, email, showLogin, setShowLogin } = useAuth();
  {
    /*State to control the show login form */
  }
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // To open the login form (middleware)
  const searchParams = useSearchParams();

  useEffect(() => {
    const shouldShowLogin = searchParams.get("showLogin") === "true";
    if (shouldShowLogin) {
      setShowLogin(true);
    }
  }, [searchParams]);
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

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50); // Puedes ajustar este valor
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
            <img className={styles.logo} src={logo.src} />
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
                <Link href="/">Inicio</Link>
                <Link href="/servicios">Servicios</Link>
                <Link href="/explorar">Explorar</Link>
                <Link href="/nosotros">Nosotros</Link>
              </div>
            )}
            <nav className={styles.NavArea}>
              <ul className={styles.NavRowArea}>
                <li className={styles.NavItem}>
                  <Link href="/">Inicio</Link>
                </li>
                <li className={styles.NavItem}>
                  <Link href="/servicios">Menús</Link>{" "}
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
              {loadingAuth ? null : token ? (
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
