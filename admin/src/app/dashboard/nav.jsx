"use client";

import { useState } from "react";

// Puedes reemplazar estos SVGs por los que prefieras
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
};

const SidebarItem = ({
  icon,
  label,
  href = "#",
  active = false,
  className = "",
}) => (
  <a
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
      active
        ? "bg-gray-800 text-gray-700 hover:bg-amber-200 dark:text-white"
        : "text-gray-900 hover:bg-gray-700 hover:text-gray-200 dark:text-white"
    } ${className}`}
  >
    <span className="text-xl">{icon}</span>
    <span className="text-base font-medium">{label}</span>
  </a>
);

const SidebarCollapse = ({ icon, label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-gray-50 overflow-auto dark:bg-gray-900">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-md text-gray-900 hover:bg-gray-700 hover:text-white transition-all duration-200 dark:text-white"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="text-base font-medium">{label}</span>
        </div>
        {open ? icons.minus : icons.plus}
      </button>

      {open && (
        <div className="mt-2 space-y-1">
          {items.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="block text-gray-400 hover:text-white hover:bg-gray-800 rounded-2xl transition duration-150 text-sm p-2 text-center dark:text-gray-300"
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
  return (
    <nav className="w-64 h-full bg-gray-50 p-4 flex flex-col justify-between fixed dark:bg-gray-900">
      <div className="w-full h-auto flex flex-col justify-between bg-gray-100 gap-4 text-left pl-2 p-4 text-gray-900 dark:text-white dark:bg-gray-900">
        <SidebarItem
          icon={icons.dashboard}
          label="Dashboard"
          href="/dashboard"
        />
        <SidebarCollapse
          icon={icons.ventas}
          label="Ventas"
          items={[
            { label: "Productos", href: "/auth/login" },
            { label: "Ventas", href: "/auth/search" },
            { label: "Reembolsos", href: "/auth/register" },
            { label: "Envíos", href: "#" },
          ]}
        />
        <SidebarItem
          icon={icons.inbox}
          label="Pedidos"
          href="/dashboard/pedidos"
        />
        <SidebarItem
          icon={icons.user}
          label="Usuarios"
          href="/dashboard/usuarios"
        />
        <SidebarItem
          icon={icons.servicios}
          label="Servicios"
          href="/dashboard/servicios"
        />
        <SidebarItem
          icon={icons.login}
          label="clientes"
          href="/dashboard/cliente"
        />
        <SidebarItem
          icon={icons.register}
          label="Reservas"
          href="/dashboard/reserva"
        />
        <SidebarItem
          icon={icons.register}
          label="Informes/Analisis"
          href="/dashboard/informes"
        />
        <SidebarItem
          icon={icons.logout}
          label="Calendario"
          href="/dashboard/calendario"
        />
      </div>
      <div className="text-center dark:text-white">
        © {new Date().getFullYear()} JeoCode
      </div>
    </nav>
  );
}
