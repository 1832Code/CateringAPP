// app/dashboard/calendario/page.jsx
"use client"; // ¡Importante! Esto debe ir al inicio del archivo

import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  es: require("date-fns/locale/es"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarioCatering({ events = [] }) {
  return (
    <div
      style={{ height: "80vh", padding: "20px" }}
      className="dark:bg-gray-900 dark:text-gray-100"
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        messages={{
          today: "Hoy",
          previous: "Anterior",
          next: "Siguiente",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
        }}
      />
    </div>
  );
}
