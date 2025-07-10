package app.catering.Validation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = MinDaysFromNowValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface MinDaysFromNow {
    String message() default "La fecha debe estar al menos {days} días en el futuro";
    int days(); // Número mínimo de días desde hoy
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}