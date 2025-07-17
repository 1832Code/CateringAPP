#!/bin/bash
# Script de deployment

echo "🚀 Iniciando deployment del sistema de catering..."
echo "================================================"

# Verificar que estamos en el directorio correcto
if [ ! -f "pom.xml" ]; then
    echo "❌ Error: No se encontró pom.xml. Ejecuta desde el directorio raíz del proyecto."
    exit 1
fi

# Crear backup antes del deployment
echo "📦 Creando backup pre-deployment..."
if [ -f "scripts/backup-verification.sh" ]; then
    ./scripts/backup-verification.sh
else
    echo "⚠️  Script de backup no encontrado, continuando..."
fi

# Verificar espacio en disco
DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 90 ]; then
    echo "❌ Error: Espacio en disco crítico: ${DISK_USAGE}%"
    exit 1
fi

# Detener aplicación si está ejecutándose
echo "⏹️  Deteniendo aplicación actual..."
if pgrep -f "catering" > /dev/null; then
    pkill -f "catering"
    sleep 5
    echo "✅ Aplicación detenida"
else
    echo "ℹ️  Aplicación no estaba ejecutándose"
fi

# Limpiar target anterior
echo "🧹 Limpiando build anterior..."
rm -rf target/

# Compilar proyecto
echo "🔨 Compilando proyecto..."
if ./mvnw clean package -DskipTests; then
    echo "✅ Compilación exitosa"
else
    echo "❌ Error en la compilación"
    exit 1
fi

# Verificar que el JAR se creó
if [ ! -f "target/catering-0.0.1-SNAPSHOT.jar" ]; then
    echo "❌ Error: JAR no encontrado después de la compilación"
    exit 1
fi

# Crear directorio de logs si no existe
mkdir -p logs

# Iniciar aplicación
echo "▶️  Iniciando aplicación..."
nohup java -jar target/catering-0.0.1-SNAPSHOT.jar > logs/deployment.log 2>&1 &

# Esperar a que la aplicación inicie
echo "⏳ Esperando que la aplicación inicie..."
sleep 15

# Verificar que la aplicación inició correctamente
echo "🔍 Verificando que la aplicación esté funcionando..."
for i in {1..10}; do
    if curl -f http://localhost:8084/api/health > /dev/null 2>&1; then
        echo "✅ Aplicación iniciada correctamente"
        break
    else
        echo "⏳ Intento $i/10 - Esperando..."
        sleep 5
    fi
    
    if [ $i -eq 10 ]; then
        echo "❌ Error: La aplicación no respondió después de 10 intentos"
        echo "📋 Últimas líneas del log de deployment:"
        tail -20 logs/deployment.log
        exit 1
    fi
done

# Verificar endpoints críticos
echo "🔍 Verificando endpoints críticos..."
ENDPOINTS=(
    "http://localhost:8084/api/auth/login"
    "http://localhost:8084/api/cron/status"
    "http://localhost:8084/api/pedidos"
)

for endpoint in "${ENDPOINTS[@]}"; do
    if curl -f "$endpoint" > /dev/null 2>&1; then
        echo "✅ $endpoint - OK"
    else
        echo "⚠️  $endpoint - No responde"
    fi
done

# Mostrar información del deployment
echo "📊 Información del deployment:"
echo "   - Puerto: 8084"
echo "   - PID: $(pgrep -f catering)"
echo "   - Log: logs/deployment.log"
echo "   - JAR: target/catering-0.0.1-SNAPSHOT.jar"

echo "================================================"
echo "🚀 Deployment completado exitosamente" 