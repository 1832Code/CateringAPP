"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authcontext";
import Link from "next/link";

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

const CategoriaPage: React.FC = () => {
  const { roles } = useAuth();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Categoria>>({
    nombre: "",
    descripcion: "",
    activo: true,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isAdmin = roles.includes("ROLE_ADMIN");

  // Fetch categorías
  const fetchCategorias = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8084/api/categorias", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al cargar categorías");
      const data = await res.json();
      setCategorias(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
      setFeedback({ message: e.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setFeedback(null);
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `http://localhost:8084/api/categorias/${editId}`
        : "http://localhost:8084/api/categorias";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al guardar la categoría");
      setFeedback({
        message: editId
          ? "✅ Categoría actualizada con éxito"
          : "✅ Categoría creada con éxito",
        type: "success",
      });
      setForm({ nombre: "", descripcion: "", activo: true });
      setEditId(null);
      fetchCategorias();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setFeedback({ message: `❌ ${e.message}`, type: "error" });
    }
  };

  const handleEdit = (cat: Categoria) => {
    setForm({
      nombre: cat.nombre,
      descripcion: cat.descripcion,
      activo: cat.activo,
    });
    setEditId(cat.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!isAdmin) return;
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta categoría?"))
      return;
    try {
      const res = await fetch(`http://localhost:8084/api/categorias/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al eliminar la categoría");
      setFeedback({
        message: "✅ Categoría eliminada con éxito",
        type: "success",
      });
      fetchCategorias();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setFeedback({ message: `❌ ${e.message}`, type: "error" });
    }
  };

  const filteredCategorias = categorias.filter(
    (cat) =>
      cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Acceso restringido
          </h2>
          <p className="text-gray-600 mb-6">
            Solo los administradores pueden acceder a esta sección.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-400">
              Gestión de Categorías
            </h1>
            <p className="text-gray-600 dark:text-slate-400">
              Administra las categorías de tu aplicación
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar categorías..."
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              feedback.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <div className="flex items-center">
              {feedback.type === "success" ? (
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span>{feedback.message}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 dark:bg-slate-900">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editId ? "Editar Categoría" : "Crear Nueva Categoría"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  value={form.nombre || ""}
                  onChange={handleChange}
                  placeholder="Ej: Postres"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="descripcion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={form.descripcion || ""}
                  onChange={handleChange}
                  placeholder="Ej: Productos electrónicos y dispositivos"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  rows={3}
                />
              </div>

              <div className="flex items-center">
                <input
                  id="activo"
                  type="checkbox"
                  name="activo"
                  checked={form.activo ?? true}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="activo"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Categoría activa
                </label>
              </div>

              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
                >
                  {editId ? (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                      Actualizar
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      Crear
                    </>
                  )}
                </button>

                {editId && (
                  <button
                    type="button"
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
                    onClick={() => {
                      setEditId(null);
                      setForm({ nombre: "", descripcion: "", activo: true });
                    }}
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden dark:bg-slate-900">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Lista de Categorías
              </h2>
              <span className="text-sm text-gray-500">
                {filteredCategorias.length}{" "}
                {filteredCategorias.length === 1 ? "categoría" : "categorías"}
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 dark:bg-slate-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:bg-slate-900"
                      >
                        Nombre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Descripción
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Estado
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCategorias.length > 0 ? (
                      filteredCategorias.map((cat) => (
                        <tr
                          key={cat.id}
                          className="hover:bg-gray-50 transition dark:bg-slate-950"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">
                              {cat.nombre}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {cat.id}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-700 max-w-xs truncate">
                              {cat.descripcion || "-"}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                cat.activo
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {cat.activo ? "Activo" : "Inactivo"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEdit(cat)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(cat.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          {searchTerm
                            ? "No se encontraron categorías que coincidan con la búsqueda"
                            : "No hay categorías registradas"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriaPage;
