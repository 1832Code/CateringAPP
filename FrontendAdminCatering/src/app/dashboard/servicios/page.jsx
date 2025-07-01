"use client";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlus,
  faFileExcel,
  faFilePdf,
  faEdit,
  faTrash,
  faDownload,
} from "@fortawesome/free-solid-svg-icons"; // New icons

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null, // Cambiado a null para el archivo de imagen
    price: "",
    peopleCount: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); // Para mostrar un indicador de carga
  const [error, setError] = useState(null);

  // Fetch servicios
  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/v1/services", {
        // Changed to axios
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      // Ensure data is an array
      setServicios(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(
        "Error al cargar los servicios. Asegúrate de que el backend esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("peopleCount", form.peopleCount);
    if (form.image) {
      formData.append("image", form.image);
    } else if (editingId && !form.imageUrl) {
      // If editing and no new image is selected, but original image was present,
      // you might want to handle existing image URL.
      // For now, if no new image, we don't send 'image' part.
      // Backend handles if imageUrl is not updated by missing 'image' param.
    }

    try {
      const token = localStorage.getItem("token");
      const url = editingId
        ? `http://localhost:8080/api/v1/services/${editingId}`
        : "http://localhost:8080/api/v1/services";

      const res = await axios({
        // Using axios for FormData
        method: editingId ? "PUT" : "POST",
        url: url,
        data: formData,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          // axios automatically sets 'Content-Type': 'multipart/form-data' for FormData
        },
      });

      if (res.status < 200 || res.status >= 300) {
        // Check status code for axios
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      setForm({
        title: "",
        description: "",
        image: null,
        price: "",
        peopleCount: "",
      });
      setEditingId(null);
      fetchServicios(); // Refresh data
    } catch (err) {
      console.error(
        "Error submitting form:",
        err.response ? err.response.data : err.message
      );
      setError(
        "Error al enviar el formulario. " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (servicio) => {
    setForm({
      title: servicio.title,
      description: servicio.description,
      // No precargues 'image' para el input type="file", déjalo null
      image: null,
      imageUrl: servicio.imageUrl, // Guarda la URL existente para mostrarla si no se cambia
      price: servicio.price,
      peopleCount: servicio.peopleCount,
    });
    setEditingId(servicio.id);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este servicio?")
    ) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:8080/api/v1/services/${id}`,
        {
          // Changed to axios
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      if (res.status < 200 || res.status >= 300) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      fetchServicios(); // Refresh data
    } catch (err) {
      console.error(
        "Error deleting service:",
        err.response ? err.response.data : err.message
      );
      setError(
        "Error al eliminar el servicio. " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Handle Excel Download ---
  const handleDownloadExcel = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/v1/services/export/excelService",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          responseType: "blob", // Important for downloading files
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "servicios.xlsx"); // Filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up URL
      console.log("Excel download initiated.");
    } catch (err) {
      console.error("Error downloading Excel:", err);
      setError("Error al descargar el archivo Excel.");
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Handle PDF Download ---
  const handleDownloadPdf = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/v1/services/export/pdf",
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          responseType: "blob", // Important for downloading files
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "servicios.pdf"); // Filename
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up URL
      console.log("PDF download initiated.");
    } catch (err) {
      console.error("Error downloading PDF:", err);
      setError("Error al descargar el archivo PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white w-full h-auto dark:bg-gray-800 p-8 shadow-lg bg-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Gestión de Servicios de Catering
      </h2>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-900 p-6 rounded-lg shadow-xl mb-8"
      >
        <h3 className="col-span-full text-xl font-semibold mb-2 text-gray-100">
          {editingId ? "Editar Servicio" : "Agregar Nuevo Servicio"}
        </h3>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Título:
          </label>
          <input
            id="title"
            name="title"
            placeholder="Título del Servicio"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Descripción:
          </label>
          <input
            id="description"
            name="description"
            placeholder="Descripción del Servicio"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Imagen:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            // Required only if creating, or if editing and no existing image (you might need more complex logic here)
            required={!editingId || (editingId && !form.imageUrl)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {editingId && form.imageUrl && (
            <p className="text-gray-400 text-sm mt-1">
              Imagen actual:{" "}
              <a
                href={form.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400"
              >
                Ver imagen
              </a>
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Precio:
          </label>
          <input
            id="price"
            name="price"
            placeholder="Precio"
            type="number"
            step="0.01" // Allow decimal prices
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="peopleCount"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Cantidad de personas:
          </label>
          <input
            id="peopleCount"
            name="peopleCount"
            placeholder="Cantidad de personas"
            type="number"
            value={form.peopleCount}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="col-span-full flex justify-end space-x-3 mt-4">
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm({
                  title: "",
                  description: "",
                  image: null,
                  price: "",
                  peopleCount: "",
                });
                setEditingId(null);
                setError(null);
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              Cancelar Edición
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
            disabled={loading}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className={editingId ? "hidden" : ""}
            />
            <span>
              {loading
                ? "Guardando..."
                : editingId
                ? "Actualizar Servicio"
                : "Agregar Servicio"}
            </span>
          </button>
        </div>
      </form>

      {/* Download Buttons Section */}
      <div className="flex justify-end space-x-4 mb-6">
        <button
          onClick={handleDownloadExcel}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faFileExcel} />
          <span>Descargar Excel</span>
        </button>
        <button
          onClick={handleDownloadPdf}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faFilePdf} />
          <span>Descargar PDF</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-xl">
        <table className="w-full min-w-[700px] border-collapse text-white">
          <thead className="bg-gray-800 text-gray-300 uppercase text-sm leading-normal">
            <tr>
              <th className="p-3 text-left">Imagen</th>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Descripción</th>
              <th className="p-3 text-left">Precio</th>
              <th className="p-3 text-left">Personas</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-100 text-sm font-light">
            {servicios.length > 0 ? (
              servicios.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition duration-150 ease-in-out"
                >
                  <td className="p-3">
                    {s.imageUrl && (
                      <img
                        src={s.imageUrl}
                        alt={s.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-3">{s.title}</td>
                  <td className="p-3">{s.description}</td>
                  <td className="p-3">${s.price.toFixed(2)}</td>
                  <td className="p-3">{s.peopleCount}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => handleEdit(s)}
                        className="text-yellow-400 hover:text-yellow-300 transition duration-150 ease-in-out"
                        title="Editar"
                        disabled={loading}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-red-400 hover:text-red-300 transition duration-150 ease-in-out"
                        title="Eliminar"
                        disabled={loading}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No hay servicios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
