const Libro = require("../models/Libro");

const obtenerLibros = async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
};

const crearLibro = async (req, res) => {
  const nuevaLibro = new Libro(req.body);
  const resultado = await nuevaLibro.save();
  res.json(resultado);
};

const editarLibro = async (req, res) => {
  const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!libro) return res.status(404).json({ mensaje: "Libro no encontrada" });
  res.json(Libro);
};

const eliminarLibro = async (req, res) => {
  await Libro.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Libro eliminada" });
};

module.exports = {
  obtenerLibros,
  crearLibro,
  editarLibro,
  eliminarLibro,
};
