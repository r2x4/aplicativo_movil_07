# 🔧 Backend - TechServe Solutions

Backend Node.js + Express para la aplicación TechServe Solutions. Maneja autenticación, CRUD de servicios y formulario de contacto.

## 📋 Requisitos

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **MySQL**: >= 5.7

## 🚀 Instalación Rápida

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Copia `.env.example` a `.env` y actualiza los valores:
```bash
cp .env.example .env
```

**Variables requeridas:**
```env
DB_HOST=localhost        # Host de MySQL
DB_USER=root            # Usuario de MySQL
DB_PASSWORD=            # Contraseña de MySQL
DB_NAME=aplicativo_movil_07  # Nombre de la BD
CONTACT_EMAIL=tu@email.com   # Email para formulario de contacto
PORT=3000               # Puerto del servidor
NODE_ENV=development    # development | production
```

### 3. Iniciar servidor

**Desarrollo (con hot-reload):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

## 📡 Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/usuarios` | Listar usuarios |
| POST | `/api/contact` | Enviar formulario de contacto |

### POST `/api/contact`
Envía un mensaje de contacto. Requiere:
```json
{
  "name": "Juan",
  "phone": "3001234567",
  "subject": "Consulta sobre servicios"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Mensaje enviado correctamente. Se ha utilizado un servicio de prueba."
}
```

## 🔌 Conexión desde Frontend

El frontend Angular/Ionic se conecta a `http://localhost:3000` por defecto.

**Configurar URL del backend:**
Edita `src/environments/environment.ts`:
```typescript
export const environment = {
  apiUrl: 'http://localhost:3000'
};
```

## 🛡️ Seguridad

### Mejoras recomendadas:
- [ ] Instalar `helmet` para cabeceras de seguridad
- [ ] Agregar `express-rate-limit` para throttling
- [ ] Implementar `express-validator` para validación de inputs
- [ ] Usar CORS restringido (origen específico)
- [ ] Implementar autenticación JWT

### Instalación de mejoras:
```bash
npm install helmet express-rate-limit express-validator bcryptjs jsonwebtoken
```

## 📝 Logs

Los logs se envían a la consola. Para producción, considera usar:
- `pino` - Logger de alto rendimiento
- `winston` - Logger versátil

## 🧪 Tests

Actualmente no hay tests. Para agregar:
```bash
npm install --save-dev jest supertest
```

## 📦 Scripts disponibles

```bash
npm start      # Inicia el servidor (producción)
npm run serve  # Alias para start
npm run dev    # Inicia con nodemon (desarrollo)
npm test       # Ejecutar tests (no configurado)
```

## 🔄 Desarrollo Completo (Frontend + Backend)

Desde la **raíz del proyecto**:
```bash
npm run dev
```

Esto inicia:
- Backend en `http://localhost:3000`
- Frontend en `http://localhost:4200`

## 🐛 Troubleshooting

### Error: "Conexión a MySQL exitosa ❌"
- Verifica que MySQL está corriendo
- Comprueba credenciales en `.env`
- Valida que la base de datos existe

### Error: CORS
- Verifica que el backend está corriendo
- Revisa `origin` en configuración de CORS en `server.js`

### Error: "Puerto 3000 en uso"
- Cambia `PORT` en `.env`
- O termina el proceso en ese puerto:
  ```bash
  netstat -ano | findstr :3000  # Windows
  lsof -i :3000                 # Mac/Linux
  ```

## 📚 Recursos

- [Express Documentation](https://expressjs.com/)
- [MySQL2 Documentation](https://github.com/sidorares/node-mysql2)
- [Nodemailer Documentation](https://nodemailer.com/)
- [dotenv Documentation](https://github.com/motdotla/dotenv)

## 👤 Autor
Equipo TechServe Solutions

## 📄 Licencia
ISC
