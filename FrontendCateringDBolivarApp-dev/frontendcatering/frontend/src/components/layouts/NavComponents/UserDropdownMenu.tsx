// src/components/features/UserDropdownMenu.tsx
// (Basado en tu comentario, ya tienes un UserDropdownMenu, lo estamos adaptando)
"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Usar next/navigation para App Router
import styles from "./UserDropdownMenu.module.css"; // Crea un CSS module para esto

interface UserDropdownMenuProps {
  onClose: () => void; // Callback para cerrar el dropdown
  userName: string; // Para mostrar en el encabezado del dropdown
}

export const UserDropdownMenu = ({
  onClose,
  userName,
}: UserDropdownMenuProps) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRoles");
    onClose(); // Cierra el dropdown
    router.push("/"); // Redirige a la página de inicio o login
  };

  return (
    <div className={styles.dropdownMenu}>
      <div className={styles.userInfo}>
        <p>¡Hola, {userName}!</p>
      </div>
      <ul>
        <li>
          <Link href="/dashboard/profile" onClick={onClose}>
            {" "}
            {/* Asegúrate de estas rutas */}
            Mi Perfil
          </Link>
        </li>
        <li>
          <Link href="/reservar" onClick={onClose}>
            Reservas
          </Link>
        </li>
        <li>
          <Link href="/dashboard/historial" onClick={onClose}>
            Historial
          </Link>
        </li>
        <li>
          <Link href="/dashboard/pagos" onClick={onClose}>
            Pagos
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" onClick={onClose}>
            Configuración
          </Link>
        </li>
        <li className={styles.logoutButton}>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </li>
      </ul>
    </div>
  );
};

export default UserDropdownMenu; // Exportación por defecto si lo prefieres, o solo el named export
