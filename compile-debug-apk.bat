@echo off
REM Monitorea el proceso de compilación Gradle
REM Se ejecuta desde el directorio raiz del proyecto

color 0A
cls

echo.
echo ======================================================
echo    MONITOREANDO COMPILACION DE GRADLE
echo ======================================================
echo.
echo La compilacion puede tardar varios minutos (5-15 min)
echo No cierres esta ventana hasta que veas "BUILD SUCCESSFUL"
echo.

cd android

REM Limpiar builds anteriores
echo [1/2] Limpiando builds anteriores...
call gradlew.bat clean

REM Compilar APK debug (mas rapido para testing)
echo.
echo [2/2] Compilando APK Debug...
echo Esta es la version de DEBUG. Luego puedes compilar RELEASE.
echo.
call gradlew.bat assembleDebug

cd ..

echo.
if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    echo ======================================================
    echo              BUILD COMPLETADO CON EXITO
    echo ======================================================
    echo.
    echo Tu APK de DEBUG esta en:
    echo   android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo Puedes instalar en un dispositivo/emulador con:
    echo   adb install -r android\app\build\outputs\apk\debug\app-debug.apk
    echo.
) else (
    echo ======================================================
    echo              ERROR EN LA COMPILACION
    echo ======================================================
    echo.
    echo No se genero el APK. Revisa los errores arriba.
    echo.
)

pause
