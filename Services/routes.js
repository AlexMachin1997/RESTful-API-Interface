const express = require('express');
const userController = require('../Controllers/users');
const helloController = require('../Controllers/hello');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function(app) {
    app.use(cors());
    app.use(helmet()); 
    app.use(express.json());
    app.use('/api/users', userController);  
    app.use('/api/hello', helloController);
}