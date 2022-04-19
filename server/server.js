const express = require('express');
//bring in Apollo:
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

//bring in the typeDefs and resolvers:
const { typeDefs, resolvers } = require('./schemas');


const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  //create new apollo server and pass in the schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });

  //start the server
  await server.start();

  //intergrate apollo with express as middleware
  server.applyMiddleware({ app });

  //give the user the site to test the GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

//initializa apollo
startServer();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
