const express = require("express");
const router = express.Router();
const detalleController = require("../controller/detallesController");


/**
 * @swagger
 * /detalles:
 *   get:
 *     summary: Obtener todos los detalles
 *     tags: [Detalles]
 *     responses:
 *       200:
 *         description: Lista de detalles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   precio_unitario:
 *                     type: number
 *                   Factura:
 *                     type: object
 *                   Producto:
 *                     type: object
 */
router.get("/", detalleController.obtenerDetalles);

/**
 * @swagger
 * /detalles:
 *   post:
 *     summary: Crear un nuevo detalle de factura
 *     tags: [Detalles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - precio_unitario
 *               - factura_id
 *               - producto_id
 *             properties:
 *               precio_unitario:
 *                 type: number
 *               factura_id:
 *                 type: integer
 *               producto_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Detalle creado exitosamente
 */
router.post("/", detalleController.crearDetalleFactura);


/**
 * @swagger
 * /detalles/{id}:
 *   put:
 *     summary: Editar un detalle de factura
 *     tags: [Detalles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - precio_unitario
 *               - factura_id
 *               - producto_id
 *             properties:
 *               precio_unitario:
 *                 type: number
 *               factura_id:
 *                 type: integer
 *               producto_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Detalle actualizado exitosamente
 *       404:
 *         description: Detalle, factura o producto no encontrado
 */

router.put("/:id", detalleController.editarDetalle);

/**
 * @swagger
 * /detalles/{id}:
 *   delete:
 *     summary: Eliminar un detalle de factura
 *     tags: [Detalles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle a eliminar
 *     responses:
 *       200:
 *         description: Detalle eliminado correctamente
 *       404:
 *         description: Detalle no encontrado
 */
router.delete("/:id", detalleController.eliminarDetalle);

module.exports = router;
