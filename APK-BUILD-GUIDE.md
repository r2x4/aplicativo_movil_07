# 📱 Guía de Compilación de APK

## ¿Qué es un APK?

Un **APK** (Android Package Kit) es el formato ejecutable de las aplicaciones Android. Es lo que instalan los usuarios en sus teléfonos.

---

## 📋 Requisitos

### **Instalados Correctamente:**

- ✅ Java JDK 21 o superior
- ✅ Android SDK
- ✅ Gradle 8.13
- ✅ Node.js y npm
- ✅ Ionic CLI 7.2+

### **Configuración Recomendada:**

```
JAVA_HOME = C:\Program Files\Java\jdk-21
ANDROID_HOME = C:\Android\sdk
Path incluya: C:\Android\sdk\build-tools\34.0.0
```

---

## 🚀 Compilar APK - Método Rápido

### **Opción 1: Usar Script Batch (Windows)**

```bash
# Desde la raíz del proyecto
compile-debug-apk.bat
```

### **Opción 2: Terminal Manual**

```bash
# 1. Compilar Angular/Ionic
ionic build --prod

# 2. Sincronizar con Capacitor
npx cap sync android

# 3. Compilar APK Debug
cd android
gradlew.bat assembleDebug

# El APK estará en:
# android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🔐 APK Debug vs APK Release

### **APK Debug**

- ✅ Se compila más rápido (2-5 min)
- ✅ No requiere keystore
- ✅ Perfecto para testing y desarrollo
- ❌ Solo para desarrollo, no para producción

### **APK Release**

- ✅ Optimizado para producción
- ✅ Tamaño más pequeño
- ✅ Preparado para Google Play Store
- ❌ Requiere firma con keystore
- ❌ Se compila más lentamente (5-15 min)

---

## 💾 Compilar APK Release

### **Paso 1: Crear Keystore (Primera vez)**

```bash
keytool -genkey -v -keystore techserve.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias techserve
```

**Datos a ingresar:**

```
First and last name: Tu Nombre
Organization unit: TechServe
Organization: TechServe Solutions
City: Tu Ciudad
State: Tu Estado
Country: MX (código país)
Password: contraseña_segura_123
```

⚠️ **IMPORTANTE:** Guarda este keystore en un lugar seguro. Lo necesitarás cada vez que actualices la app.

### **Paso 2: Compilar APK Release**

```bash
cd android
gradlew.bat assembleRelease
```

### **Paso 3: Firmar APK**

```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore techserve.keystore \
  android\app\build\outputs\apk\release\app-release-unsigned.apk \
  techserve
```

### **Paso 4: Optimizar APK**

```bash
zipalign -v 4 \
  android\app\build\outputs\apk\release\app-release-unsigned.apk \
  android\app\build\outputs\apk\release\app-release.apk
```

**O usar el script:**

```bash
sign-apk.bat
```

---

## 📲 Instalar APK en Dispositivo

### **En Emulador:**

```bash
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

### **En Teléfono Físico:**

1. Conecta el teléfono por USB
2. Habilita "Depuración USB" en Configuración > Opciones de Desarrollador
3. Ejecuta:

```bash
adb install -r android\app\build\outputs\apk\debug\app-debug.apk
```

---

## 🐛 Troubleshooting

### **"Could not move temporary workspace"**

Solución:

```bash
cd android
gradlew.bat clean --refresh-dependencies
gradlew.bat assembleDebug
```

### **"Gradle sync failed"**

```bash
# Limpiar caches
cd android
gradlew.bat clean

# Refrescar dependencias
npm install

# Sincronizar Capacitor
cd ..
npx cap sync android

# Reintentar
cd android
gradlew.bat assembleDebug
```

### **"Android SDK not found"**

Asegúrate de que `ANDROID_HOME` está configurado:

```bash
echo %ANDROID_HOME%
# Debe mostrar: C:\Android\sdk (o tu ruta)
```

### **"Java not found"**

```bash
echo %JAVA_HOME%
# Debe mostrar: C:\Program Files\Java\jdk-21 (o tu versión)
```

### **Puerto 5037 (ADB) en uso**

```bash
adb kill-server
adb start-server
```

---

## 📊 Tamaño de APK

### **Típico para esta app:**

- Debug: 120-150 MB
- Release: 80-100 MB

### **Reducir tamaño:**

```gradle
// En android/app/build.gradle
android {
    bundle {
        density.enableSplit = true
        abi.enableSplit = true
    }
}
```

---

## 🔄 Flujo Completo de Desarrollo

```
Desarrollo              →  Compilar APK Debug
   ↓                          ↓
   ├─ npm start          Instalar en dispositivo
   ├─ npm run lint       Testear en teléfono
   ├─ npm test           ↓
   └─ Ver cambios        Todo funciona?
                              ↓ Sí
                         Compilar APK Release
                              ↓
                         Firmar APK
                              ↓
                         Google Play Store
```

---

## 📦 Subir a Google Play Store

1. **Crear cuenta de desarrollador:** https://play.google.com/apps/publish/
2. **Preparar APK Release** (vea arriba)
3. **Llenar formulario de app:**
   - Nombre
   - Descripción
   - Capturas de pantalla
   - Icono (512x512)
4. **Subir APK**
5. **Completar datos de privacidad y contenido**
6. **Solicitar revisión**

---

## 🎯 Checklist Antes de Subir a Store

- [ ] APK compilado en modo Release
- [ ] APK firmado con keystore
- [ ] Probado en al menos 2 dispositivos diferentes
- [ ] `versionCode` incrementado en `android/app/build.gradle`
- [ ] `versionName` actualizada (ej: 1.0.1)
- [ ] Todos los tests pasando (`npm test`)
- [ ] Sin errores de lint (`npm run lint`)
- [ ] Backend funcionando correctamente
- [ ] Variables de entorno correctas
- [ ] Screenshots y descripción listos

---

## 📞 Recursos

- [Ionic Build & Deploy](https://ionicframework.com/docs/deployment/android)
- [Capacitor Android Guide](https://capacitorjs.com/docs/android)
- [Android Studio Docs](https://developer.android.com/studio/intro)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa los errores exactos en la terminal
2. Busca en Google: `[error exacto] ionic android`
3. Limpia cachés: `gradlew clean --refresh-dependencies`
4. Reinicia Android Studio (si lo usas)
5. Pregunta al equipo
