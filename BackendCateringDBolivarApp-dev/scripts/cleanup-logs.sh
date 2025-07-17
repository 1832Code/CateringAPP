#!/bin/bash
# Script de limpieza de logs

echo "🧹 Iniciando limpieza de logs..."

# Configuración
LOG_DIR="logs"
MAX_LOG_SIZE="100M"
DAYS_TO_KEEP=30

# Crear directorio de logs si no existe
if [ ! -d "$LOG_DIR" ]; then
    mkdir -p "$LOG_DIR"
    echo "📁 Directorio de logs creado: $LOG_DIR"
fi

# Limpiar logs muy grandes
echo "📏 Truncando logs grandes..."
find $LOG_DIR -name "*.log" -size +$MAX_LOG_SIZE -exec truncate -s 0 {} \;
echo "✅ Logs grandes truncados"

# Eliminar logs antiguos (más de 30 días)
echo "🗑️  Eliminando logs antiguos..."
find $LOG_DIR -name "*.log.*" -mtime +$DAYS_TO_KEEP -delete
echo "✅ Logs antiguos eliminados"

# Comprimir logs grandes
echo "📦 Comprimiendo logs grandes..."
find $LOG_DIR -name "*.log" -size +50M -exec gzip {} \;
echo "✅ Logs grandes comprimidos"

# Limpiar logs de errores vacíos
echo "🧽 Limpiando logs de errores vacíos..."
find $LOG_DIR -name "errors.log" -size 0 -delete
echo "✅ Logs de errores vacíos eliminados"

# Mostrar estadísticas finales
TOTAL_SIZE=$(du -sh $LOG_DIR | cut -f1)
echo "📊 Tamaño total de logs: $TOTAL_SIZE"

echo "🧹 Limpieza de logs completada" 