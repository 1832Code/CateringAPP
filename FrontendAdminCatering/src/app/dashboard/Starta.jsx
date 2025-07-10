// components/StatsCharts.jsx
'use client';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
ChartJS.register(...registerables);

export default function StatsCharts() {
  // Datos de ejemplo - reemplaza con tus datos reales
  const eventTypesData = {
    labels: ['Bodas', 'Corporativos', 'Sociales', 'Otros'],
    datasets: [{
      label: 'Eventos por Tipo',
      data: [12, 8, 5, 3],
      backgroundColor: [
        '#9c27b0', // morado para bodas
        '#2196f3', // azul para corporativos
        '#4caf50', // verde para sociales
        '#ff9800'  // naranja para otros
      ],
      borderWidth: 1
    }]
  };

  const monthlyRevenueData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [{
      label: 'Ingresos Mensuales ($)',
      data: [12500, 14200, 11800, 15600, 18200, 15250],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
      fill: true
    }]
  };

  const inventoryStatusData = {
    labels: ['Disponible', 'Bajo Stock', 'Agotado'],
    datasets: [{
      data: [85, 12, 3],
      backgroundColor: [
        '#4caf50',
        '#ffc107',
        '#f44336'
      ]
    }]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Gráfico de ingresos mensuales */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-4">Ingresos Mensuales</h3>
        <div className="h-64">
          <Line 
            data={monthlyRevenueData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top'
                }
              }
            }}
          />
        </div>
      </div>

      {/* Gráfico de tipos de eventos */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold mb-4">Distribución de Eventos</h3>
        <div className="h-64">
          <Pie 
            data={eventTypesData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right'
                }
              }
            }}
          />
        </div>
      </div>

      {/* Gráfico de estado de inventario */}
      <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
        <h3 className="font-bold mb-4">Estado del Inventario</h3>
        <div className="h-64">
          <Bar
            data={{
              labels: inventoryStatusData.labels,
              datasets: [{
                label: 'Items',
                data: inventoryStatusData.datasets[0].data,
                backgroundColor: inventoryStatusData.datasets[0].backgroundColor
              }]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}