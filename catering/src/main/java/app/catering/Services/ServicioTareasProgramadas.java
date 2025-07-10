package app.catering.Services;

import app.catering.Repository.ItemPackageRepository.CategoriaRepository;
import app.catering.Entity.ItemsPackages.Categoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServicioTareasProgramadas {

    @Autowired
    private CategoriaRepository categoriaRepository;

    // Ejemplo 1: Limpiar categorías inactivas (se ejecuta cada día a las 2:00 AM)
    @Scheduled(cron = "0 0 2 * * ?")
    public void limpiarCategoriasInactivas() {
        System.out.println("🕐 Ejecutando limpieza de categorías inactivas: " + LocalDateTime.now());
        
    }

    // Ejemplo 2: Generar reporte diario (se ejecuta cada día a las 8:00 AM)
    @Scheduled(cron = "0 0 8 * * ?")
    public void generarReporteDiario() {
        System.out.println("📊 Generando reporte diario: " + LocalDateTime.now());
        
    }

    // Ejemplo 3: Verificar pedidos pendientes (se ejecuta cada 30 minutos)
    @Scheduled(cron = "0 */30 * * * ?")
    public void verificarPedidosPendientes() {
        System.out.println("🔍 Verificando pedidos pendientes: " + LocalDateTime.now());
    }

    // Ejemplo 4: Backup de datos (se ejecuta cada domingo a las 3:00 AM)
    @Scheduled(cron = "0 0 3 ? * SUN")
    public void realizarBackup() {
        System.out.println("💾 Realizando backup semanal: " + LocalDateTime.now());
        
    }

    // Ejemplo 5: Enviar recordatorios (se ejecuta cada hora)
    @Scheduled(cron = "0 0 * * * ?")
    public void enviarRecordatorios() {
        System.out.println("📧 Enviando recordatorios: " + LocalDateTime.now());
        
    }

    // Ejemplo 6: Actualizar estadísticas (se ejecuta cada 15 minutos)
    @Scheduled(cron = "0 */15 * * * ?")
    public void actualizarEstadisticas() {
        System.out.println("📈 Actualizando estadísticas: " + LocalDateTime.now());
        
    }
} 