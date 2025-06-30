// app/refunds/page.jsx
"use client";

import React, { useState, useEffect } from "react";

// Material-UI components
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
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

// Material-UI Icons
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";

// For Excel Export
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// For PDF Export
import jsPDF from "jspdf";
import "jspdf-autotable"; // This extends jspdf with autoTable functionality

// --- 1. Mock Data (formerly data/mockData.js) ---
const initialMockRefunds = [
  {
    id: "REF001",
    orderId: "ORD004",
    customerName: "Ana Lopez",
    customerEmail: "ana.lopez@example.com",
    requestDate: "2024-06-24",
    amount: 1200.0,
    reason: "Cancelación de evento por fuerza mayor.",
    status: "PENDING_REVIEW",
    refundType: "FULL",
    paymentMethod: "Credit Card",
    notes: "Cliente contactó 2 días después de la reserva para cancelar.",
    history: [
      {
        date: "2024-06-24",
        action: "Solicitud de reembolso creada",
        user: "Customer",
      },
    ],
  },
  {
    id: "REF002",
    orderId: "ORD001",
    customerName: "Juan Perez",
    customerEmail: "juan.perez@example.com",
    requestDate: "2024-06-23",
    amount: 50.0,
    reason: "Desacuerdo con la calidad del postre.",
    status: "COMPLETED",
    refundType: "PARTIAL",
    paymentMethod: "Debit Card",
    notes:
      "Se acordó un reembolso parcial del 10% por postre. Cliente satisfecho.",
    history: [
      {
        date: "2024-06-23",
        action: "Solicitud de reembolso creada",
        user: "Customer",
      },
      {
        date: "2024-06-23",
        action: "Estado cambiado a APROBADO",
        user: "Admin Miguel",
      },
      {
        date: "2024-06-23",
        action: "Marcado como COMPLETADO",
        user: "Admin Miguel",
      },
    ],
  },
  {
    id: "REF003",
    orderId: "ORD005",
    customerName: "Pedro Ramirez",
    customerEmail: "pedro.ramirez@example.com",
    requestDate: "2024-06-20",
    amount: 300.0,
    reason: "Cambio de planes, ya no necesitan el servicio.",
    status: "REJECTED",
    refundType: "FULL",
    paymentMethod: "Bank Transfer",
    notes:
      "Solicitud rechazada. La cancelación se realizó fuera del plazo de 7 días según política.",
    history: [
      {
        date: "2024-06-20",
        action: "Solicitud de reembolso creada",
        user: "Customer",
      },
      {
        date: "2024-06-21",
        action: "Estado cambiado a RECHAZADO",
        user: "Admin Luisa",
      },
    ],
  },
  {
    id: "REF004",
    orderId: "ORD006",
    customerName: "Laura Sanchez",
    customerEmail: "laura.sanchez@example.com",
    requestDate: "2024-06-25",
    amount: 800.0,
    reason: "Error en la cantidad de invitados.",
    status: "PROCESSING",
    refundType: "PARTIAL",
    paymentMethod: "PayPal",
    notes: "Reembolso en proceso de aprobación por el departamento financiero.",
    history: [
      {
        date: "2024-06-25",
        action: "Solicitud de reembolso creada",
        user: "Customer",
      },
      {
        date: "2024-06-25",
        action: "Estado cambiado a PROCESANDO",
        user: "Admin Carlos",
      },
    ],
  },
];

// Use a mutable copy for operations within the mock API
let currentMockRefunds = JSON.parse(JSON.stringify(initialMockRefunds));

// --- 2. Mock API (formerly lib/mockApi.js) ---
const mockApi = {
  // Simulate network delay
  delay: (ms) => new Promise((res) => setTimeout(res, ms)),

  getRefunds: async (params) => {
    await mockApi.delay(500); // Simulate network latency

    let filteredRefunds = JSON.parse(JSON.stringify(currentMockRefunds)); // Deep copy

    if (params.status) {
      filteredRefunds = filteredRefunds.filter(
        (refund) => refund.status === params.status
      );
    }
    if (params.search) {
      const searchTermLower = params.search.toLowerCase();
      filteredRefunds = filteredRefunds.filter(
        (refund) =>
          refund.id.toLowerCase().includes(searchTermLower) ||
          refund.customerName.toLowerCase().includes(searchTermLower) ||
          refund.reason.toLowerCase().includes(searchTermLower)
      );
    }
    return filteredRefunds;
  },

  getRefundById: async (id) => {
    await mockApi.delay(300);
    const refund = currentMockRefunds.find((r) => r.id === id);
    return refund ? JSON.parse(JSON.stringify(refund)) : null;
  },

  updateRefund: async (id, updatedFields) => {
    await mockApi.delay(700); // Simulate update latency
    const index = currentMockRefunds.findIndex((r) => r.id === id);
    if (index > -1) {
      const oldRefund = currentMockRefunds[index];
      const newHistoryEntries = [];

      // Add history for status change
      if (updatedFields.status && updatedFields.status !== oldRefund.status) {
        newHistoryEntries.push({
          date: new Date().toISOString().split("T")[0],
          action: `Estado cambiado a ${updatedFields.status.replace(
            /_/g,
            " "
          )}`,
          user: "Admin (Simulado)",
        });
      }

      // Add history for notes change
      if (
        updatedFields.notes !== undefined &&
        updatedFields.notes !== oldRefund.notes
      ) {
        let notesAction = "";
        if (
          oldRefund.notes === undefined ||
          oldRefund.notes === null ||
          oldRefund.notes.trim() === ""
        ) {
          notesAction = "Notas añadidas";
        } else {
          notesAction = "Notas actualizadas";
        }
        newHistoryEntries.push({
          date: new Date().toISOString().split("T")[0],
          action: notesAction,
          user: "Admin (Simulado)",
        });
      }

      currentMockRefunds[index] = {
        ...oldRefund,
        ...updatedFields,
        history: [...(oldRefund.history || []), ...newHistoryEntries], // Append new entries
      };
      return JSON.parse(JSON.stringify(currentMockRefunds[index]));
    }
    throw new Error("Refund not found in mock data");
  },
};

// --- Helper component for status badges (can be moved to components/StatusBadge.jsx) ---
const StatusBadge = ({ status }) => {
  const statusColors = {
    PENDING_REVIEW: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-blue-100 text-blue-800",
    REJECTED: "bg-red-100 text-red-800",
    PROCESSING: "bg-indigo-100 text-indigo-800",
    COMPLETED: "bg-green-100 text-green-800",
  };
  const colorClass = statusColors[status] || "bg-gray-100 text-gray-800";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      {status.replace(/_/g, " ")} {/* Replace underscores for display */}
    </span>
  );
};

// Define refund statuses as expected by your (mock) backend
const REFUND_STATUSES = [
  "PENDING_REVIEW",
  "APPROVED",
  "REJECTED",
  "PROCESSING",
  "COMPLETED",
];

// --- 3. Refunds Page Component (formerly app/refunds/page.jsx) ---
const RefundsPage = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [currentRefund, setCurrentRefund] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  // Filtering states
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRefunds();
  }, [filterStatus, searchTerm]); // Depend on filters for re-fetch

  const fetchRefunds = async () => {
    try {
      setLoading(true);
      // Use mockApi to simulate fetching data
      const data = await mockApi.getRefunds({
        status: filterStatus,
        search: searchTerm,
      });
      setRefunds(data);
      setLoading(false);
    } catch (err) {
      setError("Error al cargar los reembolsos (simulado).");
      setLoading(false);
      console.error("Error fetching refunds (mock):", err.message);
    }
  };

  const handleOpenDetailDialog = (refund) => {
    setCurrentRefund(refund);
    setNewStatus(refund.status); // Set current status as default for editing
    setAdminNotes(refund.notes || ""); // Assuming 'notes' field in your refund object
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setCurrentRefund(null);
    setNewStatus("");
    setAdminNotes("");
  };

  const handleUpdateRefundStatus = async () => {
    if (!currentRefund) return;

    try {
      // Use mockApi to simulate updating data
      await mockApi.updateRefund(currentRefund.id, {
        status: newStatus,
        notes: adminNotes,
      });
      alert("Estado de reembolso actualizado exitosamente (simulado)!");
      fetchRefunds(); // Refresh list to reflect changes from mockApi
      handleCloseDetailDialog();
    } catch (err) {
      console.error("Error updating refund (mock):", err.message);
      alert(`Error al actualizar el reembolso (simulado): ${err.message}`);
    }
  };

  const exportToExcel = () => {
    const dataToExport = refunds.map((refund) => ({
      "ID Reembolso": refund.id,
      "ID Pedido": refund.orderId,
      Cliente: refund.customerName,
      "Fecha Solicitud": refund.requestDate,
      Monto: refund.amount,
      Razón: refund.reason,
      Estado: refund.status.replace(/_/g, " "),
      "Notas Admin": refund.notes || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reembolsos");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "reembolsos_gourmet.xlsx");
  };

  const exportToPdf = () => {
    const doc = new jsPDF();
    doc.text("Lista de Reembolsos - Gourmet Catering", 14, 15);

    const tableColumn = [
      "ID Reembolso",
      "ID Pedido",
      "Cliente",
      "Fecha Solicitud",
      "Monto",
      "Razón",
      "Estado",
    ];
    const tableRows = [];

    refunds.forEach((refund) => {
      const refundData = [
        refund.id,
        refund.orderId,
        refund.customerName,
        refund.requestDate,
        `$${refund.amount.toFixed(2)}`,
        refund.reason,
        refund.status.replace(/_/g, " "),
      ];
      tableRows.push(refundData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 8, cellPadding: 2, overflow: "linebreak" },
      headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      columnStyles: {
        0: { cellWidth: 20 }, // ID Reembolso
        1: { cellWidth: 20 }, // ID Pedido
        2: { cellWidth: 30 }, // Cliente
        3: { cellWidth: 25 }, // Fecha Solicitud
        4: { cellWidth: 20 }, // Monto
        5: { cellWidth: 50 }, // Razón
        6: { cellWidth: 25 }, // Estado
      },
    });
    doc.save("reembolsos_gourmet.pdf");
  };

  if (loading)
    return (
      <Box className="p-6 flex justify-center items-center min-h-screen bg-gray-50">
        <CircularProgress />
        <Typography variant="h6" className="ml-4 text-gray-700">
          Cargando reembolsos...
        </Typography>
      </Box>
    );
  if (error)
    return (
      <Typography
        variant="h6"
        color="error"
        className="p-4 text-red-600 bg-red-50 border border-red-200 rounded"
      >
        {error}
      </Typography>
    );

  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      <Typography variant="h4" className="mb-6 font-bold text-gray-800">
        Gestión de Reembolsos
      </Typography>

      <Box
        sx={{ mb: 4, display: "flex", gap: 2, alignItems: "center" }}
        className="flex-wrap"
      >
        <TextField
          label="Buscar Reembolso (ID, Cliente, Razón)"
          variant="outlined"
          size="small"
          className="flex-1 bg-white min-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl variant="outlined" size="small" className="w-48 bg-white">
          <InputLabel id="status-filter-label">Filtrar por Estado</InputLabel>
          <Select
            labelId="status-filter-label"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            label="Filtrar por Estado"
          >
            <MenuItem value="">Todos</MenuItem>
            {REFUND_STATUSES.map((status) => (
              <MenuItem key={status} value={status}>
                {status.replace(/_/g, " ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<DescriptionIcon />}
          onClick={exportToExcel}
          color="success"
          className="min-w-[150px]"
        >
          Exportar a Excel
        </Button>
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={exportToPdf}
          color="error"
          className="min-w-[150px]"
        >
          Exportar a PDF
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        className="shadow-lg rounded-lg overflow-hidden"
      >
        <Table className="min-w-full">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-semibold text-gray-700">
                ID Reembolso
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                ID Pedido
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Cliente
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Fecha Solicitud
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Monto
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Razón
              </TableCell>
              <TableCell className="font-semibold text-gray-700">
                Estado
              </TableCell>
              <TableCell align="right" className="font-semibold text-gray-700">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {refunds.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No hay reembolsos para mostrar.
                </TableCell>
              </TableRow>
            ) : (
              refunds.map((refund) => (
                <TableRow key={refund.id} className="hover:bg-gray-50">
                  <TableCell className="text-gray-700">{refund.id}</TableCell>
                  <TableCell className="text-blue-600 hover:underline cursor-pointer">
                    {/* In a real app, link this to your Order Details page */}
                    {refund.orderId}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {refund.customerName}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {refund.requestDate}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    ${refund.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-gray-700 max-w-xs truncate">
                    {refund.reason}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={refund.status} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDetailDialog(refund)}
                      aria-label="view refund details"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenDetailDialog(refund)}
                      aria-label="edit refund"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Refund Detail/Edit Dialog */}
      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="text-xl font-semibold text-gray-800 bg-gray-50">
          Detalles del Reembolso: {currentRefund?.id}
        </DialogTitle>
        <DialogContent dividers className="p-6">
          {currentRefund && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Typography variant="h6" className="text-lg font-medium mb-2">
                  Información del Reembolso
                </Typography>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>ID Reembolso:</strong> {currentRefund.id}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Fecha Solicitud:</strong> {currentRefund.requestDate}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Monto:</strong> ${currentRefund.amount?.toFixed(2)}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Estado:</strong>{" "}
                  <StatusBadge status={currentRefund.status} />
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Tipo de Reembolso:</strong>{" "}
                  {currentRefund.refundType || "N/A"}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Método de Pago Original:</strong>{" "}
                  {currentRefund.paymentMethod || "N/A"}
                </p>
              </div>
              <div>
                <Typography variant="h6" className="text-lg font-medium mb-2">
                  Información del Pedido
                </Typography>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>ID Pedido:</strong>
                  {/* Link to order details page if you have one */}
                  {currentRefund.orderId}
                </p>
              </div>
            </div>
          )}

          {currentRefund && (
            <div className="mb-6">
              <Typography variant="h6" className="text-lg font-medium mb-2">
                Información del Cliente
              </Typography>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Nombre:</strong> {currentRefund.customerName}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Email:</strong> {currentRefund.customerEmail}
              </p>
            </div>
          )}

          {currentRefund && (
            <div className="mb-6">
              <Typography variant="h6" className="text-lg font-medium mb-2">
                Razón del Reembolso
              </Typography>
              <TextField
                label="Razón del Cliente"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={currentRefund.reason || ""}
                InputProps={{ readOnly: true }}
                className="mb-4"
              />
              <TextField
                label="Notas del Administrador"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Añada notas internas sobre el proceso de reembolso..."
              />
            </div>
          )}

          <div className="mb-6">
            <Typography variant="h6" className="text-lg font-medium mb-2">
              Actualizar Estado
            </Typography>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="refund-status-label">Estado</InputLabel>
              <Select
                labelId="refund-status-label"
                id="refund-status-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                label="Estado"
              >
                {REFUND_STATUSES.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status.replace(/_/g, " ")}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {currentRefund?.history && currentRefund.history.length > 0 && (
            <div>
              <Typography variant="h6" className="text-lg font-medium mb-2">
                Historial de Acciones
              </Typography>
              <TableContainer
                component={Paper}
                elevation={0}
                className="border border-gray-200"
              >
                <Table size="small">
                  <TableHead className="bg-gray-50">
                    <TableRow>
                      <TableCell className="font-semibold text-gray-700">
                        Fecha
                      </TableCell>
                      <TableCell className="font-semibold text-gray-700">
                        Acción
                      </TableCell>
                      <TableCell className="font-semibold text-gray-700">
                        Usuario
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentRefund.history.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-sm text-gray-700">
                          {entry.date}
                        </TableCell>
                        <TableCell className="text-sm text-gray-700">
                          {entry.action}
                        </TableCell>
                        <TableCell className="text-sm text-gray-700">
                          {entry.user}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-4 bg-gray-50 border-t border-gray-200">
          <Button
            onClick={handleCloseDetailDialog}
            variant="outlined"
            color="secondary"
          >
            Cerrar
          </Button>
          <Button
            onClick={handleUpdateRefundStatus}
            variant="contained"
            color="primary"
            // Disable if status or notes haven't changed to prevent unnecessary mock updates
            disabled={
              currentRefund?.status === newStatus &&
              adminNotes === (currentRefund.notes || "")
            }
          >
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RefundsPage;
