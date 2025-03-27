const express = require("express");
const router = express.Router();
const { getRepository } = require("typeorm");
//const bcrypt = require("bcrypt");
const { Tarea } = require("../entity/Tarea");
const controlador = require("../controller/tareaController");

router.get("/", async (req, res) => {
 controlador.obtenerTareas(req, res);
});

router.get("/:id", async (req, res) => {
  const tarea = await getRepository(Tarea).findOneBy({id:req.params.id});
  res.json(tarea);
});;

router.post("/", async (req, res) => {
  console.log("entro");
  const { titulo, descripcion, estado, fecha_creacion } = req.body;
  //const hashedPassword = await bcrypt.hash(contraseña, 10);
  const nuevaTarea = getRepository(Tarea).create({
    titulo,
    descripcion,
    estado,
    fecha_creacion,
  });
  await getRepository(Tarea).save(nuevaTarea);
  res.json(nuevaTarea);
});

router.put("/:id", async (req, res) => {
  console.log("entro");
  const { titulo, descripcion, estado, fecha_creacion } = req.body;
  const tarea = await getRepository(Tarea).findOneBy({id:req.params.id});
  console.log(tarea);
  if (tarea) {
    tarea.titulo = titulo;
    tarea.descripcion = descripcion;
    tarea.estado = estado;
    tarea.fecha_creacion = fecha_creacion;
    await getRepository(Tarea).save(tarea);
  }
  res.json(tarea);
});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  await getRepository(Tarea).delete(req.params.id);
  res.json({ mensaje: "tarea eliminado" });
});

module.exports = router;
