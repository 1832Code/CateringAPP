package main.gourmet.verification.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(String to, String code) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("systdevmr@gmail.com"); // Debe coincidir con spring.mail.username
            message.setTo(to);
            message.setSubject("Verificación de Cuenta");
            message.setText("Hola,\n\nGracias por registrarte. Tu código de verificación es: " + code
                    + "\n\nPor favor, ingresa este código en la aplicación para verificar tu cuenta.");
            mailSender.send(message);
            System.out.println("Correo de verificación enviado a: " + to);
        } catch (MailException e) {
            System.err.println("Error al enviar el correo de verificación a " + to + ": " + e.getMessage());
            // Aquí puedes loggear el error o manejarlo de otra manera
        }
    }
}