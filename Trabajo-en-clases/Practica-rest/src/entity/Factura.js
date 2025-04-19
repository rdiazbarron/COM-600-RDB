const { EntitySchema } = require("typeorm");
const { Cliente } = require("./Cliente"); 
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
  },
  relations: {
    cliente: {
      target: "Cliente",
      type: "many-to-one",
      joinColumn: {
        name: "cliente_id",
        referencedColumnName: "id",
      },
    },
  },
});
