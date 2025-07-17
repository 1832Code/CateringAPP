#!/bin/bash
# Script de verificación de backups

echo "🔍 Verificando integridad de backups..."

BACKUP_DIR="backups"

# Crear directorio de backups si no existe
if [ ! -d "$BACKUP_DIR" ]; then
    mkdir -p "$BACKUP_DIR"
    echo "📁 Directorio de backups creado: $BACKUP_DIR"
fi

# Encontrar el backup más reciente
LATEST_BACKUP=$(find $BACKUP_DIR -name "*.sql.gz" -type f -printf '%T@ %p\n' 2>/dev/null | sort -n | tail -1 | cut -f2- -d" ")

if [ -n "$LATEST_BACKUP" ]; then
    echo "📦 Backup más reciente: $LATEST_BACKUP"
    
    # Verificar que el backup se puede descomprimir
    if gunzip -t "$LATEST_BACKUP" 2>/dev/null; then
        echo "✅ Backup comprimido correctamente"
    else
        echo "❌ Backup corrupto"
    fi
    
    # Mostrar tamaño del backup
    BACKUP_SIZE=$(du -h "$LATEST_BACKUP" | cut -f1)
    echo "📊 Tamaño del backup: $BACKUP_SIZE"
    
    # Verificar fecha del backup
    BACKUP_DATE=$(stat -c %y "$LATEST_BACKUP")
    echo "📅 Fecha del backup: $BACKUP_DATE"
    
    # Verificar antigüedad del backup
    BACKUP_AGE=$(find "$LATEST_BACKUP" -mtime +7 -print 2>/dev/null)
    if [ -n "$BACKUP_AGE" ]; then
        echo "⚠️  ADVERTENCIA: Backup tiene más de 7 días"
    else
        echo "✅ Backup reciente (menos de 7 días)"
    fi
    
else
    echo "❌ No se encontraron backups"
fi

# Contar total de backups
TOTAL_BACKUPS=$(find $BACKUP_DIR -name "*.sql.gz" -type f | wc -l)
echo "📦 Total de backups disponibles: $TOTAL_BACKUPS"

# Mostrar espacio usado por backups
if [ -d "$BACKUP_DIR" ]; then
    BACKUP_SPACE=$(du -sh $BACKUP_DIR | cut -f1)
    echo "💾 Espacio usado por backups: $BACKUP_SPACE"
fi

echo "🔍 Verificación de backups completada" 