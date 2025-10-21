#!/bin/bash

echo "Verificando Docker Desktop..."
echo ""

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "Docker no está instalado"
    echo "   Por favor instala Docker Desktop desde: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Verificar si Docker Desktop está ejecutándose
if ! docker info &> /dev/null; then
    echo "Docker Desktop no está ejecutándose"
    echo ""
    echo "Soluciones:"
    echo "   1. Abre Docker Desktop desde Aplicaciones"
    echo "   2. Espera a que aparezca el ícono de Docker en la barra de menú"
    echo "   3. Verifica que el estado sea 'Docker Desktop is running'"
    echo "   4. Reintenta este comando"
    echo ""
    echo "Comando para abrir Docker Desktop:"
    echo "   open -a Docker"
    exit 1
fi

# Verificar Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose no está disponible"
    exit 1
fi

echo "Docker Desktop está ejecutándose correctamente"
echo "Docker Compose está disponible"
echo ""
echo "Ahora puedes ejecutar:"
echo "   docker-compose up"
echo ""
