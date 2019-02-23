const express = require('express');
const userController = require('../Controllers/users');
const testController = require('../Controllers/test');
const helmet = require('helmet');
const cors = require('cors');

module.exports = function(app) {
    app.use(cors());
    app.use(helmet()); 
    app.use(express.json());
    app.use('/api/test', testController);
    app.use('/api/users', userController);  
}