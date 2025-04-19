const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
      titulo: { type: String, required: true, unique: false },
      autor : { type: String, required : true, unique: false},
  editorial : { type: String, required : false, unique : false},
        anio: { type: String, required : false, unique : false},
 descripcion: { type: String, required : false, unique : false },
 numero_pagina: {type: Number, required: false, unique : false }

})

module.exports = mongoose.model('Libro', libroSchema);
