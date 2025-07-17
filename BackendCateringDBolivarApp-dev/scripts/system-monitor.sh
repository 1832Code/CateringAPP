#!/bin/bash
# Script de monitoreo del sistema

LOG_FILE="logs/system-monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Crear directorio de logs si no existe
if [ ! -d "logs" ]; then
    mkdir -p logs
fi

echo "[$DATE] 🔍 Monitoreo del sistema iniciado" >> $LOG_FILE

# Verificar CPU
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
echo "[$DATE] 💻 CPU Usage: ${CPU_USAGE}%" >> $LOG_FILE

# Verificar memoria
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.2f", $3*100/$2}')
echo "[$DATE] 💾 Memory Usage: ${MEMORY_USAGE}%" >> $LOG_FILE

# Verificar espacio en disco
DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
echo "[$DATE] 💿 Disk Usage: ${DISK_USAGE}%" >> $LOG_FILE

# Verificar conexiones de base de datos
DB_CONNECTIONS=$(netstat -an | grep :3306 | wc -l)
echo "[$DATE] 🗄️  DB Connections: $DB_CONNECTIONS" >> $LOG_FILE

# Verificar si la aplicación está ejecutándose
if pgrep -f "catering" > /dev/null; then
    echo "[$DATE] ✅ Aplicación ejecutándose" >> $LOG_FILE
else
    echo "[$DATE] ❌ Aplicación no está ejecutándose" >> $LOG_FILE
fi

# Verificar puerto de la aplicación
if netstat -tuln | grep :8084 > /dev/null; then
    echo "[$DATE] ✅ Puerto 8084 activo" >> $LOG_FILE
else
    echo "[$DATE] ❌ Puerto 8084 inactivo" >> $LOG_FILE
fi

# Alertas
if [ $CPU_USAGE -gt 80 ]; then
    echo "[$DATE] ⚠️  ALERTA: CPU alto: ${CPU_USAGE}%" >> $LOG_FILE
fi

if [ $MEMORY_USAGE -gt 80 ]; then
    echo "[$DATE] ⚠️  ALERTA: Memoria alta: ${MEMORY_USAGE}%" >> $LOG_FILE
fi

if [ $DISK_USAGE -gt 85 ]; then
    echo "[$DATE] ⚠️  ALERTA: Disco crítico: ${DISK_USAGE}%" >> $LOG_FILE
fi

# Verificar tamaño de logs
if [ -f "logs/catering-application.log" ]; then
    LOG_SIZE=$(du -h logs/catering-application.log | cut -f1)
    echo "[$DATE] 📊 Log size: $LOG_SIZE" >> $LOG_FILE
    
    # Alerta si el log es muy grande
    LOG_SIZE_BYTES=$(du -b logs/catering-application.log | cut -f1)
    if [ $LOG_SIZE_BYTES -gt 104857600 ]; then  # 100MB
        echo "[$DATE] ⚠️  ALERTA: Log muy grande: $LOG_SIZE" >> $LOG_FILE
    fi
fi

# Verificar backups recientes
BACKUP_COUNT=$(find backups/ -name "*.sql.gz" -mtime -1 | wc -l)
echo "[$DATE] 📦 Backups hoy: $BACKUP_COUNT" >> $LOG_FILE

if [ $BACKUP_COUNT -eq 0 ]; then
    echo "[$DATE] ⚠️  ALERTA: No hay backups hoy" >> $LOG_FILE
fi

echo "[$DATE] ✅ Monitoreo completado" >> $LOG_FILE

# Mantener solo las últimas 1000 líneas del log de monitoreo
tail -n 1000 $LOG_FILE > $LOG_FILE.tmp && mv $LOG_FILE.tmp $LOG_FILE 