const {User, validate} = require('../Models/user.js');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// @route   POST /api/users/register
// @desc    Register user
// @access  public
// Asynchronous function to allows ES7 features like async/await to be used
router.post("/", async (req,res) => {
    res.send("I post stuff, cool huh")
});

module.exports = router;
