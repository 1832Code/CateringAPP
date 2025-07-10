"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function TablaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    id: null,
    dni: "",
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
    role: "ROLE_USER",
    confirmed: true,
  });

  const [editing, setEditing] = useState(false);

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8084/api/admins/usuarios", {
        withCredentials: true,
      });
      setUsuarios(res.data || []);
    } catch (err) {
      console.error("Error al cargar usuarios", err);
      alert("Error cargando usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

    try {
      await axios.delete(`http://localhost:8084/api/admins/usuarios/${id}`, {
        withCredentials: true,
      });
      setUsuarios(usuarios.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error al eliminar", err);
      alert("Error eliminando usuario");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      dni: formData.dni,
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      email: formData.email,
      telefono: formData.telefono,
      password: formData.password || undefined,
      role: formData.role,
      confirmed: formData.confirmed,
    };

    try {
      if (editing) {
        await axios.put(
          `http://localhost:8084/api/admins/usuarios/${formData.id}`,
          payload,
          { withCredentials: true }
        );
        setSuccessMessage("Usuario actualizado con éxito");
      } else {
        await axios.post(`http://localhost:8084/api/admins/usuarios`, payload, {
          withCredentials: true,
        });
        setSuccessMessage("Usuario creado con éxito");
      }

      await cargarUsuarios();
      resetForm();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error guardando usuario", err);
      alert("Error guardando usuario: " + err?.response?.data?.message);
    }
  };

  const handleEdit = (usuario) => {
    setFormData({
      id: usuario.id,
      dni: usuario.dni || "",
      nombres: usuario.nombres || "",
      apellidos: usuario.apellidos || "",
      email: usuario.email || "",
      telefono: usuario.telefono || "",
      password: "",
      role: usuario.roles?.[0] || "ROLE_USER",
      confirmed: usuario.confirmed ?? true,
    });
    setEditing(true);
  };

  const resetForm = () => {
    setFormData({
      id: null,
      dni: "",
      nombres: "",
      apellidos: "",
      email: "",
      telefono: "",
      password: "",
      role: "ROLE_USER",
      confirmed: true,
    });
    setEditing(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Gestión de Usuarios (Admin CRUD)
      </h2>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {successMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded dark:bg-slate-800"
      >
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={formData.nombres}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 dark:bg-slate-800"
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          className="border p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2"
          required={!editing}
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2"
          required
        >
          <option value="">Seleccione un rol</option>
          <option value="ROLE_ADMIN">ADMIN</option>
          <option value="ROLE_USER">USER</option>
        </select>

        <label className="flex items-center col-span-2">
          <input
            type="checkbox"
            name="confirmed"
            checked={formData.confirmed}
            onChange={handleChange}
            className="mr-2"
          />
          Usuario confirmado
        </label>

        <div className="flex space-x-2 col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editing ? "Actualizar" : "Crear"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow text-sm dark:bg-slate-700 dark:border-slate-500">
          <thead>
            <tr>
              <th className="border px-2 py-2">ID</th>
              <th className="border px-2 py-2">DNI</th>
              <th className="border px-2 py-2">Nombres</th>
              <th className="border px-2 py-2">Apellidos</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">Teléfono</th>
              <th className="border px-2 py-2">Confirmed</th>
              <th className="border px-2 py-2">VerificationCode</th>
              <th className="border px-2 py-2">Roles</th>
              <th className="border px-2 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="border px-2 py-2">{u.id}</td>
                <td className="border px-2 py-2">{u.dni}</td>
                <td className="border px-2 py-2">{u.nombres}</td>
                <td className="border px-2 py-2">{u.apellidos}</td>
                <td className="border px-2 py-2">{u.email}</td>
                <td className="border px-2 py-2">{u.telefono}</td>
                <td className="border px-2 py-2">
                  {u.confirmed ? "Sí" : "No"}
                </td>
                <td className="border px-2 py-2">{u.verificationCode}</td>
                <td className="border px-2 py-2">{u.roles?.join(", ")}</td>
                <td className="border px-2 py-2 space-x-2 ">
                  <button
                    onClick={() => handleEdit(u)}
                    className="cursor-pointer bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarUsuario(u.id)}
                    className="cursor-pointer bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mt-2"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
