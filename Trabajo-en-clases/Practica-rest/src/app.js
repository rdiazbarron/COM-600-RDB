require('dotenv').config();
const express = require("express");
const connectDB = require("./database");
const clienteRoutes = require("./routes/clienteRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");



const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Rutas
app.use("/clientes", clienteRoutes);
app.use("/", (req, res) => {
  res.send("Bienvenido a la página principal!!");
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
