# Million Real Estate App

Aplicación fullstack para gestión y visualización de propiedades inmobiliarias, desarrollada con .NET 9, MongoDB y Next.js.

## Características

- Listado de propiedades con filtros avanzados
- Búsqueda por nombre, dirección y rango de precio
- Interfaz responsive y moderna
- Paginación optimizada
- Sistema de diseño con Material UI
- Despliegue con Docker Compose
- Cobertura de tests
- API documentada con OpenAPI/Swagger

## Stack Tecnológico

### Backend
- .NET 9 con C#
- MongoDB 7.0
- ASP.NET Core Web API
- Arquitectura limpia (4 capas)
- NUnit para testing

### Frontend
- Next.js 14 (App Router)
- React 19
- TypeScript
- Material UI v5
- Jest + React Testing Library

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD
- Multi-stage builds

## Ejecución Rápida

### Prerrequisitos

**IMPORTANTE**: Antes de ejecutar el proyecto, asegúrate de que Docker Desktop esté ejecutándose:

1. Abrir Docker Desktop en tu Mac
2. Esperar a que Docker esté completamente iniciado (ícono verde en la barra de menú)
3. Verificar que Docker esté funcionando: `docker --version`

### Comandos de Ejecución

```bash
# Clonar repositorio
git clone <repository-url>
cd Prueba\ million

# Verificar que Docker esté funcionando (recomendado)
./check-docker.sh

# Levantar todos los servicios
docker-compose up
```

### Solución de Problemas

Si obtienes el error: `Cannot connect to the Docker daemon`:

1. Abre Docker Desktop desde Aplicaciones
2. Espera a que aparezca el ícono de Docker en la barra de menú
3. Verifica que el estado sea "Docker Desktop is running"
4. Reintenta el comando `docker-compose up`

Para más detalles: Consulta el archivo [`DOCKER_SETUP.md`](DOCKER_SETUP.md) para instrucciones completas de configuración de Docker.

Servicios disponibles:
- API: http://localhost:5001/swagger
- Frontend: http://localhost:3000
- MongoDB: localhost:27017

## Desarrollo Local

### Prerrequisitos
- .NET SDK 9.0 o superior
- Node.js 20 o superior
- Docker Desktop
- MongoDB 7.0 (opcional si usa Docker)

### Backend

```bash
cd backend

# Restaurar dependencias
dotnet restore

# Ejecutar
dotnet run --project Million.Api

# Tests
dotnet test
```

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Tests
npm run test

# Build de producción
npm run build
```

## Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# MongoDB
MONGODB_URI=mongodb://mongo:27017/million

# Backend
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:8080

# Frontend (para desarrollo local fuera de Docker)
NEXT_PUBLIC_API_URL=http://localhost:5001

# Nota: En Docker Compose, el frontend usa http://backend:8080 automáticamente
```

## Endpoints de la API

### GET /api/properties
Lista propiedades con filtros opcionales y paginación.

**Query Parameters:**
- `name` (string, opcional): Filtro por nombre
- `address` (string, opcional): Filtro por dirección
- `minPrice` (decimal, opcional): Precio mínimo en USD
- `maxPrice` (decimal, opcional): Precio máximo en USD
- `page` (int, default: 1): Número de página
- `pageSize` (int, default: 10): Elementos por página

**Response 200:**
```json
{
  "properties": [...],
  "totalCount": 45,
  "page": 1,
  "pageSize": 10,
  "totalPages": 5
}
```

### GET /api/properties/{id}
Obtiene una propiedad por ID.

**Response 200:**
```json
{
  "id": "...",
  "idOwner": "...",
  "name": "...",
  "addressProperty": "...",
  "priceProperty": 250000,
  "image": "..."
}
```

**Response 404:**
```json
{
  "error": "Propiedad con ID ... no encontrada"
}
```

Ver documentación completa en `/swagger` cuando el backend esté corriendo.

## Tests

### Backend
```bash
cd backend
dotnet test --collect:"XPlat Code Coverage"
```

### Frontend
```bash
cd frontend
npm run test:coverage
```

## Arquitectura

```
├── backend/
│   ├── Million.Api/           # Controllers, Middleware
│   ├── Million.Application/   # Services, DTOs
│   ├── Million.Domain/        # Entities, Interfaces
│   ├── Million.Infrastructure/ # MongoDB, Repositories
│   └── Million.Tests/         # Unit & Integration tests
├── frontend/
│   ├── app/                   # Pages (App Router)
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   └── types/                 # TypeScript definitions
└── infra/
    └── docker/                # Dockerfiles, scripts
```

## Licencia

MIT License - ver archivo [LICENSE](LICENSE) para detalles

## Autor

Proyecto desarrollado como prueba técnica para Million.

