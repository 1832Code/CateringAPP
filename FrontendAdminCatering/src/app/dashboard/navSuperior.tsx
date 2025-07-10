"use client";

import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
} from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authcontext";
import { useTheme } from "@/context/ThemeContext";

type AdminData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

export default function NavSuperior() {
  const { email, roles, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsMobile] = useState(false);
  const router = useRouter();

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Crear datos del admin desde el contexto de autenticación
  useEffect(() => {
    if (email) {
      console.log("NavSuperior: Creando admin data con email:", email);
<<<<<<< HEAD

      // Extraer nombre y apellido del email
      const emailParts = email.split("@")[0];
      const nameParts = emailParts.split(".");
      const firstName = nameParts[0] || "Admin";
      const lastName = nameParts[1] || "User";

=======
      
      // Extraer nombre y apellido del email
      const emailParts = email.split('@')[0];
      const nameParts = emailParts.split('.');
      const firstName = nameParts[0] || 'Admin';
      const lastName = nameParts[1] || 'User';
      
>>>>>>> origin/auth
      const adminData: AdminData = {
        id: 0, // No tenemos ID del contexto
        email: email,
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        roles: roles || [],
      };
<<<<<<< HEAD

=======
      
>>>>>>> origin/auth
      console.log("NavSuperior: Admin data creada:", adminData);
      setAdmin(adminData);
      setIsLoading(false);
    } else {
      setAdmin(null);
      setIsLoading(false);
    }
  }, [email, roles]);

  const handleLogout = async () => {
    try {
      await logout();
      setAdmin(null);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error en logout:", error);
      // Forzar logout local si falla la petición
      setAdmin(null);
      router.push("/auth/login");
    }
  };

  // Generar iniciales para el avatar
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Generar color de fondo para el avatar
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-500",
<<<<<<< HEAD
      "bg-gray-800",
=======
      "bg-gray-800", 
>>>>>>> origin/auth
      "bg-gray-100",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-yellow-500",
<<<<<<< HEAD
      "bg-teal-500",
=======
      "bg-teal-500"
>>>>>>> origin/auth
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Navbar
      fluid
<<<<<<< HEAD
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:px-6 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between">
=======
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:px-6 shadow-sm  w-full"
    >
      <div className="flex flex-wrap items-center justify-between w-full">
>>>>>>> origin/auth
        {/* Logo y marca */}
        <NavbarBrand
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/logo.svg"
            className="h-8 sm:h-10"
            alt="Catering Gourmet Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Catering Gourmet
          </span>
        </NavbarBrand>

        {/* Menú para desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
<<<<<<< HEAD
            aria-label={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
=======
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
>>>>>>> origin/auth
          >
            {theme === "dark" ? (
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {!isLoading && admin && (
            <div className="flex items-center space-x-4">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                    <Avatar
                      alt={`${admin.firstName} ${admin.lastName}`}
                      img=""
                      rounded
<<<<<<< HEAD
                      className={` dark:border-gray-600 ${admin.firstName}`}
                    ></Avatar>
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:inline">
                      {admin.firstName}
                    </span>
                    <svg
                      className="w-4 h-4 ml-1 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
=======
                      className={` dark:border-gray-600 ${(admin.firstName)}`}
                    >
                      
                    </Avatar>
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:inline">
                      {admin.firstName} 
                    </span>
                    <svg className="w-4 h-4 ml-1 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
>>>>>>> origin/auth
                    </svg>
                  </div>
                }
                className="z-50 dark:bg-gray-800"
              >
                <DropdownHeader className="dark:bg-gray-700">
                  <div className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <Avatar
                        alt={`${admin.firstName}`}
                        img=""
                        rounded
                        className={`${getAvatarColor(admin.firstName)}`}
<<<<<<< HEAD
                      ></Avatar>
                      <div>
                        <span className="block text-sm font-medium text-gray-900 dark:text-white">
                          {admin.firstName}
=======
                      >
                        
                      </Avatar>
                      <div>
                        <span className="block text-sm font-medium text-gray-900 dark:text-white">
                          {admin.firstName} 
>>>>>>> origin/auth
                        </span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                          {admin.email}
                        </span>
                        <span className="block text-xs text-blue-600 dark:text-blue-400 mt-1">
                          Administrador
                        </span>
                      </div>
                    </div>
                  </div>
                </DropdownHeader>
                <DropdownItem
                  as={Link}
                  href="/dashboard/setting"
                  className="dark:hover:bg-gray-700 dark:text-gray-300 flex items-center"
                >
<<<<<<< HEAD
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
=======
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
>>>>>>> origin/auth
                  </svg>
                  Configuración
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  href="/dashboard/perfil"
                  className="dark:hover:bg-gray-700 dark:text-gray-300 flex items-center"
                >
<<<<<<< HEAD
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
=======
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
>>>>>>> origin/auth
                  </svg>
                  Perfil
                </DropdownItem>
                <DropdownDivider className="dark:border-gray-700" />
                <DropdownItem
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-gray-700 flex items-center"
                >
<<<<<<< HEAD
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clipRule="evenodd"
                    />
=======
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
>>>>>>> origin/auth
                  </svg>
                  Cerrar Sesión
                </DropdownItem>
              </Dropdown>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Botón de menú para móvil */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
<<<<<<< HEAD
            aria-label={
              theme === "dark"
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
=======
            aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
>>>>>>> origin/auth
          >
            {theme === "dark" ? (
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <NavbarToggle
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          />
        </div>

        {/* Menú colapsable para móvil */}
        <NavbarCollapse
          className={`md:hidden w-full mt-2 ${isOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            {!isLoading && admin && (
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center mb-4">
                  <Avatar
                    alt={`${admin.firstName} ${admin.lastName}`}
                    img=""
                    rounded
                    size="lg"
<<<<<<< HEAD
                    className={`border-2 border-gray-300 dark:border-gray-600 mb-2 ${getAvatarColor(
                      admin.firstName
                    )}`}
=======
                    className={`border-2 border-gray-300 dark:border-gray-600 mb-2 ${getAvatarColor(admin.firstName)}`}
>>>>>>> origin/auth
                  >
                    <div className="text-white font-semibold text-lg">
                      {getInitials(admin.firstName, admin.lastName)}
                    </div>
                  </Avatar>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {admin.firstName} {admin.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {admin.email}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      Administrador
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <Link
                    href="/dashboard/setting"
                    className="flex items-center w-full py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
<<<<<<< HEAD
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      />
=======
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
>>>>>>> origin/auth
                    </svg>
                    Configuración
                  </Link>
                  <Link
                    href="/dashboard/perfil"
                    className="flex items-center w-full py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
<<<<<<< HEAD
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
=======
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
>>>>>>> origin/auth
                    </svg>
                    Perfil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-red-600 dark:text-red-400"
                  >
<<<<<<< HEAD
                    <svg
                      className="w-4 h-4 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                        clipRule="evenodd"
                      />
=======
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
>>>>>>> origin/auth
                    </svg>
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center w-full">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mb-4"></div>
                <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                <div className="w-48 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            )}
          </div>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
}
