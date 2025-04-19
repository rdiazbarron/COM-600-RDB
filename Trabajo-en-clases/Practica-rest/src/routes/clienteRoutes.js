const express = require("express");
const router = express.Router();
const clienteController = require("../controller/clienteController");

router.get("/", clienteController.obtenerClientes);
//router.get("/:id", clienteController.obtenerClientePorId);
router.post("/", clienteController.crearCliente);
router.put("/:id", clienteController.editarCliente);
router.delete("/:id", clienteController.eliminarCliente);

module.exports = router;
