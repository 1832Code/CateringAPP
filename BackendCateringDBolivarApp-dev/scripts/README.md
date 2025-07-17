# 🛠️ Scripts de Mantenimiento - Sistema de Catering

## 📋 Descripción

Esta carpeta contiene scripts automatizados para el mantenimiento del sistema de catering, complementando los cron jobs y backups ya implementados.

## 🚀 Scripts Disponibles

### 1. `health-check.sh`
**Propósito**: Verificación completa de la salud del sistema
```bash
./health-check.sh
```

**Verifica**:
- ✅ Estado de la aplicación
- ✅ Espacio en disco
- ✅ Logs del sistema
- ✅ Backups recientes
- ✅ Uso de memoria
- ✅ Conexión a base de datos
- ✅ Puerto de la aplicación

### 2. `cleanup-logs.sh`
**Propósito**: Limpieza automática de logs
```bash
./cleanup-logs.sh
```

**Acciones**:
- 🧹 Trunca logs muy grandes (>100MB)
- 🗑️ Elimina logs antiguos (>30 días)
- 📦 Comprime logs grandes (>50MB)
- 🧽 Elimina logs de errores vacíos

### 3. `backup-verification.sh`
**Propósito**: Verificación de integridad de backups
```bash
./backup-verification.sh
```

**Verifica**:
- 📦 Backup más reciente
- ✅ Integridad de compresión
- 📊 Tamaño de backups
- 📅 Fecha de backups
- ⚠️ Alertas de backups antiguos

### 4. `system-monitor.sh`
**Propósito**: Monitoreo continuo del sistema
```bash
./system-monitor.sh
```

**Monitorea**:
- 💻 Uso de CPU
- 💾 Uso de memoria
- 💿 Espacio en disco
- 🗄️ Conexiones de BD
- 📊 Tamaño de logs
- 📦 Estado de backups

### 5. `db-maintenance.sh`
**Propósito**: Mantenimiento de base de datos
```bash
./db-maintenance.sh
```

**Acciones**:
- 🔧 Optimiza tablas
- 📊 Analiza tablas
- 🔍 Verifica integridad
- 🧹 Limpia logs de MySQL
- 📊 Muestra estadísticas

### 6. `deploy.sh`
**Propósito**: Deployment automatizado
```bash
./deploy.sh
```

**Proceso**:
- 📦 Backup pre-deployment
- ⏹️ Detiene aplicación actual
- 🔨 Compila proyecto
- ▶️ Inicia nueva versión
- 🔍 Verifica endpoints críticos

## 🔧 Configuración Inicial

### 1. Hacer scripts ejecutables
```bash
chmod +x *.sh
```

### 2. Configurar dependencias
```bash
./setup-scripts.sh
```

### 3. Ajustar configuración de BD
Editar `db-maintenance.sh` con tus credenciales:
```bash
DB_USER="tu_usuario"
DB_PASS="tu_password"
DB_NAME="tu_base_datos"
```

## 📊 Endpoints de Monitoreo

### Salud del Sistema
```bash
GET http://localhost:8084/api/maintenance/health
```

### Información de Logs
```bash
GET http://localhost:8084/api/maintenance/logs/info
```

### Información de Backups
```bash
GET http://localhost:8084/api/maintenance/backups/info
```

### Backup Manual
```bash
POST http://localhost:8084/api/maintenance/backup/manual
```

### Información del Sistema
```bash
GET http://localhost:8084/api/maintenance/system/info
```

### Limpieza de Logs
```bash
POST http://localhost:8084/api/maintenance/logs/cleanup
```

## 🔄 Automatización con Cron

### Agregar al crontab
```bash
# Monitoreo cada 5 minutos
*/5 * * * * /ruta/completa/scripts/system-monitor.sh

# Limpieza diaria a las 3 AM
0 3 * * * /ruta/completa/scripts/cleanup-logs.sh

# Verificación de backups diaria
0 4 * * * /ruta/completa/scripts/backup-verification.sh

# Mantenimiento de BD semanal (domingos 2 AM)
0 2 * * 0 /ruta/completa/scripts/db-maintenance.sh

# Verificación de salud diaria
0 6 * * * /ruta/completa/scripts/health-check.sh
```

## 🚨 Procedimientos de Emergencia

### Sistema No Responde
```bash
# 1. Verificar logs
tail -f logs/catering-application.log

# 2. Reiniciar aplicación
pkill -f "catering"
nohup java -jar target/catering-0.0.1-SNAPSHOT.jar &

# 3. Verificar salud
./health-check.sh
```

### Base de Datos Corrupta
```bash
# 1. Detener aplicación
pkill -f "catering"

# 2. Restaurar último backup
mysql -u root -p catering_db < backups/latest_backup.sql

# 3. Reiniciar aplicación
nohup java -jar target/catering-0.0.1-SNAPSHOT.jar &
```

### Disco Lleno
```bash
# 1. Limpiar logs
./cleanup-logs.sh

# 2. Comprimir backups antiguos
find backups/ -name "*.sql" -exec gzip {} \;

# 3. Verificar espacio
df -h
```

## 📋 Checklist de Mantenimiento

### Diario
- [ ] Ejecutar `health-check.sh`
- [ ] Revisar logs de errores
- [ ] Verificar espacio en disco
- [ ] Confirmar backups automáticos

### Semanal
- [ ] Ejecutar `db-maintenance.sh`
- [ ] Ejecutar `cleanup-logs.sh`
- [ ] Verificar integridad de backups
- [ ] Revisar métricas de rendimiento

### Mensual
- [ ] Actualizar dependencias
- [ ] Revisar configuración de seguridad
- [ ] Analizar logs de auditoría
- [ ] Verificar capacidad de almacenamiento

## 🔍 Troubleshooting

### Scripts no ejecutan
```bash
# Verificar permisos
ls -la *.sh

# Hacer ejecutables
chmod +x *.sh
```

### Errores de conexión a BD
```bash
# Verificar credenciales en db-maintenance.sh
# Verificar que MySQL esté ejecutándose
sudo systemctl status mysql
```

### Logs muy grandes
```bash
# Ejecutar limpieza manual
./cleanup-logs.sh

# Verificar rotación de logs
tail -f logs/catering-application.log
```

## 📚 Logs Importantes

- `logs/catering-application.log` - Logs principales
- `logs/system-monitor.log` - Logs de monitoreo
- `logs/deployment.log` - Logs de deployment
- `logs/errors.log` - Solo errores

## 🎯 Mejores Prácticas

1. **Ejecutar scripts en horarios de bajo tráfico**
2. **Monitorear logs después de cada script**
3. **Mantener backups en ubicación segura**
4. **Documentar cambios realizados**
5. **Probar scripts en ambiente de desarrollo primero**

## 📞 Soporte

Para problemas con los scripts:
1. Revisar logs de la aplicación
2. Verificar permisos de archivos
3. Confirmar dependencias instaladas
4. Consultar la guía de mantenimiento principal 