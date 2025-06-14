"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./NavComponent.module.css";
import logo from "../../../assets/images/Logo Blanco.png";




import { UserButton } from "../LoginComponents/UserButton";

import UserDropdown from "@/components/features/UserDropdown";
import NavBarComponent from "@/components/features/NavBarComponent";
import { useRouter } from "next/router";

import { LoginButtom } from "../LoginComponents/LoginButtom";
import Link from "next/link";
import { AreaForm } from "../LoginComponents/AreaForm";

import UserDropdownMobile from "@/components/features/UserDropDownMobile";
import clsx from "clsx";
import UserDropdownMenu from "@/components/features/UserDropDownMenu";

interface NavComponentProps {
  isCardExpanded: boolean;
  onCardToggle: () => void;
}
export const NavComponent = () => {
  {
    /*State to control the show login form */
  }
  const [showLogin, setShowLogin] = useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
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
              {/*<LoginButtom onClick={() => setShowLogin(true)} />*/}
              <UserDropdownMenu></UserDropdownMenu>
            </div>
          </div>
        </div>
        {showLogin && <AreaForm onClose={() => setShowLogin(false)} />}
      </div>
    </>
  );
};
export default NavComponent;
