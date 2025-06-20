"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed: npm install axios
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // For icons
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons"; // Specific icons

// Optional: Install FontAwesome for better UI icons
// npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // To show/hide add/edit form
  const [editingUser, setEditingUser] = useState(null); // User object being edited (null for add)

  const [formInput, setFormInput] = useState({
    email: "",
    password: "", // Only for create, or if changing for update
    firstname: "",
    lastname: "",
    confirmed: false, // For update, default to false for create
  });

  // --- Fetch Users ---
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      };
      const response = await axios.get(
        "http://localhost:8080/api/v1/users",
        config
      );
      setUsers(response.data);
      console.log("Users fetched:", response.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(
        "Error al cargar los usuarios. Asegúrate de que el backend esté funcionando."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Fetch users on component mount

  // --- Form Handling ---
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormInput({
      ...formInput,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setFormInput({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      confirmed: false,
    });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const config = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    try {
      if (editingUser) {
        // Update User
        const payload = {
          email: formInput.email,
          firstname: formInput.firstname,
          lastname: formInput.lastname,
          confirmed: formInput.confirmed,
        };
        // Only send password if it's provided (for update)
        if (formInput.password) {
          payload.password = formInput.password;
        }
        await axios.put(
          `http://localhost:8080/api/v1/users/${editingUser.id}`,
          payload,
          config
        );
        console.log("User updated successfully");
      } else {
        // Create User
        await axios.post(
          "http://localhost:8080/api/v1/users",
          formInput,
          config
        );
        console.log("User created successfully");
      }
      resetForm();
      fetchUsers(); // Re-fetch all users to update the table
    } catch (err) {
      console.error(
        "Error saving user:",
        err.response ? err.response.data : err.message
      );
      setError(
        "Error al guardar el usuario. " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Edit User ---
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormInput({
      email: user.email,
      password: "", // Don't pre-fill password for security
      firstname: user.firstname,
      lastname: user.lastname,
      confirmed: user.confirmed,
    });
    setShowForm(true);
  };

  // --- Delete User ---
  const handleDelete = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este usuario?")
    ) {
      return;
    }
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    const config = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    try {
      await axios.delete(`http://localhost:8080/api/v1/users/${id}`, config);
      console.log("User deleted successfully");
      fetchUsers(); // Re-fetch all users to update the table
    } catch (err) {
      console.error(
        "Error deleting user:",
        err.response ? err.response.data : err.message
      );
      setError(
        "Error al eliminar el usuario. " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-white w-full h-auto p-8 text-center dark:bg-gray-800">
        Cargando usuarios...
      </div>
    );
  }

  return (
    <div className="text-white w-full h-auto dark:bg-gray-800 p-8 shadow-lg bg-gray-200 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Gestión de Usuarios
      </h2>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* Add User Button */}
      {!showForm && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => {
              resetForm(); // Clear form if any previous edit was in progress
              setShowForm(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>Agregar Nuevo Usuario</span>
          </button>
        </div>
      )}

      {/* User Creation/Edit Form */}
      {showForm && (
        <div className="dark:bg-gray-900 p-6 rounded-lg shadow-xl mb-8 bg-gray-100">
          <h3 className="text-xl font-semibold mb-4 text-gray-100">
            {editingUser ? "Editar Usuario" : "Agregar Nuevo Usuario"}
          </h3>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formInput.email}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {!editingUser && ( // Password is required only for new user creation
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Contraseña:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formInput.password}
                  onChange={handleInputChange}
                  required={!editingUser} // Required only for new users
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            {editingUser && ( // Optional password change for existing users
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  Nueva Contraseña (opcional):
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formInput.password}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formInput.firstname}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                Apellido:
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formInput.lastname}
                onChange={handleInputChange}
                required
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-full flex items-center">
              <input
                type="checkbox"
                id="confirmed"
                name="confirmed"
                checked={formInput.confirmed}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="confirmed"
                className="ml-2 text-sm font-medium text-gray-400"
              >
                Confirmado
              </label>
            </div>
            <div className="col-span-full flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                {loading
                  ? "Guardando..."
                  : editingUser
                  ? "Actualizar Usuario"
                  : "Crear Usuario"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto bg-gray-100 text-gray-700 dark:bg-gray-900 rounded-lg shadow-xl">
        <table className="w-full min-w-[700px] border-collapse text-gray-800">
          <thead className="bg-gray-800 text-gray-300 uppercase text-sm leading-normal">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Apellido</th>
              <th className="p-3 text-left">Confirmado</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 dark:text-gray-100 text-sm font-light">
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-gray-700 transition duration-150 ease-in-out"
                >
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.firstname}</td>
                  <td className="p-3">{user.lastname}</td>
                  <td className="p-3">{user.confirmed ? "Sí" : "No"}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-400 hover:text-blue-300 transition duration-150 ease-in-out"
                        title="Editar"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-400 hover:text-red-300 transition duration-150 ease-in-out"
                        title="Eliminar"
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
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Optional: Manual Refresh Button */}
      <div className="mt-6 text-center">
        <button
          onClick={fetchUsers}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Actualizando..." : "Actualizar Lista Manualmente"}
        </button>
      </div>
    </div>
  );
}
