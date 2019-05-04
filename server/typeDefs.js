// import your gql from apollo server to define your type definitions
const { gql } = require('apollo-server');

//Define your type definitions
const typeDefs = gql`
    # Define your Query object type.
    type Query {
        players: [Player]
        # Use an id as argument to get a specified player.
        getPlayer(id: String): Player
    }
    # Define your Mutation object type for creating players.
    type Mutation {
        createPlayer(position: String, name: String, team: String, jerseyNumber: Int, wonSuperBowl: Boolean): Player
        # Use name, position, team, jerseyNumber, and wonSuperBowl as arguments all are optional.
        # And use an id to update the specified player.
        updatePlayer(id: String, name: String, position: String, team: String, jerseyNumber: Int, wonSuperBowl: Boolean): Player
        # Use an id to delete a specified player.
        deletePlayer(id: String): Player
    }
    # Define your Player object type
    # Alter the Player object type, and add a id of type string.
    type Player {
        id: String
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