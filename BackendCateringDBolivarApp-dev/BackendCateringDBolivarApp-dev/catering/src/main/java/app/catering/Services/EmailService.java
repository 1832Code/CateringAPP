package app.catering.Services;

import app.catering.Entity.Pedido.Pedido;
import app.catering.Generators.PdfGenerator;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void enviarCorreoConPDF(Pedido pedido) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(pedido.getUsuario().getEmail());
        helper.setSubject("Reserva confirmada - Catering");
        helper.setText("Hola " + pedido.getUsuario().getNombres() +
                ",\n\nAdjuntamos el comprobante de tu reserva.\n\n¡Gracias por elegirnos!");

        byte[] pdf = PdfGenerator.generarResumenReserva(pedido);
        String fileName = "reserva_" + pedido.getId() + ".pdf";
        helper.addAttachment(fileName, new ByteArrayResource(pdf));

        mailSender.send(message);
    }
}
