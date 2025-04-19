const express = require("express");
const router = express.Router();
const facturaController = require("../controller/FacturaController");

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: Lista de facturas
 */

router.get("/", facturaController.obtenerFacturas);
router.post("/", facturaController.crearFactura);
router.put("/:id", facturaController.editarFactura);
router.delete("/:id", facturaController.eliminarFactura);
/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtener una factura con sus detalles
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura con sus detalles
 */
router.get('/:id', facturaController.obtenerFacturaConDetalles);

module.exports = router;
