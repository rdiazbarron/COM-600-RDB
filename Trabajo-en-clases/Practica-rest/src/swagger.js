// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Facturas",
      version: "1.0.0",
      description: "Documentación de la API para gestionar facturas, clientes y productos"
    }
  },
  apis: [path.join(__dirname, "routes", "*.js")]// Ruta donde están tus controladores documentados
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
console.log("Rutas Swagger cargadas:", swaggerSpec.paths);
