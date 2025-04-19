const { EntitySchema } = require("typeorm");

module.exports.Factura = new EntitySchema({
  name: "Factura",
  tableName: "facturas",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    fecha: {
      type: "date",
    },
    cliente_id: {
      type: "int",
    },
  },
});
