const { getRepository } = require("typeorm");
const {Tarea} = require("../entity/Tarea");

// Obtener todos los usuarios
const obtenerTareas = async (req, res) => {
  console.log("entro");
  const tareas = await getRepository(Tarea).find();
  console.log(tareas);
  res.json(tareas);
  console.log(tareas);
};

const crearTarea = async (req, res) => {
  const { titulo, descripcion, estado, fecha_creacion } = req.body;
  const nuevaTarea = getRepository(Tarea).create({
    titulo,
    descripcion,
    estado,
    fecha_creacion,
  });
  const resultado = await getRepository(Tarea).save(nuevaTarea);
  res.json(resultado);
};

const editarTarea = async (req, res) => {
  const { titulo, descripcion, estado, fecha_creacion } = req.body;
  const tarea = await getRepository(Tarea).findOne(req.params.id);
  if (tarea) {
    tarea.titulo = titulo;
    tarea.descripcion = descripcion;
    tarea.estado = estado;
    tarea.fecha_creacion = fecha_creacion;
    const resultado = await getRepository(Tarea).save(usuario);
    res.json(resultado);
  } else {
    res.status(404).json({ mensaje: "TAREA no encontrado" });
  }
};

// Eliminar un usuario
const eliminarTarea = async (req, res) => {
  const resultado = await getRepository(Tarea).delete(req.params.id);
  res.json(resultado);
};

module.exports = {
  obtenerTareas,
  crearTarea,
  editarTarea,
  eliminarTarea,
};
