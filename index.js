require('dotenv').config();
//Requiring the dependencies used within this module
const mongoose = require('mongoose');
const morgan = require('morgan')
const express = require('express');
const app = express();
const helmet = require('helmet');

//Requiring the user routes
const userController = require('./controllers/users');
const testController = require('./controllers/test');

//Configuring the dependencies
app.use(helmet()); 
app.use(morgan('tiny'));
app.use(express.json());
mongoose.set('useCreateIndex', true);

//Configuring the routes
app.use('/api/test', testController);
app.use('/api/users', userController);
    

//Specifies which database to use
const db = require('./config/keys.js');

//Initalizing the database connection
mongoose.connect(`${db.mongoURL}`, {useNewUrlParser: true})

    //After connecting show the message
    .then(() => {
        console.log('You are connected MongoDB...')
    })

    //Any errors the catch promise will be use
    .catch(() => {
        console.log('Could not connect to MongoDB...')
    })

// Setting the port number:
// process.env.PORT is specific to a nodejs cloud enviroment variable
// 3000 is the loca port which will be used for running the server within your enviroment
const port = process.env.PORT || 3000; 

// Express starts listening on the port use
app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
    console.log(`You are connected to this database: ${db.mongoURL}`)
})