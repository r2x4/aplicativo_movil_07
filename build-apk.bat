@echo off
REM Script para compilar APK para Android
REM Autor: TechServe Solutions
REM Fecha: 2025-12-03

color 0A
cls

echo.
echo ======================================================
echo      COMPILACION DE APK - TECHSERVE SOLUTIONS
echo ======================================================
echo.

REM Verificar si estamos en el directorio correcto
if not exist "ionic.config.json" (
    echo [ERROR] Debes ejecutar este script desde la raiz del proyecto
    pause
    exit /b 1
)

echo [1/4] Compilando Angular/Ionic para produccion...
echo.
call ionic build --prod
if errorlevel 1 (
    echo [ERROR] La compilacion de Ionic fallo
    pause
    exit /b 1
)

echo.
echo [2/4] Sincronizando con Capacitor...
echo.
call npx cap sync android
if errorlevel 1 (
    echo [ERROR] La sincronizacion de Capacitor fallo
    pause
    exit /b 1
)

echo.
echo [3/4] Compilando con Gradle...
echo.
cd android
call gradlew.bat clean build
if errorlevel 1 (
    echo [ERROR] La compilacion de Gradle fallo
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo [4/4] Verificando archivos APK generados...
echo.

REM Buscar APKs de debug
if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    echo [OK] APK de DEBUG generado:
    echo      android\app\build\outputs\apk\debug\app-debug.apk
    echo.
)

REM Buscar APKs de release
if exist "android\app\build\outputs\apk\release\app-release-unsigned.apk" (
    echo [OK] APK de RELEASE (sin firmar) generado:
    echo      android\app\build\outputs\apk\release\app-release-unsigned.apk
    echo.
)

echo.
echo ======================================================
echo           COMPILACION COMPLETADA
echo ======================================================
echo.
echo Proximo paso: Firmar el APK de Release (si aplica)
echo.
pause
