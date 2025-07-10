package app.catering.Validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

/**
 * **Anotación de validación personalizada para asegurar que una fecha esté un
 * número mínimo de días en el futuro.**
 * <p>
 * Esta anotación se utiliza en campos de tipo {@code LocalDate} (o tipos de
 * fecha similares)
 * para validar que la fecha especificada sea al menos {@code N} días después de
 * la fecha actual.
 * Es útil para asegurar que las fechas de eventos, reservas o pedidos no sean
 * en el pasado
 * o demasiado pronto en el futuro, dando un margen de tiempo adecuado.
 * </p>
 * <p>
 * Se aplica a campos ({@link ElementType#FIELD}) y su validación es manejada
 * por
 * {@link app.catering.Validation.MinDaysFromNowValidator}.
 * </p>
 *
 * @author Darwin (Asume el autor, ajusta si es necesario)
 * @version 1.0
 * @since 2023-01-15 (Asumida, ajusta si es necesario)
 * @see app.catering.Validation.MinDaysFromNowValidator
 * @see jakarta.validation.Constraint
 * @see jakarta.validation.Payload
 */
@Documented
@Constraint(validatedBy = MinDaysFromNowValidator.class)
@Target({ ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface MinDaysFromNow {

    /**
     * Mensaje de error por defecto que se mostrará si la validación falla.
     * <p>
     * Se puede personalizar al aplicar la anotación. El placeholder `{days}`
     * será reemplazado por el valor especificado en el atributo {@link #days()}.
     * </p>
     *
     * @return El mensaje de error por defecto.
     */
    String message() default "La fecha debe estar al menos {days} días en el futuro";

    /**
     * Define el número mínimo de días que la fecha debe estar en el futuro
     * con respecto a la fecha actual.
     * <p>
     * Por ejemplo, si {@code days = 3}, la fecha debe ser al menos 3 días después
     * de hoy.
     * </p>
     *
     * @return El número mínimo de días requerido.
     */
    int days(); // Número mínimo de días desde hoy

    /**
     * Permite especificar grupos de validación a los que pertenece esta
     * restricción.
     * <p>
     * Utilizado para aplicar validaciones diferentes en distintos escenarios (e.g.,
     * creación vs. actualización).
     * </p>
     *
     * @return Un array de clases que representan los grupos de validación. Por
     *         defecto, vacío.
     */
    Class<?>[] groups() default {};

    /**
     * Permite especificar información de payload para la restricción.
     * <p>
     * Utilizado para asociar metadatos personalizados a la restricción.
     * </p>
     *
     * @return Un array de clases que extienden {@link jakarta.validation.Payload}.
     *         Por defecto, vacío.
     */
    Class<? extends Payload>[] payload() default {};
}