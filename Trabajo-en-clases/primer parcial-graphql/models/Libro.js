// models/Libro.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  autor: DataTypes.STRING,
  editorial: DataTypes.STRING,
  anio: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  numero_pagina: DataTypes.INTEGER
}, {
  timestamps: false
});

module.exports = Libro;
