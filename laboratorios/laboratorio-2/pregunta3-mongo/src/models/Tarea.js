const mongoose = require('mongoose');
let validator = require('validator')

const tareaSchema = new mongoose.Schema({//un esquema en mongoose define las propiedades de un documento..... lo que en sql sería una tabla
  // en mysql que es un db relacional estan las tablas y en mongo estan las colecciones
  titulo: { type: String, required: true, unique: false },
  descripcion: { type: String, required : false },
  estado: { type: String, enum: ["pendiente", "en progreso", "completado"], default: "pendiente" },
  fecha_creacion: { type: Date, default: Date.now, validate: (value) => {return validator.isDate(value) }}
});

module.exports = mongoose.model('Tarea', tareaSchema);
