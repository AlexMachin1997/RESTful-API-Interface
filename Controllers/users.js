const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validateUser} = require('../Models/user.js');
const express = require('express');
const router = express.Router();
const Joi= require('joi');

// @route   POST /api/users/register
// @desc    Register user
// @access  public
// Asynchronous function to allows ES7 features like async/await to be used
router.post("/register", async (req,res) => {

    /* 
    Validating body request: 
    - Object destructring the error object from the Joi validation libaray
    - Validate entire body provided by express 
    */
    const { error } = validateUser(req.body);


    /* 
    Checking for a valid body:
    - If error is true send 404 status and send the first message in the details array to the client
    */
    if(error) return res.status(400).send(error.details[0].message) 
    // if(error) {
    //     return res.status(400).send(error.details[0].message)
    // }



    /* 
    Checking for a duplicate user:
    - Checking the user doesnt already exists
    - Wait for promise to resolve before releasing the thread (Moving on)
    - If user is true (Meaning they do exist), then send them the message below along with state 404
    */
    let user = await User.findOne({email: req.body.email});    
    if(user) return res.status(404).send('A user with the given email already exists!');    
 
    // if(user) {
    //     return res.status(404).send('A user with the given email already exists!')
    // }



    /* 
    Creating the user object:
    - Destruciting the object properties, clean and simpler aproach than using req.body[prop] all the time 
    - Setting the model fields equal to properties from the body
    */

    const {name, email, password, phone, allergies} = req.body;
    const salt = await bcrypt.genSalt(10);

    user = new User({
        name: name,
        email: email,
        password: password,
        phone: phone,
        allergies: allergies
    });
    user.password = await bcrypt.hash(user.password, salt);


    /* 
    Saving the user object
    - Wait for promise to resolve before releasing the thread
    - user.save() adds the user to the databse
    */
    await user.save();


    /* 
    Returning the response to the client:
    - response.send()
    - Pick certain attributes to return to the client
    - To use pick the object needs to be passed in and properties are passed into an array
    */
    res.send(
      _.pick(user, ['_id', 'name', 'email','phone', 'allergies'])
    );
});

module.exports = router;
