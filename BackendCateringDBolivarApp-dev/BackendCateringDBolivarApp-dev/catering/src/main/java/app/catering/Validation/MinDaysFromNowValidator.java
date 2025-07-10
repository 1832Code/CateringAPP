package app.catering.Validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;

public class MinDaysFromNowValidator implements ConstraintValidator<MinDaysFromNow, LocalDate> {

    private int minDays;

    @Override
    public void initialize(MinDaysFromNow constraintAnnotation) {
        this.minDays = constraintAnnotation.days();
    }

    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        if (value == null) return true; // La validación de null puede hacerse con @NotNull
        LocalDate fechaMinima = LocalDate.now().plusDays(minDays);
        return value.isAfter(fechaMinima.minusDays(1)); // Es decir, "al menos minDays"
    }
}