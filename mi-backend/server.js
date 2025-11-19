// server.js

// 1. Importamos la librería Express que ya instalaste
const express = require('express');
const mysql = require('mysql2/promise'); // Usamos la versión con promesas de mysql2
require('dotenv').config(); // Carga las variables de entorno del archivo .env

// 2. Creamos una instancia de la aplicación Express
const app = express();

// 3. Definimos el puerto donde nuestro servidor escuchará las peticiones.
const PORT = process.env.PORT || 3000;

// Creamos un "pool" de conexiones. Es más eficiente que crear una conexión por cada consulta.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para probar la conexión a la base de datos
const testDBConnection = async () => {
  try {
    await pool.query('SELECT 1'); // Hacemos una consulta simple para probar la conexión
    console.log('Conexión a MySQL exitosa. ✅');
  } catch (error) {
    console.error('Error al conectar con MySQL:', error.message);
    process.exit(1);
  }
};

// 4. Creamos nuestra primera "ruta" o "endpoint".
app.get('/', (req, res) => {
  res.json({ message: '¡El backend está funcionando correctamente!' });
});

// NUEVA RUTA: Obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    // Usamos el pool de conexiones para hacer una consulta
    const [rows] = await pool.query('SELECT * FROM usuarios');
    // Enviamos los resultados como respuesta JSON
    res.json(rows);
  } catch (error) {
    // Si hay un error, lo mostramos en la consola y enviamos un error 500
    console.error('Error al consultar la base de datos:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener los usuarios.' });
  }
});

// 5. Iniciamos el servidor para que empiece a escuchar en el puerto que definimos.
app.listen(PORT, () => {
  testDBConnection(); // Probamos la conexión a la BD al iniciar
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});