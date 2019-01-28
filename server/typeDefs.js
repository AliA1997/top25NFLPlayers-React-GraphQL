// import your gql from apollo server to define your type definitions
const { gql } = require('apollo-server');

//Define your type definitions
const typeDefs = gql`
    # Define your Query object type.
    type Query {
        players: [Player]
    }
    # Define your Mutation object type for creating players.
    type Mutation {
        createPlayer(position: String, name: String, team: String, jerseyNumber: Int, wonSuperBowl: Boolean): Player
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
        mutation: Mutation
    }
`;

//Export your type definitions
module.exports = typeDefs;