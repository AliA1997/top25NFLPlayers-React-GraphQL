//configure your dotenv file
require('dotenv').config();
//import your ApolloServer to define your graphql server.
//import your typeDefs and resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
//import gql to define your type definitions
const { ApolloServer, gql } = require('apollo-server');
//Define the port your graphql server is listening to.
const PORT = 5000;

//Define your type definition and set your Query object type to your query keyword.
// const typeDefs = gql`
//     # Define your Query object type
//     type Query {
//         hello: String
//     }
//     # Assign your Query object type to your query keyword
//     schema {
//         query: Query
//     }
// `;

//Define your resolvers on how your fields are executed.
// const resolvers = {
//     Query: {
//         hello: () => 'Hello World!'
//     }
// };


//NOw define your apollo server, with your type definitions and resolvers.
const server = new ApolloServer({typeDefs, resolvers});


///Now listen on your server
server.listen({port: PORT}).then(({url}) => {
    console.log("Listening on " + url);
});