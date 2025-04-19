const { getRepository } = require("typeorm");
const { Cliente } = require("../entity/Cliente");

// Obtener todos los clientes
const obtenerClientes = async (req, res) => {
  const clientes = await getRepository(Cliente).find();
  res.json(clientes);
    // const clientes = await getRepository(Cliente).find();
    // res.render("clientes/index", { clientes });
};

// Crear un nuevo Cliente
const crearCliente = async (req, res) => {
  const { ci, nombres, apellidos, sexo} = req.body;
  //const hashedPassword = await bcrypt.hash(contraseña, 10);
  const nuevoCliente = getRepository(Cliente).create({
    ci,
    nombres,
    apellidos,
    sexo,
  });
  const resultado = await getRepository(Cliente).save(nuevoCliente);
  res.json(resultado);
};

// Actualizar un Cliente
const editarCliente = async (req, res) => {
  const id = parseInt(req.params.id)
  const { ci, nombres, apellidos, sexo} = req.body;
  const cliente = await getRepository(Cliente).findOne( {where: {id} });
  if (cliente) {
    cliente.ci = ci;
    cliente.nombres = nombres;
    cliente.apellidos = apellidos;
    cliente.sexo = sexo;
    const resultado = await getRepository(Cliente).save(cliente);
    res.json(resultado);
  } else {
    res.status(404).json({ mensaje: "Cliente no encontrado" });
  }
};

// Eliminar un Cliente
const eliminarCliente = async (req, res) => {
  const resultado = await getRepository(Cliente).delete(req.params.id);
  res.json(resultado);
};

module.exports = {
  obtenerClientes,
  crearCliente,
  editarCliente,
  eliminarCliente,
};
