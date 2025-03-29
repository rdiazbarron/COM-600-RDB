const mongoose = require('mongoose');
const Tarea = require('./models/Tarea');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a la base de datos MongoDB");

    const existe = await Tarea.findOne();
    if (!existe) {
      await Tarea.create({
        titulo: "Tarea de ejemplo",
        descripcion: "ejemplo",
        estado: "pendiente"
      });
      console.log("📌 Base y colección 'tareas' inicializadas");
    }
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
