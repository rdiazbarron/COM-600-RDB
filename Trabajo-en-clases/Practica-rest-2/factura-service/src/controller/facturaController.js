const { getRepository } = require("typeorm");
const { Factura } = require("../entity/Factura");
const { Cliente } = require("../entity/Cliente")
const { Detalle} = require("../entity/Detalle")
// Obtener todos los Facturas
const obtenerFacturas = async (req, res) => {
  try {
    const facturas = await getRepository(Factura).find();

    // Opcional: traer los datos de cliente de forma individual
    const facturasConCliente = await Promise.all(
      facturas.map(async (factura) => {
        try {
          const clienteRes = await axios.get(`http://clientes-service:3001/clientes/${factura.cliente_id}`);
          return {
            ...factura,
            cliente: clienteRes.data,
          };
        } catch {
          return {
            ...factura,
            cliente: null,
          };
        }
      })
    );

    res.json(facturasConCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener facturas" });
  }
};


// const obtenerFacturaConDetalles = async (req, res) => {
//   const facturaId = parseInt(req.params.id);

//   try {
//     const factura = await getRepository(Factura).findOne({ where: { id: facturaId } });

//     if (!factura) {
//       return res.status(404).json({ mensaje: "Factura no encontrada" });
//     }

//     const detalles = await getRepository(Detalle).find({
//       where: { Factura: { id: facturaId } },
//       relations: ["Producto"],
//     });

//     // Armar respuesta combinada
//     res.json({
//       factura,
//       detalles,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ mensaje: "Error al obtener la factura con sus detalles" });
//   }
// };

// Crear un nuevo Factura

const crearFactura = async (req, res) => {
  const { fecha, cliente_id } = req.body;

  try {
    // Validamos que el cliente exista haciendo una petición al servicio de clientes
    const response = await axios.get(`http://clientes-service:3001/clientes/${cliente_id}`);
    const cliente = response.data;

    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    const nuevaFactura = getRepository(Factura).create({
      fecha,
      cliente_id
    });

    const resultado = await getRepository(Factura).save(nuevaFactura);
    res.json(resultado);

  } catch (error) {
    console.error(error.message);
    res.status(404).json({ mensaje: "Error al validar cliente o crear factura" });
  }
};

const editarFactura = async (req, res) => {
  const id = parseInt(req.params.id);
  const { fecha, cliente_id } = req.body;

  try {
    const factura = await getRepository(Factura).findOne({ where: { id } });
    const clienteNuevo = await getRepository(Cliente).findOne({ where: { id: cliente_id } });

    if (!factura || !clienteNuevo) {
      return res.status(404).json({ mensaje: "Factura o Cliente no encontrado" });
    }

    factura.fecha = fecha;
    factura.cliente = clienteNuevo;

    const resultado = await getRepository(Factura).save(factura);
    res.json(resultado);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar la factura" });
  }
};

// Eliminar un Factura
const eliminarFactura = async (req, res) => {
  const id = parseInt(req.params.id);
  const resultado = await getRepository(Factura).delete( {where : {id}});
  res.json(resultado);
};

module.exports = {
  obtenerFacturas,
  crearFactura,
  editarFactura,
  eliminarFactura,
  obtenerFacturaConDetalles
};
