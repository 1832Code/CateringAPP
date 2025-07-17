#!/bin/bash
# Script de mantenimiento de base de datos

echo "🗄️  Iniciando mantenimiento de base de datos..."

# Configuración - Ajustar según tu configuración
DB_USER="root"
DB_PASS="password"
DB_NAME="catering_db"

# Verificar conexión a la base de datos
if ! mysql -u$DB_USER -p$DB_PASS -e "SELECT 1;" > /dev/null 2>&1; then
    echo "❌ Error: No se puede conectar a la base de datos"
    echo "Verifica las credenciales en el script"
    exit 1
fi

echo "✅ Conexión a base de datos establecida"

# Optimizar tablas principales
echo "🔧 Optimizando tablas..."
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "
OPTIMIZE TABLE pedidos;
OPTIMIZE TABLE clientes;
OPTIMIZE TABLE items;
OPTIMIZE TABLE categorias;
OPTIMIZE TABLE usuarios;
OPTIMIZE TABLE datos_evento;
" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Tablas optimizadas"
else
    echo "⚠️  Algunas tablas no se pudieron optimizar"
fi

# Analizar tablas
echo "📊 Analizando tablas..."
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "
ANALYZE TABLE pedidos;
ANALYZE TABLE clientes;
ANALYZE TABLE items;
ANALYZE TABLE categorias;
ANALYZE TABLE usuarios;
ANALYZE TABLE datos_evento;
" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Tablas analizadas"
else
    echo "⚠️  Algunas tablas no se pudieron analizar"
fi

# Verificar integridad
echo "🔍 Verificando integridad..."
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "
CHECK TABLE pedidos;
CHECK TABLE clientes;
CHECK TABLE items;
CHECK TABLE categorias;
CHECK TABLE usuarios;
CHECK TABLE datos_evento;
" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Integridad verificada"
else
    echo "⚠️  Algunas tablas tienen problemas de integridad"
fi

# Limpiar logs de MySQL si es posible
echo "🧹 Limpiando logs de MySQL..."
mysql -u$DB_USER -p$DB_PASS -e "FLUSH LOGS;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ Logs de MySQL limpiados"
else
    echo "⚠️  No se pudieron limpiar los logs de MySQL"
fi

# Mostrar estadísticas de la base de datos
echo "📊 Estadísticas de la base de datos:"
mysql -u$DB_USER -p$DB_PASS $DB_NAME -e "
SELECT 
    table_name,
    table_rows,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables 
WHERE table_schema = '$DB_NAME'
ORDER BY (data_length + index_length) DESC;
" 2>/dev/null

echo "🗄️  Mantenimiento de base de datos completado" 