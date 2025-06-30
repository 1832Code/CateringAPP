"use client";
import React, { useState, useEffect } from "react";
import { api } from "../../auth/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";

// For Excel Export
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// For PDF Export
import jsPDF from "jspdf";
import "jspdf-autotable";

const USERS_ENDPOINT = "/crudUser"; // <--- CHANGED: Use relative path
const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Form fields state
  const [dni, setDni] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]); // Array of strings (e.g., ["ROLE_USER", "ROLE_ADMIN"])
  const [enabled, setEnabled] = useState(false); // New field for enabled status

  // Define all possible roles for the select input
  const allRoles = [
    { name: "ROLE_USER", label: "Usuario" },
    { name: "ROLE_ADMIN", label: "Administrador" },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get(USERS_ENDPOINT); // <--- CHANGED: Using 'api'
      setUsers(response.data); // Backend now sends UserResponseDTO
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(
          "Acceso denegado: No está autenticado o no tiene permisos de administrador."
        );
      } else {
        setError(
          "Error al cargar los usuarios. Verifique que el backend esté funcionando."
        );
      }
      setLoading(false);
      console.error("Error fetching users:", err.response?.data || err.message);
    }
  };

  const handleOpenCreateDialog = () => {
    setIsEditing(false);
    setCurrentUser(null);
    resetFormFields();
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setDni(user.dni || "");
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setTelephone(user.telephone || "");
    setEmail(user.email || "");
    setPassword(""); // Never pre-fill password for security
    setSelectedRoles(user.roles || []); // user.roles is already an array of strings from DTO
    setEnabled(user.enabled); // Set enabled status
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetFormFields();
    setCurrentUser(null);
  };

  const resetFormFields = () => {
    setDni("");
    setFirstName("");
    setLastName("");
    setTelephone("");
    setEmail("");
    setPassword("");
    setSelectedRoles([]);
    setEnabled(false);
  };

  const handleSubmit = async () => {
    const userData = {
      dni,
      firstName,
      lastName,
      telephone,
      email,
      // Only include password if it's for creation or explicitly changed during edit
      password: isEditing && password === "" ? undefined : password,
      // Map selected string roles back to expected Role objects for backend
      roles: selectedRoles.map((roleName) => ({ name: roleName })),
      enabled: enabled, // Include enabled status
    };

    try {
      let response;
      if (isEditing && currentUser) {
        response = await api.put(
          // <--- CHANGED: Using 'api'
          `${USERS_ENDPOINT}/${currentUser.id}`,
          userData
        );
        alert("Usuario actualizado exitosamente!");
      } else {
        // For new user creation, password must not be undefined
        if (!password) {
          alert("La contraseña es requerida para un nuevo usuario.");
          return;
        }
        response = await api.post(USERS_ENDPOINT, userData); // <--- CHANGED: Using 'api'
        alert("Usuario creado exitosamente!");
      }
      fetchUsers(); // Refresh the list
      handleCloseDialog();
    } catch (err) {
      console.error("Error saving user:", err.response?.data || err.message);
      alert(
        `Error al guardar el usuario: ${err.response?.data || err.message}`
      );
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("¿Está seguro de que desea eliminar este usuario?")) {
      try {
        await api.delete(`${USERS_ENDPOINT}/${id}`); // <--- CHANGED: Using 'api'
        alert("Usuario eliminado exitosamente!");
        fetchUsers(); // Refresh the list
      } catch (err) {
        console.error(
          "Error deleting user:",
          err.response?.data || err.message
        );
        alert(
          `Error al eliminar el usuario: ${err.response?.data || err.message}`
        );
      }
    }
  };

  const exportToExcel = () => {
    const dataToExport = users.map((user) => ({
      ID: user.id,
      DNI: user.dni,
      Nombre: user.firstName,
      Apellido: user.lastName,
      Teléfono: user.telephone,
      Email: user.email,
      Roles: user.roles.join(", "), // roles are already strings
      Verificado: user.enabled ? "Sí" : "No",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "usuarios_gourmet.xlsx");
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text("Lista de Usuarios - Gourmet Catering", 14, 15);

    const tableColumn = [
      "ID",
      "DNI",
      "Nombre",
      "Apellido",
      "Teléfono",
      "Email",
      "Roles",
      "Verificado",
    ];
    const tableRows = [];

    users.forEach((user) => {
      const userData = [
        user.id,
        user.dni,
        user.firstName,
        user.lastName,
        user.telephone,
        user.email,
        user.roles.join(", "), // roles are already strings
        user.enabled ? "Sí" : "No",
      ];
      tableRows.push(userData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 25 });
    doc.save("usuarios_gourmet.pdf");
  };

  if (loading)
    return <Typography variant="h6">Cargando usuarios...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>

      <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateDialog}
          color="primary"
        >
          Agregar Usuario
        </Button>
        <Button
          variant="outlined"
          startIcon={<DescriptionIcon />}
          onClick={exportToExcel}
          color="success"
        >
          Exportar a Excel
        </Button>
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={exportToPdf}
          color="error"
        >
          Exportar a PDF
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Verificado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.dni}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.telephone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.roles && user.roles.length > 0
                    ? user.roles.join(", ") // Roles are now strings directly from DTO
                    : "N/A"}
                </TableCell>
                <TableCell>{user.enabled ? "Sí" : "No"}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenEditDialog(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? "Editar Usuario" : "Crear Nuevo Usuario"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="DNI"
            type="text"
            fullWidth
            variant="standard"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Apellido"
            type="text"
            fullWidth
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Teléfono"
            type="text"
            fullWidth
            variant="standard"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label={
              isEditing
                ? "Contraseña (dejar en blanco para no cambiar)"
                : "Contraseña"
            }
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!isEditing}
          />
          <TextField
            margin="dense"
            label="Roles"
            select
            fullWidth
            variant="standard"
            value={selectedRoles}
            onChange={(e) => setSelectedRoles(e.target.value)}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => selected.join(", "),
            }}
            helperText="Seleccione uno o más roles"
          >
            {allRoles.map((role) => (
              <MenuItem key={role.name} value={role.name}>
                {role.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel
            control={
              <Checkbox
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
                name="enabled"
                color="primary"
              />
            }
            label="Cuenta Habilitada"
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {isEditing ? "Guardar Cambios" : "Crear Usuario"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagementPage;
