// components/ServiceCountCard.jsx
import React, { useEffect, useState } from "react";

const ServiceCountCard = () => {
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
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Servicios registrados
        </p>
      </div>
    </div>
  );
};

export default ServiceCountCard;
