# Configuración de Docker

## IMPORTANTE: Verificación Previa

Antes de ejecutar `docker-compose up`, **SIEMPRE** verifica que Docker Desktop esté ejecutándose.

## Verificación Rápida

### Opción 1: Script Automático
```bash
./check-docker.sh
```

### Opción 2: Verificación Manual
```bash
# Verificar que Docker esté funcionando
docker --version

# Verificar que Docker Desktop esté ejecutándose
docker info
```

## Error Común

Si obtienes este error:
```
unable to get image 'mongo:7.0': Cannot connect to the Docker daemon at unix:///Users/<<user_name>>/.docker/run/docker.sock. Is the docker daemon running?
```

## Solución

1. Abre Docker Desktop:
   ```bash
   open -a Docker
   ```

2. Espera a que Docker Desktop se inicie completamente
   - Busca el ícono de Docker en la barra de menú (parte superior derecha)
   - El ícono debe estar verde y mostrar "Docker Desktop is running"

3. Verifica que esté funcionando:
   ```bash
   docker --version
   docker info
   ```

4. Ejecuta el proyecto:
   ```bash
   docker-compose up
   ```

## Comandos de Ejecución Seguros

```bash
# 1. Verificar Docker
./check-docker.sh

# 2. Si todo está bien, ejecutar
docker-compose up

# 3. Para ejecutar en segundo plano
docker-compose up -d

# 4. Para detener los servicios
docker-compose down
```

## Solución de Problemas Adicionales

### Docker Desktop no se inicia
- Reinicia tu Mac
- Verifica que Docker Desktop tenga permisos necesarios
- Reinstala Docker Desktop si es necesario

### Puerto ocupado
```bash
# Verificar puertos en uso
lsof -i :3000  # Frontend
lsof -i :5001  # Backend
lsof -i :27017 # MongoDB
```

### Limpiar contenedores
```bash
# Detener y eliminar contenedores
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Limpiar imágenes
docker system prune -a
```
