const { getRepository } = require("typeorm");
const { Producto } = require("../entity/Producto");

// Obtener todos los Productos
const obtenerProductos = async (req, res) => {
  const productos = await getRepository(Producto).find();
  res.json(productos);
    // const Productos = await getRepository(Producto).find();
    // res.render("Productos/index", { Productos });
};

// Crear un nuevo Producto
const crearProducto = async (req, res) => {
  const { descripcion, nombre, stock } = req.body;
  const nuevoProducto = getRepository(Producto).create({
    descripcion,
    nombre,
    stock,
  });
  const resultado = await getRepository(Producto).save(nuevoProducto);
  res.json(resultado);
};

// Actualizar un Producto
const editarProducto = async (req, res) => {

  const { descripcion, nombre, stock } = req.body;
  const id = parseInt(req.params.id);
  if (isNaN(id)) { 
    return res.status(400).json({ mensaje: "ID inválido" });
   }
  const producto = await getRepository(Producto).findOne({ where: { id } });
  if (producto) {
    producto.descripcion = descripcion;
    producto.nombre = nombre;
    producto.stock = stock;
    const resultado = await getRepository(Producto).save(producto);
    res.json(resultado);
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
};


// Eliminar un Producto
const eliminarProducto = async (req, res) => {
  const resultado = await getRepository(Producto).delete(req.params.id);
  res.json(resultado);
};

module.exports = {
  obtenerProductos,
  crearProducto,
  editarProducto,
  eliminarProducto,
};
