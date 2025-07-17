#!/bin/bash
# Script de configuración de scripts de mantenimiento

echo "🔧 Configurando scripts de mantenimiento..."
echo "================================================"

# Hacer ejecutables todos los scripts
echo "📝 Haciendo scripts ejecutables..."

chmod +x health-check.sh
chmod +x cleanup-logs.sh
chmod +x backup-verification.sh
chmod +x system-monitor.sh
chmod +x db-maintenance.sh
chmod +x deploy.sh

echo "✅ Scripts hechos ejecutables"

# Crear directorios necesarios
echo "📁 Creando directorios necesarios..."

mkdir -p logs
mkdir -p backups
mkdir -p temp

echo "✅ Directorios creados"

# Verificar dependencias
echo "🔍 Verificando dependencias..."

# Verificar Java
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo "✅ Java encontrado: $JAVA_VERSION"
else
    echo "❌ Java no encontrado"
fi

# Verificar MySQL
if command -v mysql &> /dev/null; then
    echo "✅ MySQL encontrado"
else
    echo "⚠️  MySQL no encontrado - algunos scripts pueden no funcionar"
fi

# Verificar curl
if command -v curl &> /dev/null; then
    echo "✅ curl encontrado"
else
    echo "⚠️  curl no encontrado - algunos scripts pueden no funcionar"
fi

# Verificar gzip
if command -v gzip &> /dev/null; then
    echo "✅ gzip encontrado"
else
    echo "⚠️  gzip no encontrado - compresión de backups no funcionará"
fi

echo "================================================"
echo "🎉 Configuración completada"
echo ""
echo "📋 Scripts disponibles:"
echo "  - health-check.sh: Verificar salud del sistema"
echo "  - cleanup-logs.sh: Limpiar logs antiguos"
echo "  - backup-verification.sh: Verificar backups"
echo "  - system-monitor.sh: Monitoreo del sistema"
echo "  - db-maintenance.sh: Mantenimiento de BD"
echo "  - deploy.sh: Deployment de la aplicación"
echo ""
echo "🚀 Para usar: ./scripts/[nombre-del-script]" 