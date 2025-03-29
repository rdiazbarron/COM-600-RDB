const express = require("express");
const router = express.Router();
const controlador = require("../controller/tareaController");

router.get("/", controlador.obtenerTareas);
router.post("/", controlador.crearTarea);
router.put("/:id", controlador.editarTarea);
router.delete("/:id", controlador.eliminarTarea);

module.exports = router;
