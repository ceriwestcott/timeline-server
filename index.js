require('dotenv').config();

//Imports
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');

//MongoConnection
mongoose.connect(mongoString);
const database = mongoose.connection;


const app = express();

//Database connection
database.on('error', (error) => {
    console.log('Error connecting to the database', error);
})

database.once('connected', () => {
    console.log('Connected to the database');
})


//Server
app.use(express.json());


app.use('/api', routes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
