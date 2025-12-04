@echo off
REM Script de instalación completa para desarrollo en Windows
REM Instala dependencias del frontend y backend

echo.
echo ========================================
echo   TechServe Solutions - Setup Completo
echo ========================================
echo.

echo [1/4] Instalando dependencias del Frontend...
call npm install

echo.
echo [2/4] Instalando dependencias del Backend...
cd mi-backend
call npm install
cd ..

echo.
echo [3/4] Verificando configuración del Backend...
if exist mi-backend\.env (
    echo ✅ .env del backend encontrado
) else (
    echo ⚠️ Copiando .env.example a .env en mi-backend...
    copy mi-backend\.env.example mi-backend\.env
    echo Recuerda actualizar las credenciales en mi-backend\.env
)

echo.
echo [4/4] Verificando linter y tests...
call npm run lint

echo.
echo ========================================
echo   ✅ Setup completado!
echo ========================================
echo.
echo Próximos pasos:
echo   1. Actualiza credenciales en: mi-backend\.env
echo   2. Ejecuta: start.bat (para iniciar Frontend + Backend)
echo   3. Abre: http://localhost:4200 en tu navegador
echo.
pause
