@echo off
REM Script para instalar el APK en un dispositivo/emulador Android
REM Uso: Ejecuta este script y selecciona qué quieres hacer

color 0A
cls

echo.
echo ======================================================
echo      INSTALADOR DE APK - TECHSERVE SOLUTIONS
echo ======================================================
echo.

REM Verificar que el APK existe
if not exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    echo [ERROR] APK no encontrado en:
    echo         android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Debes compilar primero con: build-apk.bat
    pause
    exit /b 1
)

echo [OK] APK encontrado:
echo      android\app\build\outputs\apk\debug\app-debug.apk
echo      Tamaño: 4.79 MB
echo.
echo ======================================================
echo.

echo Opciones:
echo 1. Listar dispositivos/emuladores conectados
echo 2. Instalar APK en dispositivo
echo 3. Reinstalar APK (desinstalar + instalar)
echo 4. Desinstalar aplicación
echo 5. Ver logs en tiempo real
echo 6. Salir
echo.

set /p option="Selecciona una opcion (1-6): "

if "%option%"=="1" goto list_devices
if "%option%"=="2" goto install
if "%option%"=="3" goto reinstall
if "%option%"=="4" goto uninstall
if "%option%"=="5" goto logs
if "%option%"=="6" goto end

echo [ERROR] Opcion invalida
pause
exit /b 1

:list_devices
echo.
echo [INFO] Dispositivos disponibles:
echo.
adb devices
echo.
pause
goto end

:install
echo.
echo [INFO] Instalando APK...
echo.
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
echo.
if errorlevel 1 (
    echo [ERROR] No se pudo instalar el APK
) else (
    echo [OK] APK instalado exitosamente
    echo.
    echo Abriendo aplicacion...
    adb shell am start -n com.techserve.movil/com.techserve.movil.MainActivity
)
pause
goto end

:reinstall
echo.
echo [INFO] Desinstalando aplicacion anterior...
echo.
adb uninstall com.techserve.movil
echo.
echo [INFO] Instalando APK nuevo...
echo.
adb install android\app\build\outputs\apk\debug\app-debug.apk
echo.
if errorlevel 1 (
    echo [ERROR] No se pudo instalar el APK
) else (
    echo [OK] APK reinstalado exitosamente
)
pause
goto end

:uninstall
echo.
echo [INFO] Desinstalando aplicacion...
echo.
adb uninstall com.techserve.movil
echo.
if errorlevel 1 (
    echo [ERROR] No se pudo desinstalar
) else (
    echo [OK] Aplicacion desinstalada
)
pause
goto end

:logs
echo.
echo [INFO] Mostrando logs en tiempo real...
echo Presiona Ctrl+C para salir
echo.
adb logcat | findstr "TechServe"
goto end

:end
cls
