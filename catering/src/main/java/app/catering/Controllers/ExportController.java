package app.catering.Controllers;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import org.apache.http.HttpStatus;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

import app.catering.Apache.EstadoRequest;
import app.catering.DTO.PedidoDTO;
import app.catering.Services.PedidoService.InfoMenuService.PedidoService;
import app.catering.Services.UsuarioService;
import app.catering.Entity.User.Usuario;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    @Autowired
    private PedidoService pedidoService;

    @Autowired
    private UsuarioService usuarioService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/pedidos/excel")
    public void exportPedidosToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=pedidos.xlsx");

        List<PedidoDTO> pedidos = pedidoService.findAll();
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Pedidos");

        // Estilo encabezado
        CellStyle headerStyle = workbook.createCellStyle();
        org.apache.poi.ss.usermodel.Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        headerStyle.setFont(font);
        headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);

        String[] headers = {
                "ID", "UsuarioID", "Estado",
                "TipoEvento", "FechaEvento", "Distrito", "HoraInicio", "Direccion", "CantHoras",
                "MenuTitulo", "MenuDescripcion", "MenuPrecio", "MenuPersonas", "MenuTipo",
                "ServicioNombre", "ServicioDescripcion", "ServicioItems",
                "PersonalInfo", "ExtrasInfo"
        };

        Row header = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        int rowIdx = 1;
        for (PedidoDTO pedido : pedidos) {
            Row row = sheet.createRow(rowIdx++);
            int colIdx = 0;

            row.createCell(colIdx++).setCellValue(pedido.getId() != null ? pedido.getId() : 0);
            row.createCell(colIdx++).setCellValue(pedido.getUsuarioId() != null ? pedido.getUsuarioId() : 0);
            row.createCell(colIdx++).setCellValue(pedido.getEstado() != null ? pedido.getEstado() : "");

            if (pedido.getDatosEvento() != null) {
                row.createCell(colIdx++).setCellValue(
                        pedido.getDatosEvento().getTipoEvento() != null ? pedido.getDatosEvento().getTipoEvento() : "");
                row.createCell(colIdx++)
                        .setCellValue(pedido.getDatosEvento().getFechaEvento() != null
                                ? pedido.getDatosEvento().getFechaEvento().toString()
                                : "");
                row.createCell(colIdx++).setCellValue(
                        pedido.getDatosEvento().getDistrito() != null ? pedido.getDatosEvento().getDistrito() : "");
                row.createCell(colIdx++).setCellValue(
                        pedido.getDatosEvento().getHoraInicio() != null ? pedido.getDatosEvento().getHoraInicio() : "");
                row.createCell(colIdx++).setCellValue(
                        pedido.getDatosEvento().getDireccion() != null ? pedido.getDatosEvento().getDireccion() : "");
                row.createCell(colIdx++)
                        .setCellValue(pedido.getDatosEvento().getCantHoras() != null
                                ? pedido.getDatosEvento().getCantHoras().toString()
                                : "");
            } else {
                colIdx += 6;
            }

            if (pedido.getInfoMenu() != null) {
                row.createCell(colIdx++)
                        .setCellValue(pedido.getInfoMenu().getTitulo() != null ? pedido.getInfoMenu().getTitulo() : "");
                row.createCell(colIdx++).setCellValue(
                        pedido.getInfoMenu().getDescripcion() != null ? pedido.getInfoMenu().getDescripcion() : "");
                row.createCell(colIdx++)
                        .setCellValue(pedido.getInfoMenu().getPrecio() != null ? pedido.getInfoMenu().getPrecio() : 0);
                row.createCell(colIdx++).setCellValue(
                        pedido.getInfoMenu().getCantPersonas() != null ? pedido.getInfoMenu().getCantPersonas() : 0);
                row.createCell(colIdx++).setCellValue(
                        pedido.getInfoMenu().getTipoInfoMenu() != null ? pedido.getInfoMenu().getTipoInfoMenu() : "");

                if (pedido.getInfoMenu().getServicio() != null) {
                    row.createCell(colIdx++).setCellValue(pedido.getInfoMenu().getServicio().getTipoServicio() != null
                            ? pedido.getInfoMenu().getServicio().getTipoServicio().getNombre()
                            : "");
                    row.createCell(colIdx++).setCellValue(pedido.getInfoMenu().getServicio().getTipoServicio() != null
                            ? pedido.getInfoMenu().getServicio().getTipoServicio().getDescripcion()
                            : "");

                    StringBuilder items = new StringBuilder();
                    if (pedido.getInfoMenu().getServicio().getItems() != null) {
                        pedido.getInfoMenu().getServicio().getItems().forEach(item -> {
                            if (item.getItem() != null) {
                                items.append(item.getItem().getNombre())
                                        .append(" ($")
                                        .append(item.getItem().getPrecio())
                                        .append("), ");
                            }
                        });
                    }
                    row.createCell(colIdx++).setCellValue(items.toString());
                } else {
                    colIdx += 3;
                }

                StringBuilder personalInfo = new StringBuilder();
                if (pedido.getInfoMenu().getPersonal() != null &&
                        pedido.getInfoMenu().getPersonal().getPersonalInfo() != null) {
                    pedido.getInfoMenu().getPersonal().getPersonalInfo().forEach(pers -> {
                        personalInfo.append(pers.getTipoPersonal())
                                .append(" x ")
                                .append(pers.getCantidad())
                                .append(", ");
                    });
                }
                row.createCell(colIdx++).setCellValue(personalInfo.toString());

                StringBuilder extrasInfo = new StringBuilder();
                if (pedido.getInfoMenu().getExtra() != null &&
                        pedido.getInfoMenu().getExtra().getExtraInfo() != null) {
                    pedido.getInfoMenu().getExtra().getExtraInfo().forEach(ext -> {
                        extrasInfo.append(ext.getTipoExtra())
                                .append(" x ")
                                .append(ext.getCantidad())
                                .append(", ");
                    });
                }
                row.createCell(colIdx++).setCellValue(extrasInfo.toString());
            } else {
                colIdx += 9;
            }
        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }

    // Puedes usar iTextPDF o OpenPDF para generar PDF si también deseas PDF

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/pedidos/pdf")
    public void exportPedidosToPDF(HttpServletResponse response) throws IOException, DocumentException {
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=pedidos.pdf");

        List<PedidoDTO> pedidos = pedidoService.findAll();

        Document document = new Document(PageSize.A4.rotate());
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20, java.awt.Color.BLUE);
        Paragraph title = new Paragraph("Reporte Completo de Pedidos", titleFont);
        title.setAlignment(com.lowagie.text.Element.ALIGN_CENTER);
        title.setSpacingAfter(20);
        document.add(title);

        for (PedidoDTO pedido : pedidos) {
            Paragraph p = new Paragraph("Pedido #" + pedido.getId(),
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16, java.awt.Color.BLACK));
            p.setSpacingAfter(10);
            document.add(p);

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10);
            table.setSpacingAfter(20);

            table.addCell("UsuarioID");
            table.addCell(String.valueOf(pedido.getUsuarioId()));
            table.addCell("Estado");
            table.addCell(pedido.getEstado());

            if (pedido.getDatosEvento() != null) {
                table.addCell("TipoEvento");
                table.addCell(pedido.getDatosEvento().getTipoEvento());
                table.addCell("FechaEvento");
                table.addCell(pedido.getDatosEvento().getFechaEvento() != null
                        ? pedido.getDatosEvento().getFechaEvento().toString()
                        : "");
                table.addCell("Distrito");
                table.addCell(pedido.getDatosEvento().getDistrito());
                table.addCell("HoraInicio");
                table.addCell(pedido.getDatosEvento().getHoraInicio());
                table.addCell("Direccion");
                table.addCell(pedido.getDatosEvento().getDireccion());
                table.addCell("CantHoras");
                table.addCell(String.valueOf(pedido.getDatosEvento().getCantHoras()));
            }

            if (pedido.getInfoMenu() != null) {
                table.addCell("Menu Titulo");
                table.addCell(pedido.getInfoMenu().getTitulo());
                table.addCell("Menu Descripcion");
                table.addCell(pedido.getInfoMenu().getDescripcion());
                table.addCell("Menu Precio");
                table.addCell(String.valueOf(pedido.getInfoMenu().getPrecio()));
                table.addCell("Menu Personas");
                table.addCell(String.valueOf(pedido.getInfoMenu().getCantPersonas()));
                table.addCell("Menu Tipo");
                table.addCell(pedido.getInfoMenu().getTipoInfoMenu());

                if (pedido.getInfoMenu().getServicio() != null) {
                    table.addCell("Servicio Nombre");
                    table.addCell(pedido.getInfoMenu().getServicio().getTipoServicio() != null
                            ? pedido.getInfoMenu().getServicio().getTipoServicio().getNombre()
                            : "");
                    table.addCell("Servicio Descripcion");
                    table.addCell(pedido.getInfoMenu().getServicio().getTipoServicio() != null
                            ? pedido.getInfoMenu().getServicio().getTipoServicio().getDescripcion()
                            : "");

                    StringBuilder items = new StringBuilder();
                    if (pedido.getInfoMenu().getServicio().getItems() != null) {
                        pedido.getInfoMenu().getServicio().getItems().forEach(item -> {
                            if (item.getItem() != null) {
                                items.append(item.getItem().getNombre())
                                        .append(" ($")
                                        .append(item.getItem().getPrecio())
                                        .append("), ");
                            }
                        });
                    }
                    table.addCell("Items Servicio");
                    table.addCell(items.toString());
                }

                StringBuilder personalInfo = new StringBuilder();
                if (pedido.getInfoMenu().getPersonal() != null &&
                        pedido.getInfoMenu().getPersonal().getPersonalInfo() != null) {
                    pedido.getInfoMenu().getPersonal().getPersonalInfo().forEach(pers -> {
                        personalInfo.append(pers.getTipoPersonal())
                                .append(" x ")
                                .append(pers.getCantidad())
                                .append(", ");
                    });
                }
                table.addCell("Personal");
                table.addCell(personalInfo.toString());

                StringBuilder extrasInfo = new StringBuilder();
                if (pedido.getInfoMenu().getExtra() != null &&
                        pedido.getInfoMenu().getExtra().getExtraInfo() != null) {
                    pedido.getInfoMenu().getExtra().getExtraInfo().forEach(ext -> {
                        extrasInfo.append(ext.getTipoExtra())
                                .append(" x ")
                                .append(ext.getCantidad())
                                .append(", ");
                    });
                }
                table.addCell("Extras");
                table.addCell(extrasInfo.toString());
            }

            document.add(table);
            document.add(new Paragraph("------------------------------------------------------------"));
        }

        document.close();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/usuarios/excel")
    public void exportUsuariosToExcel(HttpServletResponse response) throws IOException {
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", "attachment; filename=usuarios.xlsx");

        List<Usuario> usuarios = usuarioService.obtenerTodos();
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Usuarios");

        // Estilo encabezado
        CellStyle headerStyle = workbook.createCellStyle();
        org.apache.poi.ss.usermodel.Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        headerStyle.setFont(font);
        headerStyle.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);

        String[] headers = {
            "ID", "DNI", "Nombres", "Apellidos", "Teléfono", "Email", "Roles", "Confirmado"
        };

        Row header = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = header.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        int rowIdx = 1;
        for (Usuario usuario : usuarios) {
            Row row = sheet.createRow(rowIdx++);
            int colIdx = 0;
            row.createCell(colIdx++).setCellValue(usuario.getId() != null ? usuario.getId() : 0);
            row.createCell(colIdx++).setCellValue(usuario.getDni() != null ? usuario.getDni() : "");
            row.createCell(colIdx++).setCellValue(usuario.getNombres() != null ? usuario.getNombres() : "");
            row.createCell(colIdx++).setCellValue(usuario.getApellidos() != null ? usuario.getApellidos() : "");
            row.createCell(colIdx++).setCellValue(usuario.getTelefono() != null ? usuario.getTelefono() : "");
            row.createCell(colIdx++).setCellValue(usuario.getEmail() != null ? usuario.getEmail() : "");
            // Roles como string separado por comas
            String roles = usuario.getRoles() != null ? usuario.getRoles().stream().map(r -> r.getName().name()).reduce((a, b) -> a + ", " + b).orElse("") : "";
            row.createCell(colIdx++).setCellValue(roles);
            row.createCell(colIdx++).setCellValue(usuario.isConfirmed() ? "Sí" : "No");
        }

        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        workbook.write(response.getOutputStream());
        workbook.close();
    }

    // 2. Actualizar estado del pedido (en backend)
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/pedidos/{id}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable Long id, @RequestBody EstadoRequest estadoRequest) {
        try {
            PedidoDTO pedido = pedidoService.findById(id);
            pedido.setEstado(estadoRequest.getEstado());
            PedidoDTO actualizado = pedidoService.update(id, pedido);
            return ResponseEntity.ok(actualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(404).body("Pedido no encontrado");
        }
    }

}