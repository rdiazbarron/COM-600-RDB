const express = require("express");
const router = express.Router();
const controlador = require("../controller/libroController");

router.get("/", controlador.obtenerLibros);
router.post("/", controlador.crearLibro);
router.put("/:id", controlador.editarLibro);
router.delete("/:id", controlador.eliminarLibro);

module.exports = router;
