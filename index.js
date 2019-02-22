require('dotenv').config();
//Requiring the dependencies used within this module
const mongoose = require('mongoose');
const morgan = require('morgan')
const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');

/* 
Enviroment variables configuration:
- Requires the configuration keys
- If the config is false (Not in the project directory) show the error message and exit the process.
*/
const config = require('./Config/keys');
if(!config) {
    console.error('Fatal error, the enviroment variables are incorrect');
    process.exit(1);
}

app.use(passport.initialize());


//Passport middleware configuration
require('./Middleware/passport')(passport);


// Requiring the user controller
const userController = require('./controllers/users');
const testController = require('./controllers/test');

//Requiring enviroment keys
const db = require('./config/keys.js');

//Configuring the dependencies
app.use(helmet()); 
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
mongoose.set('useCreateIndex', true);

//Configuring the routes
app.use('/api/test', testController);
app.use('/api/users', userController);  

//Configuring the database
mongoose.connect(`${db.mongoURL}`, {useNewUrlParser: true})

    //After connecting show the message
    .then(() => {
        console.log('You are connected MongoDB...')
    })

    //Any errors the catch promise will be use
    .catch(() => {
        console.log('Could not connect to MongoDB...')
    })

// Configuring the port number:
// process.env.PORT is specific to a nodejs cloud enviroment variable
// 3000 is the loca port which will be used for running the server within your enviroment
const port = process.env.PORT || 3000; 

// Express starts listening on the port use
app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
})