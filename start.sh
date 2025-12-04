#!/bin/bash

# Script para iniciar Frontend + Backend simultáneamente en Mac/Linux
# Requiere: npm, concurrently

echo ""
echo "========================================"
echo "  TechServe Solutions - Development"
echo "========================================"
echo ""

# Verifica si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado"
    exit 1
fi

# Verifica si concurrently está instalado
if ! npm list concurrently > /dev/null 2>&1; then
    echo "📦 Instalando concurrently..."
    npm install -g concurrently
fi

echo "Iniciando Backend y Frontend con concurrently..."
echo ""
echo "✅ Backend: http://localhost:3000"
echo "✅ Frontend: http://localhost:4200"
echo ""
echo "Presiona Ctrl+C para detener ambos servidores"
echo ""

npm run dev
