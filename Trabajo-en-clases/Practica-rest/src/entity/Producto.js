const { EntitySchema } = require("typeorm");

module.exports.Producto = new EntitySchema({
  name: "Producto",
  tableName: "productos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    descripcion: {
      type: "varchar",
    },
    nombre: {
      type: "varchar",
    },
    stock: {
      type: "int",
    },
    precio_unitario: {
      type: "decimal",
    },	
  },
});
