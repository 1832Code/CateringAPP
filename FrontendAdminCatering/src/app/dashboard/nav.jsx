"use client";

import { useState, useEffect } from "react";

// Iconos SVG (puedes reemplazarlos por los que prefieras)
const icons = {
  dashboard: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" fill="currentColor" />
      <rect x="14" y="3" width="7" height="7" fill="currentColor" />
      <rect x="14" y="14" width="7" height="7" fill="currentColor" />
      <rect x="3" y="14" width="7" height="7" fill="currentColor" />
    </svg>
  ),
  ventas: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),
  inbox: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  user: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 20c0-4 4-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  servicios: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  login: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path
        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M10 17l5-5-5-5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  register: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
      <path d="M12 16v6m3-3h-6" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  plus: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  minus: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  logout: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M16 17l5-5-5-5" stroke="currentColor" strokeWidth="2" />
      <path d="M21 12H9" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  menu: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  close: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const SidebarItem = ({
  icon,
  label,
  href = "#",
  active = false,
  className = "",
  onClick,
}) => (
  <a
    href={href}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
      active
        ? "bg-amber-200 text-gray-800 dark:bg-gray-800 dark:text-white"
        : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
    } ${className}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-base font-medium">{label}</span>
  </a>
);

const SidebarCollapse = ({ icon, label, items, isMobile, onClickItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full overflow-auto">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-200 transition-all duration-200 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="text-base font-medium">{label}</span>
        </div>
        {open ? icons.minus : icons.plus}
      </button>

      {open && (
        <div className="mt-1 ml-8 space-y-1">
          {items.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                if (isMobile && onClickItem) {
                  e.preventDefault();
                  onClickItem();
                }
              }}
              className="block py-2 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-150 text-sm dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default function NavSlider() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => isMobile && setIsOpen(false);

  return (
    <>
      {/* Botón de menú para móviles */}
      <button
        onClick={toggleSidebar}
        className="fixed lg:hidden z-50 top-4 left-4 p-2 rounded-md bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white"
      >
        {isOpen ? icons.close : icons.menu}
      </button>

      {/* Overlay para móviles */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-50 dark:bg-gray-900 ${
          isOpen ? "w-64 translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64`}
      >
        <div className="h-full flex flex-col justify-between p-4 overflow-y-auto">
          <div className="space-y-2">
            {/* Logo o título */}
            <div className="p-4 mb-4 text-center">
              <a
                href="/dashboard"
                className="text-xl font-bold text-gray-800 dark:text-white"
              >
                Panel Admin
              </a>
            </div>

            {/* Items del menú */}
            <SidebarItem
              icon={icons.dashboard}
              label="Dashboard"
              href="/dashboard"
              onClick={closeSidebar}
            />
            <SidebarCollapse
              icon={icons.ventas}
              label="Ventas"
              items={[
                { label: "Menus", href: "/dashboard/menus" },
                { label: "Ventas", href: "/ventas/lista" },
                { label: "Reembolsos", href: "/dashboard/ventas/reembolsos" },
                { label: "Envíos", href: "/dashboard/ventas/envios" },
              ]}
              isMobile={isMobile}
              onClickItem={closeSidebar}
            />
            <SidebarItem
              icon={icons.inbox}
              label="Pedidos"
              href="/dashboard/pedidos"
              onClick={closeSidebar}
            />
            <SidebarItem
              icon={icons.user}
              label="Usuarios"
              href="/dashboard/usuarios"
              onClick={closeSidebar}
            />
            <SidebarItem
              icon={icons.servicios}
              label="Servicios"
              href="/dashboard/servicios"
              onClick={closeSidebar}
            />
            <SidebarItem
              icon={icons.login}
              label="Categorias"
              href="/dashboard/categoria"
              onClick={closeSidebar}
            />
            <SidebarItem
              icon={icons.register}
              label="items"
              href="/dashboard/items"
              onClick={closeSidebar}
            />
            <SidebarItem
              icon={icons.register}
              label="Informes"
              href="/dashboard/informes"
              onClick={closeSidebar}
            />
            <SidebarItem
              icon={icons.logout}
              label="Calendario"
              href="/dashboard/calendario"
              onClick={closeSidebar}
            />
          </div>

          {/* Footer del sidebar */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            © {new Date().getFullYear()} JeoCode
          </div>
        </div>
      </nav>

      {/* Espacio para el sidebar en desktop */}
      {!isMobile && <div className="w-64 flex-shrink-0" />}
    </>
  );
}
