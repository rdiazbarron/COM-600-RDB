const { getRepository } = require("typeorm");
//const bcrypt = require("bcrypt");
const { Tarea } = require("../entity/Tarea");

// Obtener todos los usuarios
const obtenerTareas = async (req, res) => {
   const tareas = await getRepository(Tarea).find();
  res.json(tareas);
    // const usuarios = await getRepository(Usuario).find();
    // res.render("usuarios/index", { usuarios });
};

// Crear un nuevo usuario
const crearTarea = async (req, res) => {
  const { titulo, descripcion, estado, fecha_creacion } = req.body;
  //const hashedPassword = await bcrypt.hash(contraseña, 10);
  const nuevaTarea = getRepository(Tarea).create({
    titulo,
    descripcion,
    estado,
    fecha_creacion,
  });
  const resultado = await getRepository(Tarea).save(nuevaTarea);
  res.json(resultado);
};

// Actualizar un usuario
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
