require('dotenv').config();
const express = require("express");
const connectDB = require("./database");
const path = require("path");
const tareaRoutes = require("./routes/tareaRoutes");



const app = express();

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Rutas
app.use("/tareas", tareaRoutes);
app.use("/", (req, res) => {
  res.send("Bienvenido a la página principal!!");
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
