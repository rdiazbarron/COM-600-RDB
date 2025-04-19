const mongoose = require('mongoose');
const Libro = require('./models/Libro');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a la base de datos MongoDB");

    const existe = await Libro.findOne();
    if (!existe) {
      await Libro.create({
        titulo: "Pedro Paramo",
        autor: "Juan Rulfo",
        descripcion: "novela escrita por un autor mexicano",
        editorial: "Plural",
        anio: "2012",
        numero_pagina : 200
        
      });
      console.log("📌 Base y colección biblioteca inicializada");
    }
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
