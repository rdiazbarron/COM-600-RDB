const Tarea = require("../models/Tarea");

const obtenerTareas = async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
};

const crearTarea = async (req, res) => {
  const nuevaTarea = new Tarea(req.body);
  const resultado = await nuevaTarea.save();
  res.json(resultado);
};

const editarTarea = async (req, res) => {
  const tarea = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!tarea) return res.status(404).json({ mensaje: "TAREA no encontrada" });
  res.json(tarea);
};

const eliminarTarea = async (req, res) => {
  await Tarea.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "TAREA eliminada" });
};

module.exports = {
  obtenerTareas,
  crearTarea,
  editarTarea,
  eliminarTarea,
};
