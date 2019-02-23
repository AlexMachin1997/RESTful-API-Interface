 //Requiring the dependencies used within this module
const express = require('express');
const app = express();

// Development dependencies initalize
require('./servcies/development-dependencies')();

// Logging middleware initalize
require('./servcies/logging')();

// Authentication middleware initialize
require('./servcies/authentication')(app);

// Express route initialize
require('./servcies/routes')(app);

// Database initialize
require('./servcies/database')();

// Express initialize
const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
})