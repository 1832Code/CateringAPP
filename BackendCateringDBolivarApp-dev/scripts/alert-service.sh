#!/bin/bash
# Script de servicio de alertas

# Configuración
ALERT_LOG="logs/alerts.log"
EMAIL_RECIPIENT="admin@catering.com"
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"

# Crear directorio de logs si no existe
mkdir -p logs

# Función para registrar alertas
log_alert() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" >> $ALERT_LOG
    
    # También mostrar en consola
    case $level in
        "CRITICAL")
            echo "🚨 CRITICAL: $message"
            ;;
        "WARNING")
            echo "⚠️  WARNING: $message"
            ;;
        "INFO")
            echo "ℹ️  INFO: $message"
            ;;
    esac
}

# Función para enviar alerta por email (requiere mailutils)
send_email_alert() {
    local subject=$1
    local message=$2
    
    if command -v mail &> /dev/null; then
        echo "$message" | mail -s "$subject" $EMAIL_RECIPIENT
        log_alert "INFO" "Alerta enviada por email: $subject"
    else
        log_alert "WARNING" "mail no disponible - no se pudo enviar email"
    fi
}

# Función para enviar alerta por Slack
send_slack_alert() {
    local message=$1
    
    if [ -n "$SLACK_WEBHOOK_URL" ] && [ "$SLACK_WEBHOOK_URL" != "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK" ]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"🚨 Catering Alert: $message\"}" \
            $SLACK_WEBHOOK_URL > /dev/null 2>&1
        
        log_alert "INFO" "Alerta enviada por Slack: $message"
    fi
}

# Verificar CPU
check_cpu() {
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    
    if [ $cpu_usage -gt 90 ]; then
        local message="CPU crítico: ${cpu_usage}%"
        log_alert "CRITICAL" "$message"
        send_email_alert "CRITICAL: CPU Alto" "$message"
        send_slack_alert "$message"
    elif [ $cpu_usage -gt 80 ]; then
        local message="CPU alto: ${cpu_usage}%"
        log_alert "WARNING" "$message"
    fi
}

# Verificar memoria
check_memory() {
    local memory_usage=$(free | awk 'NR==2{printf "%.2f", $3*100/$2}')
    
    if [ $memory_usage -gt 90 ]; then
        local message="Memoria crítica: ${memory_usage}%"
        log_alert "CRITICAL" "$message"
        send_email_alert "CRITICAL: Memoria Alta" "$message"
        send_slack_alert "$message"
    elif [ $memory_usage -gt 80 ]; then
        local message="Memoria alta: ${memory_usage}%"
        log_alert "WARNING" "$message"
    fi
}

# Verificar espacio en disco
check_disk() {
    local disk_usage=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
    
    if [ $disk_usage -gt 95 ]; then
        local message="Disco crítico: ${disk_usage}%"
        log_alert "CRITICAL" "$message"
        send_email_alert "CRITICAL: Disco Lleno" "$message"
        send_slack_alert "$message"
    elif [ $disk_usage -gt 85 ]; then
        local message="Disco alto: ${disk_usage}%"
        log_alert "WARNING" "$message"
    fi
}

# Verificar aplicación
check_application() {
    if ! pgrep -f "catering" > /dev/null; then
        local message="Aplicación no está ejecutándose"
        log_alert "CRITICAL" "$message"
        send_email_alert "CRITICAL: Aplicación Caída" "$message"
        send_slack_alert "$message"
    elif ! netstat -tuln | grep :8084 > /dev/null; then
        local message="Puerto 8084 no está activo"
        log_alert "CRITICAL" "$message"
        send_email_alert "CRITICAL: Puerto Inactivo" "$message"
        send_slack_alert "$message"
    fi
}

# Verificar base de datos
check_database() {
    if ! mysql -u root -p -e "SELECT 1;" > /dev/null 2>&1; then
        local message="No se puede conectar a la base de datos"
        log_alert "CRITICAL" "$message"
        send_email_alert "CRITICAL: BD Inaccesible" "$message"
        send_slack_alert "$message"
    fi
}

# Verificar logs
check_logs() {
    if [ -f "logs/catering-application.log" ]; then
        local log_size=$(du -b logs/catering-application.log | cut -f1)
        
        if [ $log_size -gt 104857600 ]; then  # 100MB
            local message="Log muy grande: $(du -h logs/catering-application.log | cut -f1)"
            log_alert "WARNING" "$message"
        fi
        
        # Verificar errores recientes
        local error_count=$(tail -1000 logs/catering-application.log | grep -c "ERROR")
        if [ $error_count -gt 10 ]; then
            local message="Muchos errores en logs: $error_count errores en las últimas 1000 líneas"
            log_alert "WARNING" "$message"
        fi
    fi
}

# Verificar backups
check_backups() {
    local backup_count=$(find backups/ -name "*.sql.gz" -mtime -1 | wc -l)
    
    if [ $backup_count -eq 0 ]; then
        local message="No hay backups hoy"
        log_alert "WARNING" "$message"
        send_email_alert "WARNING: Sin Backups" "$message"
    fi
    
    # Verificar backup más reciente
    local latest_backup=$(find backups/ -name "*.sql.gz" -type f -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -f2- -d" ")
    if [ -n "$latest_backup" ]; then
        local backup_age=$(find "$latest_backup" -mtime +7 -print 2>/dev/null)
        if [ -n "$backup_age" ]; then
            local message="Backup muy antiguo: $(basename "$latest_backup")"
            log_alert "WARNING" "$message"
            send_email_alert "WARNING: Backup Antiguo" "$message"
        fi
    fi
}

# Función principal
main() {
    log_alert "INFO" "Iniciando verificación de alertas"
    
    check_cpu
    check_memory
    check_disk
    check_application
    check_database
    check_logs
    check_backups
    
    log_alert "INFO" "Verificación de alertas completada"
    
    # Mantener solo las últimas 1000 líneas del log de alertas
    tail -n 1000 $ALERT_LOG > $ALERT_LOG.tmp && mv $ALERT_LOG.tmp $ALERT_LOG
}

# Ejecutar función principal
main 