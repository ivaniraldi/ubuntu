const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(compression()); // Comprimir respuestas
app.use(morgan('dev')); // Registro de solicitudes
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Limitar orígenes en producción
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json()); // Soporte para JSON en POST
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Catch-all para servir el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});