@echo off
REM Script para iniciar Frontend + Backend simultáneamente en Windows
REM Abre dos terminales: una para el backend y otra para el frontend

echo.
echo ========================================
echo   TechServe Solutions - Development
echo ========================================
echo.
echo Iniciando Backend y Frontend...
echo.

REM Abre terminal para backend
start cmd /k "cd mi-backend && npm start"

REM Espera un poco para que inicie el backend
timeout /t 3 /nobreak

REM Abre terminal para frontend
start cmd /k "npm start"

echo.
echo ✅ Terminales abiertas:
echo    - Backend: http://localhost:3000
echo    - Frontend: http://localhost:4200
echo.
