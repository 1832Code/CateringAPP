package app.catering.Validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

/**
 * **Implementación del validador para la anotación
 * {@link app.catering.Validation.MinDaysFromNow}.**
 * <p>
 * Esta clase es responsable de la lógica de negocio para determinar si una
 * fecha
 * proporcionada ({@link java.time.LocalDate}) cumple con el requisito de estar
 * un número mínimo de días en el futuro, a partir de la fecha actual.
 * </p>
 * <p>
 * Se utiliza internamente por el sistema de validación de Jakarta Bean
 * Validation
 * (Hibernate Validator, por ejemplo) cuando se encuentra la anotación
 * {@code @MinDaysFromNow} en un campo {@code LocalDate}.
 * </p>
 *
 * @author Darwin (Asume el autor, ajusta si es necesario)
 * @version 1.0
 * @since 2023-01-15 (Asumida, ajusta si es necesario)
 * @see app.catering.Validation.MinDaysFromNow
 * @see jakarta.validation.ConstraintValidator
 * @see java.time.LocalDate
 */
public class MinDaysFromNowValidator implements ConstraintValidator<MinDaysFromNow, LocalDate> {

    /**
     * El número mínimo de días que la fecha debe estar en el futuro.
     * Este valor se inicializa desde el atributo {@code days()} de la anotación
     * {@link MinDaysFromNow}.
     */
    private int minDays;

    /**
     * Inicializa el validador con la instancia de la anotación de restricción.
     * <p>
     * Este método es invocado una sola vez por el framework de validación
     * antes de que se realicen las validaciones. Aquí se extrae el valor
     * del atributo {@code days} de la anotación para usarlo en la lógica
     * de validación.
     * </p>
     *
     * @param constraintAnnotation La instancia de la anotación
     *                             {@link MinDaysFromNow}
     *                             que está siendo validada.
     */
    @Override
    public void initialize(MinDaysFromNow constraintAnnotation) {
        this.minDays = constraintAnnotation.days();
    }

    /**
     * Implementa la lógica de validación para determinar si la {@code value} de la
     * fecha
     * está al menos {@code minDays} días en el futuro con respecto a la fecha
     * actual.
     * <p>
     * Si el valor de la fecha es {@code null}, la validación se considera exitosa.
     * Se espera que las validaciones de nulidad se manejen con anotaciones como
     * {@code @NotNull}
     * si el campo es obligatorio.
     * </p>
     * <p>
     * La comparación se realiza calculando una fecha mínima aceptable
     * ({@code LocalDate.now().plusDays(minDays)}). La fecha proporcionada
     * se considera válida si es estrictamente posterior a
     * {@code (fechaMinima - 1 día)}.
     * Esto asegura que "al menos N días en el futuro" incluya el N-ésimo día
     * completo.
     * </p>
     *
     * @param value   El objeto {@link java.time.LocalDate} que se va a validar.
     * @param context Contexto de la validación, que puede usarse para personalizar
     *                mensajes de error o para acceder a otras funcionalidades del
     *                validador.
     * @return {@code true} si la fecha es válida según la regla {@code minDays},
     *         {@code false} en caso contrario.
     */
    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        // Si el valor es nulo, no realizamos la validación.
        // Se asume que @NotNull se usará si el campo es obligatorio.
        if (value == null) {
            return true;
        }

        // Calcula la fecha mínima que es 'minDays' días después de hoy.
        // Ejemplo: Si hoy es 2025-07-09 y minDays es 3, fechaMinima sería 2025-07-12.
        LocalDate fechaMinima = LocalDate.now().plusDays(minDays);

        // La validación se cumple si 'value' es después de 'fechaMinima.minusDays(1)'.
        // Esto significa que 'value' debe ser la misma fecha que 'fechaMinima' o
        // posterior.
        // Ejemplo: Si fechaMinima es 2025-07-12:
        // - value 2025-07-11 NO es after 2025-07-11 (false)
        // - value 2025-07-12 ES after 2025-07-11 (true)
        // - value 2025-07-13 ES after 2025-07-11 (true)
        return value.isAfter(fechaMinima.minusDays(1));
    }
}