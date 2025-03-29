const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true, unique: true },
  descripcion: String,
  estado: {
    type: String,
    enum: ["pendiente", "en progreso", "completado"],
    default: "pendiente"
  },
  fecha_creacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tarea', tareaSchema);
