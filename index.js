const express = require('express');
const app = express();


// Development dependencies initalize
require('./Services/development-dependencies.js')(app);

// Logging middleware initalize
require('./Services/logging.js')();

// Authentication middleware initialize
require('./Services/authentication.js')(app);

// Express route initialize
require('./Services/routes.js')(app);

// Database initialize
require('./Services/database.js')();

// Express initialize
const port = process.env.PORT || 3000; 
const server = app.listen(port, () => {
    console.log('You are connected on port' + port);
});

//Exports the express server for supertest to access
module.exports = server;

