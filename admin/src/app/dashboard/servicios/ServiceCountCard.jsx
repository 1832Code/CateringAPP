// components/ServiceCountCard.jsx
import React, { useEffect, useState } from "react";

const ServiceCountCard = () => {
  const [serviceCount, setServiceCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServiceCount = async () => {
    try {
      setLoading(true);
      // Replace with your actual backend URL
      const response = await fetch(
        "http://localhost:8080/api/v1/services/countService",
        {
          headers: {},
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setServiceCount(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch service count:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceCount();

    const intervalId = setInterval(fetchServiceCount, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  if (loading)
    return (
      <div className="p-4 bg-white rounded-lg shadow-md text-center">
        Cargando servicios...
      </div>
    );
  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow-md text-center">
        Error: {error}
      </div>
    );

  return (
    <div className="rounded-xl p-6 shadow-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:hover:from-gray-800 dark:hover:to-gray-700 transition-all duration-300 group">
      <div className="flex flex-col items-center">
        <div className="p-3 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/50 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-blue-600 dark:text-blue-400 bg-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
          Total de Servicios
        </h2>
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
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
