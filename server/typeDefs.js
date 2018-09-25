// import your gql from apollo server to define your type definitions
const { gql } = require('apollo-server');

//Define your type definitions
const typeDefs = gql`
    # Define your Query object type.
    type Query {
        players: [Player]
        hello: String
    }
    # Define your Player object type/
    type Player {
        position: String
        name: String
        team: String
        jerseyNumber: Int
        wonSuperBowl: Boolean
    }
    # Assign your Query object type to your query keyword.
    schema {
        query: Query
    }
`;

//Export your type definitions
module.exports = typeDefs;