# Guía de Sintaxis Cron Jobs en Spring Boot

## Formato de Expresión Cron

La expresión cron en Spring Boot sigue el formato:
```
segundo minuto hora día mes día_semana
```

### Campos:
- **Segundo**: 0-59
- **Minuto**: 0-59  
- **Hora**: 0-23
- **Día del mes**: 1-31
- **Mes**: 1-12 o JAN-DEC
- **Día de la semana**: 1-7 (1=domingo) o SUN-SAT

### Caracteres especiales:
- `*`: Cualquier valor
- `?`: Sin valor específico (solo para día del mes o día de la semana)
- `/`: Incremento (ej: `0/15` = cada 15 segundos)
- `-`: Rango (ej: `1-5` = 1,2,3,4,5)
- `,`: Valores específicos (ej: `1,3,5` = 1,3,5)

## Ejemplos Comunes

### Cada minuto:
```java
@Scheduled(cron = "0 * * * * ?")
```

### Cada 5 minutos:
```java
@Scheduled(cron = "0 */5 * * * ?")
```

### Cada hora:
```java
@Scheduled(cron = "0 0 * * * ?")
```

### Cada día a las 8:00 AM:
```java
@Scheduled(cron = "0 0 8 * * ?")
```

### Cada domingo a las 9:00 AM:
```java
@Scheduled(cron = "0 0 9 ? * SUN")
```

### Cada 15 minutos:
```java
@Scheduled(cron = "0 */15 * * * ?")
```

### Cada 2 horas:
```java
@Scheduled(cron = "0 0 */2 * * ?")
```

### Cada día a las 3:00 AM:
```java
@Scheduled(cron = "0 0 3 * * ?")
```

### Cada lunes a las 10:00 AM:
```java
@Scheduled(cron = "0 0 10 ? * MON")
```

## Casos de Uso para Catering

### 1. Verificación de Eventos Próximos
```java
// Cada hora
@Scheduled(cron = "0 0 * * * ?")
public void verificarEventosProximos() {
    // Verificar eventos que están próximos (24-48 horas antes)
}
```

### 2. Limpieza de Datos Antiguos
```java
// Cada día a las 3:00 AM
@Scheduled(cron = "0 0 3 * * ?")
public void limpiarDatosAntiguos() {
    // Eliminar pedidos cancelados antiguos
}
```

### 3. Generación de Reportes
```java
// Cada domingo a las 9:00 AM
@Scheduled(cron = "0 0 9 ? * SUN")
public void generarReporteSemanal() {
    // Generar reporte de ventas semanal
}
```

### 4. Verificación de Inventario
```java
// Cada 2 horas
@Scheduled(cron = "0 0 */2 * * ?")
public void verificarInventario() {
    // Verificar niveles de inventario
}
```

### 5. Envío de Notificaciones
```java
// Cada 6 horas
@Scheduled(cron = "0 0 */6 * * ?")
public void enviarNotificaciones() {
    // Enviar recordatorios y confirmaciones
}
```

## Configuración Requerida

Para habilitar cron jobs en Spring Boot, necesitas:

1. **Agregar la anotación `@EnableScheduling`** en una clase de configuración:
```java
@Configuration
@EnableScheduling
public class SchedulingConfig {
}
```

2. **Usar `@Scheduled`** en los métodos que quieres programar:
```java
@Service
public class MiServicio {
    
    @Scheduled(cron = "0 0 8 * * ?")
    public void miTareaProgramada() {
        // Lógica de la tarea
    }
}
```

## Consideraciones Importantes

- Los cron jobs se ejecutan en el hilo principal por defecto
- Para tareas largas, considera usar `@Async`
- Los cron jobs se ejecutan solo cuando la aplicación está corriendo
- Para producción, considera usar herramientas como Quartz Scheduler para mayor robustez 