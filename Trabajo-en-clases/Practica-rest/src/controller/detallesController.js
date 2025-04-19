const { getRepository } = require("typeorm");
const { Detalle } = require("../entity/Detalle");
const {Factura} = require("../entity/Factura")
const {Producto} = require("../entity/Producto")
// Obtener todos los detalles
const obtenerDetalles = async (req, res) => {
  try { 
    const detalles = await getRepository(Detalle).find({relations: ["Factura", "Producto"]});
    res.json(detalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener los detalles" });
  }
};



// Crear un nuevo Detalle
const crearDetalleFactura = async (req, res) => {
  const { precio_unitario, factura_id, producto_id } = req.body;

  try {
    const factura = await getRepository(Factura).findOne({ where: { id: factura_id } });
    const producto = await getRepository(Producto).findOne({ where: { id: producto_id } });

    if (!factura || !producto) {
      return res.status(404).json({ mensaje: "Factura o Producto no encontrados" });
    }

    const nuevoDetalle = getRepository(Detalle).create({
      precio_unitario,
      Factura: factura,
      Producto: producto,
    });

    const resultado = await getRepository(Detalle).save(nuevoDetalle);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el detalle" });
  }
};


// Actualizar un Detalle
const editarDetalle = async (req, res) => {
  const id = parseInt(req.params.id);
  const { precio_unitario, factura_id, producto_id } = req.body;

  try {
    const detalle = await getRepository(Detalle).findOne(id);
    const factura = await getRepository(Factura).findOne(factura_id);
    const producto = await getRepository(Producto).findOne(producto_id);

    if (!detalle) return res.status(404).json({ mensaje: "Detalle no encontrado" });
    if (!factura || !producto) return res.status(404).json({ mensaje: "Factura o Producto no encontrados" });

    detalle.precio_unitario = precio_unitario;
    detalle.Factura = factura;
    detalle.Producto = producto;

    const resultado = await getRepository(Detalle).save(detalle);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al editar el detalle" });
  }
};


// Eliminar un Detalle
const eliminarDetalle = async (req, res) => {
  try {
    const resultado = await getRepository(Detalle).delete(req.params.id);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el detalle" });
  }
};

module.exports = {
  obtenerDetalles,
  crearDetalleFactura,
  editarDetalle,
  eliminarDetalle
};
