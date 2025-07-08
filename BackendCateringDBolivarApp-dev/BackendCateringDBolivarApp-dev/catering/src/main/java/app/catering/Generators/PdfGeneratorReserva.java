package app.catering.Generators;

import app.catering.Entity.Pedido.Pedido;
import com.lowagie.text.*;
import com.lowagie.text.Font;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.lowagie.text.pdf.draw.LineSeparator;


import java.awt.*;
import java.io.ByteArrayOutputStream;

public class PdfGeneratorReserva {

    public static byte[] generarResumenReserva(Pedido pedido) throws Exception {
        Rectangle smallPage = new Rectangle(400, 600); // ancho x alto en puntos (1pt = 1/72 pulgadas)
        Document document = new Document(smallPage, 36, 36, 36, 36);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, baos);
        document.open();

        // Fuentes
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
        Font fontSubtitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
        Font fontText = FontFactory.getFont(FontFactory.HELVETICA, 12);

        // Título
        Paragraph title = new Paragraph("Confirmación de Reserva", fontTitle);
        title.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph(" ")); // Espacio

        // Línea divisoria
        LineSeparator separator = new LineSeparator();
        separator.setLineColor(Color.GRAY);
        document.add(separator);
        document.add(new Paragraph(" "));

        // Tabla con los datos
        PdfPTable table = new PdfPTable(2);
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);
        table.setSpacingAfter(10f);
        table.setWidths(new int[]{1, 2});

        // Helper
        table.addCell(getCell("Cliente:", fontSubtitle));
        table.addCell(getCell(pedido.getUsuario().getNombres(), fontText));

        table.addCell(getCell("Correo:", fontSubtitle));
        table.addCell(getCell(pedido.getUsuario().getEmail(), fontText));

        table.addCell(getCell("Fecha del Evento:", fontSubtitle));
        table.addCell(getCell(pedido.getDatosEvento().getFechaEvento().toString(), fontText));

        table.addCell(getCell("Dirección:", fontSubtitle));
        table.addCell(getCell(pedido.getDatosEvento().getDireccion(), fontText));

        table.addCell(getCell("Tipo de Evento:", fontSubtitle));
        table.addCell(getCell(pedido.getDatosEvento().getTipoEvento(), fontText));

        table.addCell(getCell("Cantidad de Horas:", fontSubtitle));
        table.addCell(getCell(pedido.getDatosEvento().getCantHorasEvento() + "", fontText));

        table.addCell(getCell("Estado del Pedido:", fontSubtitle));
        table.addCell(getCell(pedido.getEstado(), fontText));

        document.add(table);

        document.add(new Paragraph(" "));

        // Mensaje final
        Paragraph thanks = new Paragraph("Gracias por confiar en nuestro servicio.\n\n— Equipo de Catering", fontText);
        thanks.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(thanks);

        document.close();
        return baos.toByteArray();
    }

    private static PdfPCell getCell(String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setPadding(5);
        return cell;
    }


}
