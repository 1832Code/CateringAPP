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

type AdminData = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

export default function NavSuperior() {
  const [admin, setAdmin] = useState<AdminData | null>(null);
  const [dark, setDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  // Alternar modo oscuro
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Cargar tema preferido
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDark(true);
    }
  }, []);

  // Obtener detalles del administrador
  useEffect(() => {
    const fetchAdminDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAdmin(null);
        return;
      }

      try {
        const res = await fetch("http://localhost:8084/api/auth/me-admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (res.ok) {
          const data: AdminData = await res.json();
          setAdmin(data);
        } else if (res.status === 401 || res.status === 403) {
          handleLogout();
        } else {
          setAdmin(null);
          console.error(
            "Error al obtener el admin:",
            res.status,
            await res.text()
          );
        }
      } catch (error) {
        console.error("Error de red:", error);
        setAdmin(null);
      }
    };

    fetchAdminDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRoles");
    setAdmin(null);
    router.push("/auth/login");
  };

  const toggleTheme = () => {
    setDark(!dark);
  };

  return (
    <Navbar
      fluid
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6"
    >
      <div className="flex flex-wrap items-center justify-between w-full max-w-7xl mx-auto">
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
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {dark ? (
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

          {admin && (
            <div className="flex items-center space-x-4">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="flex items-center">
                    <Avatar
                      alt={`${admin.firstName} ${admin.lastName}`}
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      rounded
                      className="border-2 border-gray-300 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300 hidden lg:inline">
                      {admin.firstName} {admin.lastName}
                    </span>
                  </div>
                }
                className="z-50 dark:bg-gray-800"
              >
                <DropdownHeader className="dark:bg-gray-700">
                  <div className="px-4 py-3">
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">
                      {admin.firstName} {admin.lastName}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {admin.email}
                    </span>
                  </div>
                </DropdownHeader>
                <DropdownItem
                  as={Link}
                  href="/dashboard/setting"
                  className="dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  Configuración
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  href="/dashboard/perfil"
                  className="dark:hover:bg-gray-700 dark:text-gray-300"
                >
                  Perfil
                </DropdownItem>
                <DropdownDivider className="dark:border-gray-700" />
                <DropdownItem
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-gray-700"
                >
                  Cerrar Sesión
                </DropdownItem>
              </Dropdown>
            </div>
          )}
        </div>

        {/* Botón de menú para móvil */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          >
            {dark ? (
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
            {admin && (
              <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center mb-4">
                  <Avatar
                    alt={`${admin.firstName} ${admin.lastName}`}
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                    size="lg"
                    className="border-2 border-gray-300 dark:border-gray-600 mb-2"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {admin.firstName} {admin.lastName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {admin.email}
                    </p>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <Link
                    href="/dashboard/setting"
                    className="block w-full py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Configuración
                  </Link>
                  <Link
                    href="/dashboard/perfil"
                    className="block w-full py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full py-2 px-4 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-red-600 dark:text-red-400"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
}
