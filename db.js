const mongoose = require('mongoose');

const mongo_url = 'mongodb+srv://excellentayomide:excell@pomo.4swla.mongodb.net/Pomo';

const connectDB = () => {
    mongoose.connect(mongo_url);
    mongoose.connection.on('connected', () => {
        console.log('App connected to Database successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Connection Error:', err);
    });
}

module.exports = connectDB;
