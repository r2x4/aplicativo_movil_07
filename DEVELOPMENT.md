# 🛠️ Guía de Desarrollo - TechServe Solutions

## 📍 Estructura del Proyecto

```
aplicativo_movil_07/
├── src/                    # Frontend Angular/Ionic
│   ├── app/
│   ├── assets/
│   └── environments/
├── mi-backend/             # Backend Node.js/Express
│   ├── server.js
│   ├── .env
│   └── package.json
├── package.json            # Scripts de raíz
├── start.bat               # Iniciar todo (Windows)
├── start.sh                # Iniciar todo (Mac/Linux)
└── setup.bat               # Instalación inicial (Windows)
```

---

## 🚀 Primeras Ejecuciones

### **Primera vez - Setup Completo (Windows):**

```bash
# Doble clic en:
setup.bat

# O en terminal:
npm install                 # Frontend
cd mi-backend && npm install # Backend
cd ..
```

### **Primera vez - Setup Completo (Mac/Linux):**

```bash
npm install
cd mi-backend && npm install
cd ..
```

---

## ▶️ Iniciar Desarrollo

### **Opción 1: Ambos a la vez (Recomendado)**

**Windows - Doble clic:**

```
start.bat
```

**Terminal (cualquier SO):**

```bash
npm run dev
```

### **Opción 2: Separado (Debugging)**

**Terminal 1 - Frontend:**

```bash
npm start
# Abierto en: http://localhost:4200
```

**Terminal 2 - Backend:**

```bash
cd mi-backend
npm start          # O: npm run dev (con hot-reload)
# Abierto en: http://localhost:3000
```

---

## 📝 Scripts Disponibles

### **Desde raíz (`c:\aplicativo_movil_07\`):**

| Comando           | Descripción                              |
| ----------------- | ---------------------------------------- |
| `npm start`       | Inicia solo el frontend                  |
| `npm run dev`     | Inicia frontend + backend (concurrently) |
| `npm run backend` | Inicia solo el backend                   |
| `npm run lint`    | Ejecuta ESLint                           |
| `npm test`        | Ejecuta tests (Karma)                    |
| `npm run build`   | Build de producción                      |

### **Desde backend (`c:\aplicativo_movil_07\mi-backend\`):**

| Comando         | Descripción                                 |
| --------------- | ------------------------------------------- |
| `npm start`     | Inicia servidor Node (producción)           |
| `npm run dev`   | Inicia con nodemon (desarrollo, hot-reload) |
| `npm run serve` | Alias para start                            |

---

## 🔧 Configuración

### **Variables de Entorno - Backend**

Archivo: `mi-backend/.env`

```env
# Base de Datos
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Dragon2307*
DB_NAME=aplicativo_movil_07

# Email
CONTACT_EMAIL=tu_correo@example.com

# Servidor
PORT=3000
NODE_ENV=development
```

### **Rutas de Conexión - Frontend**

Archivo: `src/environments/environment.ts`

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:3000", // Backend URL
};
```

---

## 🔗 Endpoints Principales del Backend

```
GET    /                    # Health check
GET    /api/usuarios        # Listar usuarios
POST   /api/contact         # Enviar formulario de contacto
```

---

## 🐛 Debugging

### **Frontend - Chrome DevTools**

1. Abre: http://localhost:4200
2. Presiona: `F12`
3. Network → verifica peticiones a `http://localhost:3000`
4. Console → revisa errores

### **Backend - Logs en Terminal**

```bash
# Con nodemon (recomendado):
cd mi-backend && npm run dev

# Ver logs:
# - Conexión a BD: "Conexión a MySQL exitosa. ✅"
# - Errores en servidor automáticamente visibles
```

### **Database - MySQL**

```bash
# Acceder a BD:
mysql -u root -p
USE aplicativo_movil_07;
SELECT * FROM usuarios;
```

---

## 📦 Instalar Dependencias Nuevas

### **Frontend:**

```bash
npm install nombre-paquete
# O para devDependencies:
npm install --save-dev nombre-paquete
```

### **Backend:**

```bash
cd mi-backend
npm install nombre-paquete
cd ..
```

---

## 🧪 Tests

### **Ejecutar tests:**

```bash
npm test
# Se abre Karma en navegador
# Presiona Ctrl+C para salir
```

### **Lint:**

```bash
npm run lint
# Muestra errores y warnings
```

---

## 🔄 Git Workflow

### **Hacer commit:**

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
```

### **Crear rama para features:**

```bash
git checkout -b feature/nombre-feature
# ... hacer cambios ...
git add .
git commit -m "feat: descripción"
git push origin feature/nombre-feature
# Luego hacer Pull Request en GitHub
```

---

## 📱 Probar en Dispositivo/Emulador

### **Android Emulator:**

```bash
# Asegúrate que emulador está corriendo
ionic serve --external

# O construir APK:
ionic build android
ionic cap build android
```

### **iOS (solo en Mac):**

```bash
ionic build ios
ionic cap build ios
```

---

## 🚨 Problemas Comunes

### **"Error: Cannot find module 'express'"**

```bash
cd mi-backend
npm install
```

### **"CORS error en el navegador"**

- Verifica que backend está corriendo en `http://localhost:3000`
- Revisa Network tab en DevTools

### **"MySQL connection failed"**

- Verifica que MySQL está corriendo
- Revisa credenciales en `mi-backend/.env`
- Confirma que la BD existe: `USE aplicativo_movil_07;`

### **"Puerto 3000 ya está en uso"**

```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <numero_PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <numero_PID>
```

### **"nodemon: comando no encontrado"**

```bash
cd mi-backend
npm install
cd ..
```

---

## 📚 Recursos Útiles

- [Angular Docs](https://angular.io/docs)
- [Ionic Docs](https://ionicframework.com/docs)
- [Express Docs](https://expressjs.com/)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [Nodemailer Docs](https://nodemailer.com/)

---

## 👥 Equipo

- **Frontend**: Angular 20, Ionic 8, TypeScript
- **Backend**: Node.js, Express 5
- **BD**: MySQL
- **CI/CD**: GitHub Actions (por configurar)

---

## 📞 Soporte

Si tienes problemas:

1. Revisa esta guía
2. Chequea los logs en terminal
3. Abre un Issue en GitHub
4. Pregunta al equipo en Discord/Slack
