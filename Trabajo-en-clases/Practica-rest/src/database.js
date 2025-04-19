const { createConnection } = require("typeorm");
const { Cliente } = require("./entity/Cliente");
const {Factura } = require("./entity/Factura");
const {Producto} = require("./entity/Producto");
const {Detalle} = require("./entity/Detalle");


const connectDB = async () => {
  try {
    await createConnection({
      type: "mysql",
      host: process.env.DB_HOST, 
      port: process.env.DB_PORT, // Puerto de MySQL (por defecto)
      username: process.env.DB_USER, 
      password: process.env.DB_PASS,
      database: process.env.DB_NAME, //Base de datos
      entities: [Cliente, Factura, Producto, Detalle], 
      synchronize: true, // Solo para desarrollo (crea automáticamente las tablas)
    });
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
