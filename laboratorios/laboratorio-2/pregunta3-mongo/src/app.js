require('dotenv').config();
const express = require("express");
const connectDB = require("./database");
const tareaRoutes = require("./routes/tareaRoutes");

const app = express();

// Middleware de parseo más básico
app.use((req, res, next) => {
  if (req.method === 'GET') {
    return next(); // Omitir parsing para GET
  }
  
  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    try {
      req.body = data ? JSON.parse(data) : {};
      next();
    } catch (e) {
      next(e);
    }
  });
});

// Rutas
app.use("/tareas", tareaRoutes);

// Ruta raíz simple
app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la página principal");
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error('Error detectado:', err);
  res.status(500).send('Error en el servidor');
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});