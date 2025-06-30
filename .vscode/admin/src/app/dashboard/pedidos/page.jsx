import React from "react";

const Pedidos = () => {
  const recentOrders = [
    {
      id: 1,
      client: "Juan Perez",
      service: "Limpieza",
      date: "2022-01-01",
      status: "Completado",
    },
    {
      id: 2,
      client: "Juan Perez",
      service: "Limpieza",
      date: "2022-01-02",
      status: "Pendiente",
    },
    {
      id: 3,
      client: "Juan Perez",
      service: "Limpieza",
      date: "2022-01-03",
      status: "Completado",
    },
    {
      id: 4,
      client: "Juan Perez",
      service: "Limpieza",
      date: "2022-01-04",
      status: "Pendiente",
    },
  ];
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-4">Pedidos Recientes</h3>
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">ID Pedido</th>
              <th className="p-2 text-left">Cliente</th>
              <th className="p-2 text-left">Servicio</th>
              <th className="p-2 text-left">Fecha</th>
              <th className="p-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">#{order.id}</td>
                <td className="p-2">{order.client}</td>
                <td className="p-2">{order.service}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Completado"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Pendiente"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pedidos;
