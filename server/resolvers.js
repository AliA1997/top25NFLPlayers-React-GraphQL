//import your Player model to retrieve data from your players collection
const Player = require('./connectors');


//Define how your fields are executed.
const resolvers = {
    Query: {
        players: () => Player.find({}, (err, players) => {
            //If there is an errror retrieving data, and throw error on graphql playground.
            if(err) throw new Error(err);
            return players;
        })
    }
}

//Export your resolvers
module.exports = resolvers;