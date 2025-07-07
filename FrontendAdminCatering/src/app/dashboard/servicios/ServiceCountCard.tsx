"use client";

import React, { useEffect, useState } from "react";

const ServiceCountCard: React.FC = () => {
  const [serviceCount, setServiceCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServiceCount = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8084/api/admin/dashboard/infomenu/cant-predeterminados",
        {
          method: "GET",
          credentials: "include", 
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setServiceCount(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      console.error("Error al obtener el conteo de servicios:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceCount();
    const intervalId = setInterval(fetchServiceCount, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center">
        Cargando servicios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow-md text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 shadow-lg bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 group">
      <div className="flex flex-row gap-2 items-center">
       
       
        <div className="text-4xl font-bold text-gray-100 dark:text-blue-400 mb-1">
          {serviceCount}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Servicios registrados
        </p>
      </div>
    </div>
  );
};

export default ServiceCountCard;
