const express = require('express');
const mysql = require('mysql2/promise');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares para aceptar JSON y habilitar CORS
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const testDBConnection = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Conexión a MySQL exitosa. ✅');
  } catch (error) {
    console.error('Error al conectar con MySQL:', error.message);
    process.exit(1);
  }
};

app.get('/', (req, res) => {
  res.json({ message: '¡El backend está funcionando correctamente!' });
});

app.get('/api/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al consultar la base de datos:', error.message);
    res.status(500).json({ message: 'Error interno del servidor al obtener los usuarios.' });
  }
});

// NUEVA RUTA: Endpoint para formulario de contacto
app.post('/api/contact', async (req, res) => {
  const { name, phone, subject } = req.body;

  if (!name || !phone || !subject) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }

  // Usamos una cuenta de prueba de Ethereal para no exponer credenciales
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const mailOptions = {
      from: `"${name}" <no-reply@example.com>`,
      to: process.env.CONTACT_EMAIL || 'destino@example.com', // El correo de contacto desde .env o uno por defecto
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <h1>Nuevo mensaje del formulario de contacto</h1>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Teléfono:</b> ${phone}</p>
        <p><b>Asunto:</b></p>
        <p>${subject}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Mensaje enviado: %s', info.messageId);
    // La URL para previsualizar el correo enviado en Ethereal
    console.log('URL de previsualización: %s', nodemailer.getTestMessageUrl(info));

    res.json({ message: 'Mensaje enviado correctamente. Se ha utilizado un servicio de prueba.' });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error interno del servidor al enviar el correo.' });
  }
});


app.listen(PORT, () => {
  testDBConnection();
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});