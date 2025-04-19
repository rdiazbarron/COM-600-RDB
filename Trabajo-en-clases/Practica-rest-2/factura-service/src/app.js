require('dotenv').config();
const express = require("express");
const connectDB = require("./database");
const path = require("path");
const clienteRoutes = require("./routes/clienteRoutes");
const productoRoutes = require("./routes/productoRoutes");
const facturaRoutes = require("./routes/facturaRoutes");
const detalleRoutes = require("./routes/detalleRoutes")
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");



const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Rutas
app.use("/clientes", clienteRoutes);
app.use("/productos", productoRoutes);
app.use("/facturas", facturaRoutes);
app.use("/detalles",detalleRoutes)
app.use("/", (req, res) => {
  res.send("Bienvenido a la página principal!!");
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
