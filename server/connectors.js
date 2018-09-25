//import mongoose to connect to your database.
const mongoose = require('mongoose');
//Assign your SChema instance from mongoose
const Schema = mongoose.Schema;

//COnnect to your database by using a connection string, a options, 
// and a callback that takes an error argument.
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true }, (err) => {
    // if there is an errror log the error
    if(err) console.log('Connection Error---------', err);
    console.log('Database COnnected');
});

//Define your PLayer model responsible retrieving data from the Player collection.
const player = new Schema({
    position: String,
    name: String,
    team: String,
    jerseyNumber: Number,
    wonSuperBowl: Boolean
});


//Now export your model
module.exports = mongoose.model('Player', player);
