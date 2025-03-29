const { createConnection } = require("typeorm");
const { Tarea } = require("./entity/Tarea");
require('dotenv').config();

const connectDB = async () => {
  try {
    await createConnection({
      type: "mysql",
      host: process.env.DB_HOST, 
      port: process.env.DB_PORT,
      username: process.env.DB_USER, 
      password: process.env.DB_PASS,
      database: process.env.DB_NAME, //Base de datos
      entities: [Tarea], 
      synchronize: true, // Solo para desarrollo (crea automáticamente las tablas)
    });
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
