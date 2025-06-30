import React from "react";

const Informes = () => {
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-4">Generar Reporte</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select className="p-2 border rounded">
            <option>Tipo de Reporte</option>
            <option>Ventas Mensuales</option>
            <option>Pedidos por Servicio</option>
            <option>Clientes Activos</option>
          </select>
          <input type="date" className="p-2 border rounded" />
          <input type="date" className="p-2 border rounded" />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          Exportar a Excel
        </button>
      </div>
    </div>
  );
};

export default Informes;
