"use client"; // This component will be a Client Component

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import {
  Card,
  Spinner,
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  TextInput,
  Label,
} from "flowbite-react"; // Import Flowbite components for better UI
=======
import { Card, Spinner, Alert, Button, Modal, ModalBody, ModalHeader, ModalFooter, TextInput, Label } from "flowbite-react"; // Import Flowbite components for better UI
>>>>>>> origin/auth
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useAuth } from "@/context/authcontext";

const Perfil = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { email, roles } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      setLoading(true);
      setError(null);

      if (!email) {
        setError(
          "No se encontró información de autenticación. Por favor, inicie sesión."
        );
        setLoading(false);
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:8084/api/usuarios/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Keep if your backend requires it for session or CSRF
        });

        if (res.ok) {
          const data = await res.json();
          setAdminData(data);
        } else if (res.status === 401 || res.status === 403) {
          // Unauthorized or Forbidden (e.g., token expired, not an admin)
          const errorText = await res.text();
          setError(
            `Acceso denegado o sesión expirada: ${errorText}. Por favor, inicie sesión nuevamente.`
          );
          router.push("/auth/login");
        } else {
          const errorText = await res.text();
          setError(`Error al cargar el perfil: ${errorText}`);
        }
      } catch (err) {
        console.error("Error fetching admin profile:", err);
        setError("Error de conexión al servidor. Intente de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [router]); // Include router in dependencies if you push inside useEffect

  // Función para abrir modal de edición y setear datos actuales
  const handleEditClick = () => {
    setEditData({
<<<<<<< HEAD
      firstName: adminData.firstName || "",
      lastName: adminData.lastName || "",
      email: adminData.email || "",
      dni: adminData.dni || "",
      telephone: adminData.telephone || "",
=======
      nombres: adminData.nombres || "",
      apellidos: adminData.apellidos || "",
      email: adminData.email || "",
      dni: adminData.dni || "",
      telefono: adminData.telefono || "",
>>>>>>> origin/auth
    });
    setShowEditModal(true);
  };

  // Función para enviar edición
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setError(null);
    setSuccessMsg(null);
<<<<<<< HEAD
    try {
      const res = await fetch(
        `http://localhost:8084/api/admins/usuarios/${adminData.id}`,
        {
=======
          try {
        const res = await fetch(`http://localhost:8084/api/admins/usuarios/${adminData.id}`, {
>>>>>>> origin/auth
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(editData),
<<<<<<< HEAD
        }
      );
=======
        });
>>>>>>> origin/auth
      if (res.ok) {
        const updated = await res.json();
        setAdminData({ ...adminData, ...updated });
        setSuccessMsg("Perfil actualizado correctamente.");
        setShowEditModal(false);
      } else {
        const errorText = await res.text();
        setError(`Error al actualizar: ${errorText}`);
      }
    } catch (err) {
      setError("Error de conexión al servidor. Intente de nuevo más tarde.");
    } finally {
      setEditLoading(false);
    }
  };

  // Función para eliminar usuario
  const handleDelete = async () => {
    setDeleteLoading(true);
    setError(null);
<<<<<<< HEAD
    try {
      const res = await fetch(
        `http://localhost:8084/api/admins/usuarios/${adminData.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        setSuccessMsg("Cuenta eliminada correctamente. Redirigiendo...");
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      } else {
        const errorText = await res.text();
        setError(`Error al eliminar: ${errorText}`);
      }
    } catch (err) {
      setError("Error de conexión al servidor. Intente de nuevo más tarde.");
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };
=======
          try {
        const res = await fetch(`http://localhost:8084/api/admins/usuarios/${adminData.id}`, {
          method: "DELETE",
          credentials: "include",
        });
              if (res.ok) {
          setSuccessMsg("Cuenta eliminada correctamente. Redirigiendo...");
          setTimeout(() => {
            router.push("/auth/login");
          }, 2000);
        } else {
          const errorText = await res.text();
          setError(`Error al eliminar: ${errorText}`);
        }
      } catch (err) {
        setError("Error de conexión al servidor. Intente de nuevo más tarde.");
      } finally {
        setDeleteLoading(false);
        setShowDeleteModal(false);
      }
    };
>>>>>>> origin/auth

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <Spinner size="xl" />
        <p className="ml-3 text-lg text-gray-700 dark:text-gray-300">
          Cargando perfil...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert color="failure" onDismiss={() => setError(null)}>
          <span className="font-medium">Error:</span> {error}
        </Alert>
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <Alert color="warning">
          <span className="font-medium">Advertencia:</span> No se pudo cargar la
          información del administrador.
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex justify-center items-center py-10 px-4">
      <Card className="w-full max-w-2xl shadow-xl rounded-lg p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <img
            className="w-32 h-32 rounded-full object-cover border-4 border-amber-500 dark:border-amber-400 shadow-lg mb-4"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" // Placeholder: Consider dynamic image later
            alt="Profile Picture"
          />
          <h2 className="text-4xl font-extrabold text-amber-700 dark:text-amber-300 mb-2">
            {adminData.firstName} {adminData.lastName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
            Administrador
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 dark:text-gray-300">
          <div>
            <p className="text-md font-semibold text-amber-600 dark:text-amber-300">
              Correo Electrónico:
            </p>
            <p className="text-lg">{adminData.email}</p>
          </div>
          <div>
            <p className="text-md font-semibold text-amber-600 dark:text-amber-300">
              DNI:
            </p>
            <p className="text-lg">{adminData.dni || "No especificado"}</p>
          </div>
          <div>
            <p className="text-md font-semibold text-amber-600 dark:text-amber-300">
              Teléfono:
            </p>
<<<<<<< HEAD
            <p className="text-lg">{adminData.telefono || "No especificado"}</p>
=======
            <p className="text-lg">
              {adminData.telefono || "No especificado"}
            </p>
>>>>>>> origin/auth
          </div>
          <div>
            <p className="text-md font-semibold text-amber-600 dark:text-amber-300">
              Roles:
            </p>
            <p className="text-lg">
              {adminData.roles && adminData.roles.length > 0
                ? adminData.roles.map((role, index) => (
                    <span
                      key={index}
                      className="inline-block bg-amber-200 dark:bg-amber-600 text-amber-800 dark:text-amber-100 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2"
                    >
                      {role.replace("ROLE_", "")}
                    </span>
                  ))
                : "No roles asignados"}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-700 text-center">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Acciones del Perfil
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleEditClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Editar Perfil
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
            >
              Eliminar Cuenta
            </button>
          </div>
        </div>
      </Card>
      {/* Modal de edición */}
<<<<<<< HEAD
      <Modal
        show={showEditModal}
        size="md"
        onClose={() => setShowEditModal(false)}
        popup
      >
=======
      <Modal show={showEditModal} size="md" onClose={() => setShowEditModal(false)} popup>
>>>>>>> origin/auth
        <ModalHeader>Editar Perfil</ModalHeader>
        <ModalBody>
          <form className="space-y-4" onSubmit={handleEditSubmit}>
            <div>
<<<<<<< HEAD
              <Label htmlFor="firstName">Nombre</Label>
              <TextInput
                id="firstName"
                value={editData?.firstName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, firstName: e.target.value })
                }
=======
              <Label htmlFor="nombres">Nombre</Label>
              <TextInput
                id="nombres"
                value={editData?.nombres || ""}
                onChange={e => setEditData({ ...editData, nombres: e.target.value })}
>>>>>>> origin/auth
                required
              />
            </div>
            <div>
<<<<<<< HEAD
              <Label htmlFor="lastName">Apellido</Label>
              <TextInput
                id="lastName"
                value={editData?.lastName || ""}
                onChange={(e) =>
                  setEditData({ ...editData, lastName: e.target.value })
                }
=======
              <Label htmlFor="apellidos">Apellido</Label>
              <TextInput
                id="apellidos"
                value={editData?.apellidos || ""}
                onChange={e => setEditData({ ...editData, apellidos: e.target.value })}
>>>>>>> origin/auth
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Correo Electrónico</Label>
              <TextInput
                id="email"
                type="email"
                value={editData?.email || ""}
<<<<<<< HEAD
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
=======
                onChange={e => setEditData({ ...editData, email: e.target.value })}
>>>>>>> origin/auth
                required
              />
            </div>
            <div>
              <Label htmlFor="dni">DNI</Label>
              <TextInput
                id="dni"
                value={editData?.dni || ""}
<<<<<<< HEAD
                onChange={(e) =>
                  setEditData({ ...editData, dni: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="telephone">Teléfono</Label>
              <TextInput
                id="telephone"
                value={editData?.telephone || ""}
                onChange={(e) =>
                  setEditData({ ...editData, telephone: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                color="gray"
                onClick={() => setShowEditModal(false)}
                type="button"
              >
=======
                onChange={e => setEditData({ ...editData, dni: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <TextInput
                id="telefono"
                value={editData?.telefono || ""}
                onChange={e => setEditData({ ...editData, telefono: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button color="gray" onClick={() => setShowEditModal(false)} type="button">
>>>>>>> origin/auth
                Cancelar
              </Button>
              <Button type="submit" isProcessing={editLoading}>
                Guardar Cambios
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      {/* Modal de confirmación de borrado */}
<<<<<<< HEAD
      <Modal
        show={showDeleteModal}
        size="md"
        onClose={() => setShowDeleteModal(false)}
        popup
      >
=======
      <Modal show={showDeleteModal} size="md" onClose={() => setShowDeleteModal(false)} popup>
>>>>>>> origin/auth
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
<<<<<<< HEAD
              ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se
              puede deshacer.
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="red"
                onClick={handleDelete}
                isProcessing={deleteLoading}
              >
=======
              ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDelete} isProcessing={deleteLoading}>
>>>>>>> origin/auth
                Sí, eliminar
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {successMsg && (
        <div className="p-4">
          <Alert color="success" onDismiss={() => setSuccessMsg(null)}>
            <span className="font-medium">Éxito:</span> {successMsg}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Perfil;
