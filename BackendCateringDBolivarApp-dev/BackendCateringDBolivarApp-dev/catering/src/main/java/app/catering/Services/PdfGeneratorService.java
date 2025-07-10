package app.catering.Services;

import app.catering.DTO.PedidoDTO;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class PdfGeneratorService {

    public byte[] generatePedidoPDF(PedidoDTO pedido, String tipoDocumento) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(baos));
            Document document = new Document(pdfDoc, PageSize.A4);

            // --- MEJORADO: Logo opcional ---
            try (InputStream logoStream = getClass().getClassLoader().getResourceAsStream("static/logo.png")) {
                if (logoStream != null) {
                    Image logo = new Image(ImageDataFactory.create(logoStream.readAllBytes()));
                    logo.scaleToFit(120, 60);
                    document.add(logo);
                } else {
                    // Si no hay logo, agregar un título como alternativa
                    Paragraph companyTitle = new Paragraph("Catering Gourmet DBolivar")
                            .setFontSize(18)
                            .setBold()
                            .setTextAlignment(TextAlignment.CENTER);
                    document.add(companyTitle);
                }
            } catch (Exception e) {
                // Si hay error con el logo, continuar sin él
                System.err.println("Warning: Could not load logo for PDF: " + e.getMessage());
                Paragraph companyTitle = new Paragraph("Catering Gourmet DBolivar")
                        .setFontSize(18)
                        .setBold()
                        .setTextAlignment(TextAlignment.CENTER);
                document.add(companyTitle);
            }
            // --- FIN DEL LOGO OPCIONAL ---

            // Título
            Paragraph title = new Paragraph(tipoDocumento.equalsIgnoreCase("FACTURA")
                    ? "FACTURA ELECTRÓNICA"
                    : "BOLETA ELECTRÓNICA")
                    .setFontSize(16)
                    .setBold()
                    .setTextAlignment(TextAlignment.RIGHT);
            document.add(title);

            // Datos empresa
            document.add(new Paragraph(
                    "Catering Gourmet DBolivar\n" +
                            "RUC: 823742948283234\n" +
                            "Av. Peru Nro. 834 - Lima\n" +
                            "Tel.: 902484383\n" +
                            "Email: catering202501g@gmail.com")
                    .setFontSize(10)
                    .setMarginBottom(10));

            // Datos cliente - con validación de null
            document.add(new Paragraph("DATOS DEL CLIENTE")
                    .setFontSize(12)
                    .setBold());

            String dni = pedido.getUsuario() != null ? pedido.getUsuario().getDni() : "N/A";
            String nombre = pedido.getUsuario() != null ? pedido.getUsuario().getNombres() : "N/A";
            String email = pedido.getUsuario() != null ? pedido.getUsuario().getEmail() : "N/A";

            document.add(new Paragraph(
                    "DNI: " + dni + "\n" +
                            "Denominación: " + nombre + "\n" +
                            "Correo Electrónico: " + email)
                    .setFontSize(10));

            // Tabla de detalles
            Table table = new Table(new float[] { 1, 2, 2, 4, 2, 2, 2 });
            table.setWidth(UnitValue.createPercentValue(100));
            table.addHeaderCell(new Cell().add(new Paragraph("Cant.")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("UM")));
            table.addHeaderCell(new Cell().add(new Paragraph("Código")));
            table.addHeaderCell(new Cell().add(new Paragraph("Descripción")));
            table.addHeaderCell(new Cell().add(new Paragraph("V/U")));
            table.addHeaderCell(new Cell().add(new Paragraph("P/U")));
            table.addHeaderCell(new Cell().add(new Paragraph("Importe")));

            if (pedido.getDetalle() != null && !pedido.getDetalle().isEmpty()) {
                pedido.getDetalle().forEach(det -> {
                    if (det != null) {
                        table.addCell(new Cell().add(new Paragraph(String.valueOf(det.getCantidad() != null ? det.getCantidad() : 0))));
                        table.addCell(new Cell().add(new Paragraph(det.getUnidad() != null ? det.getUnidad() : "")));
                        table.addCell(new Cell().add(new Paragraph(det.getCodigo() != null ? det.getCodigo() : "")));
                        table.addCell(new Cell().add(new Paragraph(det.getDescripcion() != null ? det.getDescripcion() : "")));
                        table.addCell(new Cell().add(new Paragraph(String.valueOf(det.getValorUnitario() != null ? det.getValorUnitario() : 0))));
                        table.addCell(new Cell().add(new Paragraph(String.valueOf(det.getPrecioUnitario() != null ? det.getPrecioUnitario() : 0))));
                        table.addCell(new Cell().add(new Paragraph(String.valueOf(det.getImporte() != null ? det.getImporte() : 0))));
                    }
                });
            } else {
                // Si no hay detalles, agregar una fila vacía
                for (int i = 0; i < 7; i++) {
                    table.addCell(new Cell().add(new Paragraph("")));
                }
            }

            document.add(table);

            document.add(new Paragraph("\n"));
            document.add(new Paragraph("Gravada: S/ " + (pedido.getSubtotal() != null ? pedido.getSubtotal() : 0)));
            document.add(new Paragraph("IGV 18%: S/ " + (pedido.getIgv() != null ? pedido.getIgv() : 0)));
            document.add(new Paragraph("Total: S/ " + (pedido.getTotal() != null ? pedido.getTotal() : 0)));

            document.close();

            return baos.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error generating PDF: " + e.getMessage(), e);
        }
    }

    public byte[] generatePedidosReport(List<PedidoDTO> pedidos) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(baos));
            Document document = new Document(pdfDoc, PageSize.A4);

            // Título
            Paragraph title = new Paragraph("REPORTE DE PEDIDOS")
                    .setFontSize(18)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(title);

            // Tabla de pedidos
            Table table = new Table(new float[] { 1, 3, 2, 2, 2, 2 });
            table.setWidth(UnitValue.createPercentValue(100));
            table.addHeaderCell(new Cell().add(new Paragraph("ID")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Cliente")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Tipo Evento")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Fecha")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Estado")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Precio")).setBackgroundColor(ColorConstants.LIGHT_GRAY));

            for (PedidoDTO pedido : pedidos) {
                table.addCell(new Cell().add(new Paragraph(String.valueOf(pedido.getId()))));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getUsuario() != null ?
                                pedido.getUsuario().getNombres() + " " + pedido.getUsuario().getApellidos() :
                                "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getDatosEvento() != null ? pedido.getDatosEvento().getTipoEvento() : "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getDatosEvento() != null ? pedido.getDatosEvento().getFechaEvento() : "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(pedido.getEstado() != null ? pedido.getEstado() : "N/A")));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getInfoMenu() != null ? String.valueOf(pedido.getInfoMenu().getPrecio()) : "N/A"
                )));
            }

            document.add(table);
            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating pedidos report: " + e.getMessage(), e);
        }
    }

    public byte[] generateVentasReport(List<PedidoDTO> pedidos) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(baos));
            Document document = new Document(pdfDoc, PageSize.A4);

            // Título
            Paragraph title = new Paragraph("REPORTE DE VENTAS")
                    .setFontSize(18)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(title);

            // Resumen
            double totalVentas = pedidos.stream()
                    .mapToDouble(p -> p.getInfoMenu() != null ? p.getInfoMenu().getPrecio() : 0.0)
                    .sum();

            document.add(new Paragraph("Total de Ventas: S/. " + String.format("%.2f", totalVentas))
                    .setFontSize(14)
                    .setBold());

            // Tabla de ventas
            Table table = new Table(new float[] { 1, 3, 2, 2, 2 });
            table.setWidth(UnitValue.createPercentValue(100));
            table.addHeaderCell(new Cell().add(new Paragraph("ID")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Cliente")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Servicio")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Fecha")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Monto")).setBackgroundColor(ColorConstants.LIGHT_GRAY));

            for (PedidoDTO pedido : pedidos) {
                table.addCell(new Cell().add(new Paragraph(String.valueOf(pedido.getId()))));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getUsuario() != null ?
                                pedido.getUsuario().getNombres() + " " + pedido.getUsuario().getApellidos() :
                                "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getInfoMenu() != null ? pedido.getInfoMenu().getTitulo() : "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getDatosEvento() != null ? pedido.getDatosEvento().getFechaEvento() : "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getInfoMenu() != null ? String.valueOf(pedido.getInfoMenu().getPrecio()) : "N/A"
                )));
            }

            document.add(table);
            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating ventas report: " + e.getMessage(), e);
        }
    }

    public byte[] generateEventosReport(List<PedidoDTO> pedidos) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(baos));
            Document document = new Document(pdfDoc, PageSize.A4);

            // Título
            Paragraph title = new Paragraph("REPORTE DE EVENTOS")
                    .setFontSize(18)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(title);

            // Tabla de eventos
            Table table = new Table(new float[] { 1, 3, 2, 2, 2, 2 });
            table.setWidth(UnitValue.createPercentValue(100));
            table.addHeaderCell(new Cell().add(new Paragraph("ID")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Cliente")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Tipo")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Fecha")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Distrito")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Horas")).setBackgroundColor(ColorConstants.LIGHT_GRAY));

            for (PedidoDTO pedido : pedidos) {
                table.addCell(new Cell().add(new Paragraph(String.valueOf(pedido.getId()))));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getUsuario() != null ?
                                pedido.getUsuario().getNombres() + " " + pedido.getUsuario().getApellidos() :
                                "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getDatosEvento() != null ? pedido.getDatosEvento().getTipoEvento() : "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getDatosEvento() != null ? pedido.getDatosEvento().getFechaEvento() : "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getDatosEvento() != null ? pedido.getDatosEvento().getDistrito() : "N/A"
                )));
                table.addCell(new Cell().add(new Paragraph(
                        pedido.getDatosEvento() != null ? String.valueOf(pedido.getDatosEvento().getCantHoras()) : "N/A"
                )));
            }

            document.add(table);
            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating eventos report: " + e.getMessage(), e);
        }
    }

    public byte[] generateClientesReport(List<PedidoDTO> pedidos) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(baos));
            Document document = new Document(pdfDoc, PageSize.A4);

            // Título
            Paragraph title = new Paragraph("REPORTE DE CLIENTES")
                    .setFontSize(18)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER);
            document.add(title);

            // Tabla de clientes
            Table table = new Table(new float[] { 1, 3, 2, 2, 2 });
            table.setWidth(UnitValue.createPercentValue(100));
            table.addHeaderCell(new Cell().add(new Paragraph("ID")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Cliente")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Email")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Teléfono")).setBackgroundColor(ColorConstants.LIGHT_GRAY));
            table.addHeaderCell(new Cell().add(new Paragraph("Pedidos")).setBackgroundColor(ColorConstants.LIGHT_GRAY));

            // Agrupar por cliente
            Map<Long, List<PedidoDTO>> pedidosPorCliente = pedidos.stream()
                    .filter(p -> p.getUsuario() != null)
                    .collect(java.util.stream.Collectors.groupingBy(p -> p.getUsuario().getId()));

            for (Map.Entry<Long, List<PedidoDTO>> entry : pedidosPorCliente.entrySet()) {
                PedidoDTO primerPedido = entry.getValue().get(0);
                table.addCell(new Cell().add(new Paragraph(String.valueOf(primerPedido.getUsuario().getId()))));
                table.addCell(new Cell().add(new Paragraph(
                        primerPedido.getUsuario().getNombres() + " " + primerPedido.getUsuario().getApellidos()
                )));
                table.addCell(new Cell().add(new Paragraph(primerPedido.getUsuario().getEmail())));
                table.addCell(new Cell().add(new Paragraph("N/A"))); // ClienteDTO no tiene teléfono
                table.addCell(new Cell().add(new Paragraph(String.valueOf(entry.getValue().size()))));
            }

            document.add(table);
            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating clientes report: " + e.getMessage(), e);
        }
    }
}