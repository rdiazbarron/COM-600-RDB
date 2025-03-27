const { EntitySchema } = require("typeorm");

module.exports.Usuario = new EntitySchema({
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
      unique: true,
    },
    descripcion: {
      type: "varchar",
    },
    //estado es enum de pendiente, en progreso, completado
    estado: {
      type: "enum",
      enum: ["pendiente", "en progreso", "completado"],
    },
    fecha_creacion:{
      type  : "date",
    }
  },
});
