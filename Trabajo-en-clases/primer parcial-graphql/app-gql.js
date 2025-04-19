require('dotenv').config();
const express = require("express");
const connectDB = require("./database");
//const libroRoutes = require("./routes/libroRoutes");
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql');
// let libros =[
//   {id:1, autor:"adsad",editorial:"adasdas",anio:"2012", descripcion: "adsasda", numero_pagina: 120}
// ]
const Libro = require('./models/Libro');

const LibroType = new GraphQLObjectType({
  name: 'Libro',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    autor: { type: GraphQLNonNull(GraphQLString) },
    editorial: { type: GraphQLNonNull(GraphQLString) },
    anio: { type: GraphQLNonNull(GraphQLString) },
    descripcion: { type: GraphQLNonNull(GraphQLString) },
    numero_pagina: { type: GraphQLNonNull(GraphQLInt) }

  })
});


// Root Query
const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    libros: {
      type: GraphQLList(LibroType),
      resolve: async() => await Libro.findAll()
    },
    libro: {
      type: LibroType,
      args: { id: { type: GraphQLInt } },
      resolve: async (_, args) => await Libro.findByPk(args.id)
    }
  }
});

// Mutación
const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    agregarLibro: {
      type: LibroType,
      args: {
        autor: { type: GraphQLNonNull(GraphQLString) },
        editorial: { type: GraphQLNonNull(GraphQLString) },
        anio: { type: GraphQLNonNull(GraphQLString) },
        descripcion: { type: GraphQLNonNull(GraphQLString) },
        numero_pagina: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: async (_, args) => {
        const nuevoLibro = await Libro.create(  {
          autor: args.autor,
          editorial: args.editorial,
          anio: args.anio.GraphQLInt,
          descripcion: args.descripcion,
          numero_pagina: args.numero_pagina

        });
        //libros.push(nuevoLibro);
        return nuevoLibro;
      }
    }
  }
});

// Esquema
const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType
});


const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

const sequelize = require('./database');
sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log('Servidor GraphQL en http://localhost:4000/graphql');
  });
});