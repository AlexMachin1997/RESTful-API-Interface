const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, registrationValidation, loginValidation} = require('../Models/user.js');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../Middleware/auth');

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
    const { error } = registrationValidation(req.body);


    /* 
    Checking for a valid body:
    - If error is true send 404 status and send the first message in the details array to the client
    */
    if(error) return res.status(400).json(error.details[0].message) 
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
    if(user) return res.status(404).json({errorMessage:'A user with the given email already exists!'});    
 
    /* 
    Creating the user object:
    - Destruciting the object properties, clean and simpler aproach than using req.body[prop] all the time 
    - Setting the model fields equal to properties from the body
    - Hashing the password provided in the body
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
    - generate token using a function defined in the user model, after generating the token return it
    - Send the token and put it in the header, it will be named x-auth-token
    */
    res.json(_.pick(user, ['_id', 'name', 'email','phone', 'allergies']));
});



// @route   POST /api/users/login
// @desc    Logs user in if details match
// @access  public
// Asynchronous function to allows ES7 features like async/await to be used
router.post("/login", async (req,res) => {

  /* 
  Validating body request: 
  - Object destructring the error object from the Joi validation libaray
  - Validate entire body provided by express 
  */
  const { error } = loginValidation(req.body);

  /* 
  Checking for a valid body:
  - If error is true send 404 status and send the first message in the details array to the client
  */
  if(error) return res.status(400).json(error.details[0].message) 
  // if(error) {
  //     return res.status(400).send(error.details[0].message)
  // }

  /* 
  Invalid email or password:
  - Checking the user doesnt already exists
  - Wait for promise to resolve before releasing the thread (Moving on)
  - If user is true (Meaning they do exist), then send them the message below along with state 404
  */
  let user = await User.findOne({email: req.body.email});    
  if(!user) return res.status(400).json({successMessage: 'Access denied : Invalid email or password'})    

  /* 
  Returning the response to the client:
  - Compare the password input to the hased password in the database
  - Generate token using a function defined in the user model, after generating the token return it
  - Send the token and put it in the header, it will be named x-auth-token
  */

  // Password comparison
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) {
    res.status(400).json({errorMessage: 'Access denied : Invalid email or password'}) 
  }

  //Token generation and it is sent to the client
  const token = user.generateAuthToken();
  res.json({
    success: true,
    token: `Bearer ${token}`
  });
});


// @route   GET /api/users/me
// @desc    Returns current user
// @access  private
router.get('/me', passport.authenticate('jwt', {session: false}), 
(req,res) => {
  const {user} = req;
  res.json(_.pick(user, ['_id', 'name', 'email','phone', 'allergies']));
});


module.exports = router;
