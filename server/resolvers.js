//import your Player model to retrieve data from your players collection
const Player = require('./connectors');


//Define how your fields are executed.
const resolvers = {
    Query: {
        players: () => Player.find({}, (err, players) => {
            //If there is an errror retrieving data, and throw error on graphql playground.
            if(err) throw new Error(err);
            return players;
        }),
        //Use an id to get the specified player
        getPlayer: (_, args) => {
            //Make your callback asynchronous to return the player once it's data is retrieved.
            return Player.findById({_id: args.id}, async (error, playerToReturn) => {
                if(error) {
                    console.log('Get Player Error-------', error);
                    throw new Error(error);
                }
                //Return the specified player you would like to return.
                return await playerToReturn;
            })
        }
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
        },
        //You will use your arguments such as name, position, team, jerseyNumber, and wonSuperBowl to update a
        //player given thier id
        updatePlayer: (_, args) => {
            //Find the by player based on it's id.
            //Make your method in mongoose asynchronous since your player to return when it retrieve the data
            return Player.findByIdAndUpdate({_id: args.id}, {$set: args}, async (error, updatedPlayer) => {
                if(error) {
                    //If there is an error throw an error in yoru graphql console.
                    throw new Error(error);
                }
                //Then return the updatedPlayer.
                return await updatedPlayer;
            });
        },
        //You will use your id argument to delete a player using an id.
        deletePlayer: (_, args) => {
            //Find your player based on it's id, and delete it.
            //Have your callback asynchronous so your can return your deletePlayer once you recieve the data.
            return Player.findByIdAndDelete({_id: args.id}, async (error, deletedPlayer) => {
                if(error) {
                    throw new Error(error);
                }
                console.log('deletedPlayer-------', deletedPlayer);
                //THen return the delete player.
                return await deletedPlayer;
            });
        }
    }
}

//Export your resolvers
module.exports = resolvers;