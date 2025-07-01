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
import java.io.IOException; // Import IOException
import java.io.InputStream; // Import InputStream
import org.springframework.stereotype.Service;

@Service
public class PdfGeneratorService {

    // Remove this line: private static final String LOGO_PATH =
    // "src/main/resources/static/logo.svg";

    public byte[] generatePedidoPDF(PedidoDTO pedido, String tipoDocumento) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {

            PdfDocument pdfDoc = new PdfDocument(new PdfWriter(baos));
            Document document = new Document(pdfDoc, PageSize.A4);

            // --- CORRECT WAY TO LOAD LOGO FROM CLASSPATH ---
            try (InputStream logoStream = getClass().getClassLoader().getResourceAsStream("static/logo.svg")) {
                if (logoStream == null) {
                    throw new IOException(
                            "Logo file not found in classpath: static/logo.svg. Make sure it's in src/main/resources/static/");
                }
                Image logo = new Image(ImageDataFactory.create(logoStream.readAllBytes()));
                logo.scaleToFit(120, 60);
                document.add(logo);
            } catch (IOException e) {
                System.err.println("Error loading logo for PDF: " + e.getMessage());
                // Optionally, add a placeholder text or skip the logo if it's not critical
                // For now, let's rethrow to keep the PDF generation error consistent.
                throw new RuntimeException("Failed to load logo for PDF generation.", e);
            }
            // --- END OF LOGO LOADING ---

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

            // Datos cliente
            document.add(new Paragraph("DATOS DEL CLIENTE")
                    .setFontSize(12)
                    .setBold());
            document.add(new Paragraph(
                    "RUC: " + pedido.getUsuario().getRuc() + "\n" +
                            "Denominación: " + pedido.getUsuario().getNombre() + "\n" +
                            "Dirección: " + pedido.getUsuario().getDireccion())
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

            if (pedido.getDetalle() != null) { // Add a null check for safety
                pedido.getDetalle().forEach(det -> {
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(det.getCantidad()))));
                    table.addCell(new Cell().add(new Paragraph(det.getUnidad())));
                    table.addCell(new Cell().add(new Paragraph(det.getCodigo())));
                    table.addCell(new Cell().add(new Paragraph(det.getDescripcion())));
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(det.getValorUnitario()))));
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(det.getPrecioUnitario()))));
                    table.addCell(new Cell().add(new Paragraph(String.valueOf(det.getImporte()))));
                });
            }

            document.add(table);

            document.add(new Paragraph("\n"));
            document.add(new Paragraph("Gravada: S/ " + pedido.getSubtotal()));
            document.add(new Paragraph("IGV 18%: S/ " + pedido.getIgv()));
            document.add(new Paragraph("Total: S/ " + pedido.getTotal()));

            document.close();

            return baos.toByteArray();

        } catch (Exception e) {
            e.printStackTrace(); // Keep this for debugging on the server console
            throw new RuntimeException("Error generating PDF: " + e.getMessage(), e);
        }
    }
}