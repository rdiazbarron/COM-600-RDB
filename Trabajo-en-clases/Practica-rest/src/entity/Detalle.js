const { EntitySchema } = require("typeorm");
const {Factura } = require("./Factura");
const {Producto} = require("./Producto")
module.exports.Detalle = new EntitySchema({
  name: "Detalle",
  tableName: "detalles",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    precio_unitario: {
      type: "decimal"
    },
    
  },
  relations:{
    Factura: {
        target: "Factura",
        type: "many-to-one",
        joinColumn:{
            name: "factura_id",
            referencedColumnName: "id"
        },
    },
    Producto: {
        target: "Producto",
        type: "many-to-one",
        joinColumn:{
            name: "producto_id",
            referencedColumnName: "id"
        }
    }
  },
});
