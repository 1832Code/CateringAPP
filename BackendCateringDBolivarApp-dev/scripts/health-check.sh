#!/bin/bash
# Script de verificación de salud del sistema de catering

echo "🔍 Verificando salud del sistema de catering..."
echo "================================================"

# Verificar si la aplicación está ejecutándose
if pgrep -f "catering" > /dev/null; then
    echo "✅ Aplicación ejecutándose"
else
    echo "❌ Aplicación no está ejecutándose"
fi

# Verificar espacio en disco
DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "⚠️  Espacio en disco crítico: ${DISK_USAGE}%"
else
    echo "✅ Espacio en disco OK: ${DISK_USAGE}%"
fi

# Verificar logs recientes
if [ -f "logs/catering-application.log" ]; then
    echo "✅ Archivo de logs principal existe"
    LOG_SIZE=$(du -h logs/catering-application.log | cut -f1)
    echo "📊 Tamaño del log: $LOG_SIZE"
else
    echo "❌ Archivo de logs principal no encontrado"
fi

# Verificar backups recientes
BACKUP_COUNT=$(find backups/ -name "*.sql.gz" -mtime -7 | wc -l)
echo "📦 Backups de la última semana: $BACKUP_COUNT"

# Verificar memoria del sistema
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.2f%%", $3*100/$2}')
echo "💾 Uso de memoria: $MEMORY_USAGE"

# Verificar conectividad de base de datos
if mysql -u root -p -e "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ Conexión a base de datos OK"
else
    echo "❌ Error de conexión a base de datos"
fi

# Verificar puerto de la aplicación
if netstat -tuln | grep :8084 > /dev/null; then
    echo "✅ Puerto 8084 está activo"
else
    echo "❌ Puerto 8084 no está activo"
fi

echo "================================================"
echo "🏁 Verificación completada" 