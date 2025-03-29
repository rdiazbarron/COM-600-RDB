const { EntitySchema } = require("typeorm");

const Tarea = new EntitySchema({
  name: "Tarea",
  tableName: "tareas",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    titulo: {
      type: "varchar",
    },
    descripcion: {
      type: "varchar",
    },
    estado: {
      type: "varchar",
    },
    fecha_creacion: {
      type: "datetime",
    },
  },
});

module.exports = {
  Tarea,
};
