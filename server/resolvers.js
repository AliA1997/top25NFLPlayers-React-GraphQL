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
    },
    Mutation: {
        //THe callback for mutation resolvers has obj, context, args, and info arguments. 
        //In this case we will just use the args, and have the rest of the args in a form of a private variable.
        createPlayer:(_, args) => {
            //We will assign a new model with our position, name, team, jerseyNumber, and wonSuperBowl argument from the mutation.
            const newPlayer = new Player({
                position: args.position,
                name: args.name,
                team: args.team,
                jerseyNumber: args.jerseyNumber,
                wonSuperBowl: args.wonSuperBowl
            });

            //After assigning the variable, save the model to the database.
            newPlayer.save();

            return null;
        }
    }
}

//Export your resolvers
module.exports = resolvers;