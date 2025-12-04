@echo off
REM Script para firmar el APK de Release
REM Este script requiere que tengas generado un keystore

color 0A
cls

echo.
echo ======================================================
echo      FIRMA DE APK - TECHSERVE SOLUTIONS
echo ======================================================
echo.

REM Verificar si el APK sin firmar existe
if not exist "android\app\build\outputs\apk\release\app-release-unsigned.apk" (
    echo [ERROR] APK sin firmar no encontrado en:
    echo        android\app\build\outputs\apk\release\app-release-unsigned.apk
    echo.
    echo Debes primero compilar con: build-apk.bat
    pause
    exit /b 1
)

REM Solicitar ruta al keystore
echo [INFO] Se requiere un Keystore para firmar el APK.
echo.
echo Si no tienes un keystore, ejecuta:
echo   keytool -genkey -v -keystore techserve.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias techserve
echo.

set /p keystore_path="Ingresa la ruta al keystore: "

if not exist "%keystore_path%" (
    echo [ERROR] El keystore no existe: %keystore_path%
    pause
    exit /b 1
)

set /p alias_name="Ingresa el alias del certificado: "
set /p keystore_pass="Ingresa la contraseña del keystore: "

echo.
echo [INFO] Firmando APK...
echo.

jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore "%keystore_path%" -storepass "%keystore_pass%" android\app\build\outputs\apk\release\app-release-unsigned.apk "%alias_name%"

if errorlevel 1 (
    echo [ERROR] No se pudo firmar el APK
    pause
    exit /b 1
)

echo.
echo [INFO] Optimizando APK firmado...
echo.

call zipalign -v 4 android\app\build\outputs\apk\release\app-release-unsigned.apk android\app\build\outputs\apk\release\app-release.apk

if errorlevel 1 (
    echo [ERROR] No se pudo optimizar el APK
    pause
    exit /b 1
)

echo.
echo ======================================================
echo           APK FIRMADO Y OPTIMIZADO
echo ======================================================
echo.
echo Tu APK esta listo en:
echo   android\app\build\outputs\apk\release\app-release.apk
echo.
pause
