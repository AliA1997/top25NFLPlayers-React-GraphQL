require('dotenv').config();
//import mongoose to connect to your database.
const mongoose = require('mongoose');
//Assign your SChema instance from mongoose
const Schema = mongoose.Schema;

//COnnect to your database by using a connection string, a options, 
// and a callback that takes an error argument.
mongoose.connect('mongodb://admin:admin1234@ds251112.mlab.com:51112/top-25-nfl-players', { useNewUrlParser: true }, (err) => {
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
