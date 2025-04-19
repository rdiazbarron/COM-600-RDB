const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bd_libros-gql', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
