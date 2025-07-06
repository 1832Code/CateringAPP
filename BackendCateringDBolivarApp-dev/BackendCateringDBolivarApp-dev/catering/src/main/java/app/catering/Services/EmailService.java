package app.catering.Services;

import app.catering.Entity.Pedido.Pedido;
import app.catering.Entity.User.Usuario;
import app.catering.Generators.PdfGenerator;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.url.base}")
    private String appBaseUrl;

    @Value("${app.mail.from.address}")
    private String fromAddress;

    @Value("${app.mail.from.name}")
    private String fromName;

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

    public void sendVerificationEmail(Usuario usuario) {
        String subject = "Confirma tu cuenta en Catering";
        String senderName = "Catering";
        String verifyUrl = appBaseUrl + "/verify?code=" + usuario.getVerificationCode();

        String content = """
            <p>Hola <strong>%s %s</strong>,</p>
            <p>Gracias por registrarte. Para activar tu cuenta, por favor haz clic en el siguiente enlace:</p>
            <p><a href="%s" target="_blank">Confirmar mi cuenta</a></p>
            <br>
            <p>Si no fuiste tú, puedes ignorar este mensaje.</p>
            """.formatted(usuario.getNombres(), usuario.getApellidos(), verifyUrl);

        sendHtmlEmail(usuario.getEmail(), subject, content);
    }
    public void sendHtmlEmail(String to, String subject, String htmlContent) {
        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            helper.setFrom(fromAddress, fromName);
            mailSender.send(message);
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException("Error al enviar correo: " + e.getMessage(), e);
        }
    }
}
