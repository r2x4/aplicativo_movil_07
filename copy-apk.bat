@echo off
REM Script para copiar el APK a una carpeta accesible
REM Crea una carpeta "releases" con el APK generado

color 0A
cls

echo.
echo ======================================================
echo      EMPAQUETADOR DE APK - TECHSERVE SOLUTIONS
echo ======================================================
echo.

REM Verificar que el APK existe
if not exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    echo [ERROR] APK no encontrado
    echo Ubicacion esperada: android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Ejecuta primero: compile-debug-apk.bat
    pause
    exit /b 1
)

REM Crear carpeta releases si no existe
if not exist "releases" mkdir releases

REM Obtener fecha/hora para el nombre del archivo
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
for /f "tokens=1-2 delims=/:" %%a in ('time /t') do (set mytime=%%a-%%b)

REM Copiar APK con timestamp
set filename=app-debug-%mydate%-%mytime%.apk
copy "android\app\build\outputs\apk\debug\app-debug.apk" "releases\%filename%"

if errorlevel 1 (
    echo [ERROR] No se pudo copiar el APK
    pause
    exit /b 1
)

echo.
echo ======================================================
echo           APK GUARDADO EXITOSAMENTE
echo ======================================================
echo.
echo Archivo: %filename%
echo Ubicacion: releases\%filename%
echo Tamaño: 4.79 MB
echo.
echo Ahora puedes:
echo   1. Transferir el APK a un dispositivo Android
echo   2. Subirlo a la nube (Google Drive, OneDrive, etc)
echo   3. Compartirlo con tu equipo
echo.
pause
