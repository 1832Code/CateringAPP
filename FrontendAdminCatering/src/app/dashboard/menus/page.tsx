"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "@/context/authcontext";

// --- Tipos para la estructura anidada ---
interface ItemRef { id: number }
interface ServicioItem { id?: number; item: ItemRef }
interface Servicio {
  id?: number;
  tipoServicio: { id: number };
  items: ServicioItem[];
}
interface PersonalInfo { id?: number; tipoPersonal: string; cantidad: number }
interface Personal {
  id?: number;
  personalInfo: PersonalInfo[];
}
interface ExtraInfo { id?: number; tipoExtra: string; cantidad: number }
interface Extra {
  id?: number;
  extraInfo: ExtraInfo[];
}
interface InfoMenu {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  cantPersonas: number;
  tipoInfoMenu: string;
  activo: boolean;
  imageURL: string;
  servicio: Servicio;
  personal: Personal;
  extra: Extra;
}
interface InfoMenuForm {
  titulo: string;
  descripcion: string;
  precio: number;
  cantPersonas: number;
  tipoInfoMenu: string;
  activo: boolean;
  imageURL: string;
  servicio: Servicio;
  personal: Personal;
  extra: Extra;
}

function getTokenFromCookie() {
  const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
  return match ? match[2] : null;
}

const InfoMenuPage: React.FC = () => {
  const { roles } = useAuth();
  const [menus, setMenus] = useState<InfoMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [form, setForm] = useState<InfoMenuForm>({
    titulo: "",
    descripcion: "",
    precio: 0,
    cantPersonas: 1,
    tipoInfoMenu: "Predeterminado",
    activo: true,
    imageURL: "",
    servicio: { tipoServicio: { id: 1 }, items: [] },
    personal: { personalInfo: [] },
    extra: { extraInfo: [] },
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const isAdmin = roles.includes("ROLE_ADMIN");

  // Toggle dark mode
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch menus
  const fetchMenus = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8084/api/infomenu", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al cargar menús");
      const data = await res.json();
      setMenus(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : ["precio", "cantPersonas"].includes(name)
        ? Number(value) || 0
        : value
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8084/api/items/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!res.ok) throw new Error("Error al subir la imagen");
    return await res.text();
  };

  // --- Servicio ---
  const addServicioItem = () => {
    setForm((prev) => ({
      ...prev,
      servicio: {
        ...prev.servicio,
        items: [...prev.servicio.items, { item: { id: 1 } }],
      },
    }));
  };
  const updateServicioItem = (idx: number, id: number) => {
    setForm((prev) => ({
      ...prev,
      servicio: {
        ...prev.servicio,
        items: prev.servicio.items.map((it, i) => i === idx ? { ...it, item: { id } } : it),
      },
    }));
  };
  const removeServicioItem = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      servicio: {
        ...prev.servicio,
        items: prev.servicio.items.filter((_, i) => i !== idx),
      },
    }));
  };
  // --- Personal ---
  const addPersonalInfo = () => {
    setForm((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        personalInfo: [...prev.personal.personalInfo, { tipoPersonal: "", cantidad: 1 }],
      },
    }));
  };
  const updatePersonalInfo = (idx: number, field: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        personalInfo: prev.personal.personalInfo.map((p, i) =>
          i === idx ? { ...p, [field]: value } : p
        ),
      },
    }));
  };
  const removePersonalInfo = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        personalInfo: prev.personal.personalInfo.filter((_, i) => i !== idx),
      },
    }));
  };
  // --- Extra ---
  const addExtraInfo = () => {
    setForm((prev) => ({
      ...prev,
      extra: {
        ...prev.extra,
        extraInfo: [...prev.extra.extraInfo, { tipoExtra: "", cantidad: 1 }],
      },
    }));
  };
  const updateExtraInfo = (idx: number, field: string, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      extra: {
        ...prev.extra,
        extraInfo: prev.extra.extraInfo.map((e, i) =>
          i === idx ? { ...e, [field]: value } : e
        ),
      },
    }));
  };
  const removeExtraInfo = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      extra: {
        ...prev.extra,
        extraInfo: prev.extra.extraInfo.filter((_, i) => i !== idx),
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;
    setFeedback(null);
    try {
      let imageURL = form.imageURL || "";
      if (imageFile) {
        imageURL = await uploadImage(imageFile);
      }
      const payload = {
        ...form,
        imageURL,
      };
      const token = getTokenFromCookie();
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `http://localhost:8084/api/infomenu/${editId}`
        : "http://localhost:8084/api/infomenu";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Error al guardar el menú");
      setFeedback(editId ? "Menú actualizado exitosamente" : "Menú creado exitosamente");
      setForm({
        titulo: "",
        descripcion: "",
        precio: 0,
        cantPersonas: 1,
        tipoInfoMenu: "Predeterminado",
        activo: true,
        imageURL: "",
        servicio: { tipoServicio: { id: 1 }, items: [] },
        personal: { personalInfo: [] },
        extra: { extraInfo: [] },
      });
      setEditId(null);
      setImageFile(null);
      setImagePreview(null);
      setShowForm(false);
      fetchMenus();
    } catch (e: unknown) {
      setFeedback(e instanceof Error ? e.message : 'Error desconocido');
    }
  };

  const handleEdit = (menu: InfoMenu) => {
    setForm({
      titulo: menu.titulo,
      descripcion: menu.descripcion,
      precio: menu.precio,
      cantPersonas: menu.cantPersonas,
      tipoInfoMenu: menu.tipoInfoMenu,
      activo: menu.activo,
      imageURL: menu.imageURL,
      servicio: menu.servicio,
      personal: menu.personal,
      extra: menu.extra,
    });
    setEditId(menu.id);
    setImagePreview(menu.imageURL);
    setImageFile(null);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!isAdmin) return;
    if (!window.confirm("¿Estás seguro de que deseas eliminar este menú?")) return;
    try {
      const token = getTokenFromCookie();
      const res = await fetch(`http://localhost:8084/api/infomenu/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al eliminar el menú");
      setFeedback("Menú eliminado exitosamente");
      fetchMenus();
    } catch (e: unknown) {
      setFeedback(e instanceof Error ? e.message : 'Error desconocido');
    }
  };

  const resetForm = () => {
    setEditId(null);
    setForm({
      titulo: "",
      descripcion: "",
      precio: 0,
      cantPersonas: 1,
      tipoInfoMenu: "Predeterminado",
      activo: true,
      imageURL: "",
      servicio: { tipoServicio: { id: 1 }, items: [] },
      personal: { personalInfo: [] },
      extra: { extraInfo: [] },
    });
    setImageFile(null);
    setImagePreview(null);
    setShowForm(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Acceso Restringido</h2>
          <p className="text-gray-600 dark:text-gray-300">Solo los administradores pueden acceder a esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-auto transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="w-[80%] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Gestión de Menús
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Administra y configura los menús del sistema
                </p>
              </div>
              <div className="flex items-center gap-4">
               
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Nuevo Menú
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Messages */}
          {feedback && (
            <div className={`mb-6 p-4 rounded-xl shadow-lg ${
              feedback.includes('Error') 
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400' 
                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
            }`}>
              <div className="flex items-center gap-2">
                {feedback.includes('Error') ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {feedback}
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl shadow-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Form */}
          {showForm && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {editId ? 'Editar Menú' : 'Nuevo Menú'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Título *</label>
                    <input
                      name="titulo"
                      value={form.titulo || ""}
                      onChange={handleChange}
                      placeholder="Ingresa el título del menú"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Tipo de Menú *</label>
                    <select
                      name="tipoInfoMenu"
                      value={form.tipoInfoMenu || "Predeterminado"}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="Predeterminado">Predeterminado</option>
                      <option value="Personalizado">Personalizado</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion || ""}
                    onChange={handleChange}
                    placeholder="Describe el menú..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Precio (S/) *</label>
                    <input
                      name="precio"
                      type="number"
                      value={form.precio ?? 0}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      min={0}
                      step={0.01}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Cantidad de Personas *</label>
                    <input
                      name="cantPersonas"
                      type="number"
                      value={form.cantPersonas ?? 1}
                      onChange={handleChange}
                      placeholder="1"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      min={1}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Estado</label>
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <input
                        type="checkbox"
                        name="activo"
                        checked={form.activo ?? true}
                        onChange={handleChange}
                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Activo</span>
                    </label>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Imagen del Menú</label>
                  <div className="flex flex-col lg:flex-row gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    {imagePreview && (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="Previsualización" 
                          className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-lg" 
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setImageFile(null);
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Servicio Section */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Servicio
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tipo de Servicio</label>
                        <input
                          type="number"
                          value={form.servicio.tipoServicio.id}
                          min={1}
                          onChange={e => setForm(f => ({
                            ...f,
                            servicio: { ...f.servicio, tipoServicio: { id: Number(e.target.value) } }
                          }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                      <div className="flex items-end">
                        <button 
                          type="button" 
                          onClick={addServicioItem} 
                          className="w-full px-4 py-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Agregar Item
                        </button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {form.servicio.items.map((it, idx) => (
                        <div key={idx} className="flex gap-3 items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="flex-1">
                            <input
                              type="number"
                              value={it.item.id}
                              min={1}
                              onChange={e => updateServicioItem(idx, Number(e.target.value))}
                              placeholder="ID del Item"
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeServicioItem(idx)} 
                            className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Personal Section */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Personal
                    </h3>
                    <button 
                      type="button" 
                      onClick={addPersonalInfo} 
                      className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Agregar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {form.personal.personalInfo.map((p, idx) => (
                      <div key={idx} className="flex gap-3 items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={p.tipoPersonal}
                            onChange={e => updatePersonalInfo(idx, "tipoPersonal", e.target.value)}
                            placeholder="Tipo de Personal"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        <div className="w-24">
                          <input
                            type="number"
                            value={p.cantidad}
                            min={1}
                            onChange={e => updatePersonalInfo(idx, "cantidad", Number(e.target.value))}
                            placeholder="Cant."
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removePersonalInfo(idx)} 
                          className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra Section */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Extras
                    </h3>
                    <button 
                      type="button" 
                      onClick={addExtraInfo} 
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Agregar
                    </button>
                  </div>
                  <div className="space-y-3">
                    {form.extra.extraInfo.map((e, idx) => (
                      <div key={idx} className="flex gap-3 items-center p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={e.tipoExtra}
                            onChange={ev => updateExtraInfo(idx, "tipoExtra", ev.target.value)}
                            placeholder="Tipo de Extra"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        <div className="w-24">
                          <input
                            type="number"
                            value={e.cantidad}
                            min={1}
                            onChange={ev => updateExtraInfo(idx, "cantidad", Number(ev.target.value))}
                            placeholder="Cant."
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeExtraInfo(idx)} 
                          className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {editId ? "Actualizar Menú" : "Crear Menú"}
                  </button>
                  {editId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Menus Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Lista de Menús</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {menus.length} menú{menus.length !== 1 ? 's' : ''} registrado{menus.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center p-12">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Cargando menús...</span>
                </div>
              </div>
            ) : menus.length === 0 ? (
              <div className="text-center p-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No hay menús registrados</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Comienza creando tu primer menú haciendo clic en New Mnenu</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  Crear Primer Menú
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Imagen</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Título</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">Descripción</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precio</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">Personas</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider hidden lg:table-cell">Tipo</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {menus.map((menu) => (
                      <tr key={menu.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                          #{menu.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {menu.imageURL ? (
                            <img 
                              src={menu.imageURL} 
                              alt={menu.titulo} 
                              className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm" 
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                          <div className="font-medium">{menu.titulo}</div>
                          <div className="text-gray-500 dark:text-gray-400 text-xs mt-1 md:hidden">
                            {menu.descripcion?.substring(0, 50)}{menu.descripcion?.length > 50 ? '...' : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell max-w-xs">
                          <div className="truncate">{menu.descripcion || 'Sin descripción'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">
                          S/ {menu.precio.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 hidden lg:table-cell">
                          {menu.cantPersonas} persona{menu.cantPersonas !== 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 hidden lg:table-cell">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            menu.tipoInfoMenu === 'Personalizado' 
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {menu.tipoInfoMenu}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            menu.activo 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {menu.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <button
                            onClick={() => handleEdit(menu)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(menu.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors font-medium"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default InfoMenuPage;