const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, registrationValidation, loginValidation, editValidation} = require('../Models/user.js');
const express = require('express');
const router = express.Router();
const passport = require('passport');

// @route   POST /api/users/register
// @desc    Register user
// @access  public
router.post("/register", async (req,res) => {

  /* 
  Checking for a valid body:
  - validation encapsulated in the user model
  - If the promise is rejected set the status to 400, isSuccess is set to false and return the message
  */
  const { error } = registrationValidation(req.body);
  if(error) return res.status(400).json({isSuccess: false , message: error.details[0].message}) 
  
  /* 
  Checking for a duplicate user:
  - Checking the user doesnt already exists via email, emails need to be unique for each user
  - Any errors set isError to true, set HTTP status to 404 and return a message
  */
  let user = await User.findOne({email: req.body.email});    
  if(user) return res.status(404).json({isSuccess: false, message:'A user with the given email already exists!'});    
   
  /* 
  Creating the user object:
  - Destruciting the object properties, clean and simpler aproach than using req.body[prop] all the time 
  - Setting the model fields equal to properties from the body
  - Hashing the password provided in the body
  */
  const {name, email, password, phone, allergies} = req.body;
  user = new User({
    name: name,
    email: email,
    password: password,
    phone: phone,
    allergies: allergies
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  
  /* 
  Saving the user object:
  - If the promise is rejected set the HTTP status to 505, isSuccess is set to false and a message is returned 
  - If the promise is resolved then the data is returned, isSuccess is set to true and a message is returned
  */
  const data = await user.save();
  if(!data) return res.status(505).json({isSuccess: false, message: "Internal server error"}) 

  // Log when in development, not needed in production
  if(process.env.NODE_ENV === 'development') {
    console.log(`Newly created users data ${data}`);
  }

  res.json({
    data: _.pick(user, ['_id', 'name', 'email','phone', 'allergies']),
    isSuccess: true, 
    message: "User successfully registered"
  });
});

// @route   POST /api/users/login
// @desc    Logs user in if details match
// @access  public
router.post("/login", async (req,res) => {
   
  /* 
  Checking for a valid body:
  - validation encapsulated in the user model
   - If the promise is rejected set the status to 400, isSuccess is set to false and return the message
  - If the promise is resolved sent a success message and set isSuccess to false
  */
  const { error } = loginValidation(req.body);
  if(error) return res.status(400).json({isSuccess: false, message: error.details[0].message}) 
 
  /* 
  Invalid email or password:
  - Checking the user doesnt already exists
  - If the promise is rejected then show an error message, HTTP status code is set to 400 and isSuccess is set to false
  - If the promise is resolved then isSuccess is set to true, auth token and a message is returned
  */
  let user = await User.findOne({email: req.body.email});    
  if(!user) return res.status(400).json({isSuccess: false,message: 'Access denied : Invalid email or password'});    

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if(!validPassword) return res.status(400).json({isSuccess: false, message: 'Access denied: Invalid email or password'});

  res.json({
    isSuccess: true, 
    token: `Bearer ${user.generateAuthToken()}`, 
    message: "You have successfully logged in"
  });
});


// @route   GET /api/users/me
// @desc    Returns the current users detailed, an auth token is needed for this route
// @access  private
router.get('/me', passport.authenticate('jwt', {session: false}), async (req,res) => {

  // Payload of data to be returned  
  const data = _.pick(req.user, ['_id', 'name', 'email','phone', 'allergies'])

  // Log when in development mode, not needed in production
  if(process.env.NODE_ENV === 'development') {
    console.log(`Current data: ${data}`);
  }

  res.json({
    isSuccess: true,
    data: data,
    message: "Your details have been returned"
  });
});


// @route   PUT /api/users
// @desc    Updates the current users details, an auth token is needed for this route
// @access  private
router.put('/', passport.authenticate('jwt', {session:false}), async (req,res) => {

  /* 
  Checking for a valid body:
  - validation encapsulated in the user model
   - If the promise is rejected set the status to 400, isSuccess to false and return the message
  - If the promise is resolved then the body is valid
  */
  const { error } = editValidation(req.body);
  if(error) return res.status(400).json({isSuccess: false, error: error.details[0].message}) 

  /* 
  Creating the new object:
  - Create a blank object
  - Set the user equal to the ObjectID of the collection being upddated
  - Get data from the body, if it's true (Exists) then add user properties to the userField object
  */
  const userFields = {};
  userFields.user = req.user.id;
  if(req.body.name) userFields.name = req.body.name;
  if(req.body.email) userFields.email = req.body.email;
  if(req.body.phone) userFields.phone = req.body.phone;
  if(req.body.allergies) userFields.allergies = req.body.allergies;

  // Log when in development mode, not needed in production
  if(process.env.NODE_ENV === 'development') {
    console.log(`Updated data:  ${userFields}`);
  }

  /* 
  Updating the database:
  - Wait for the findByIDAndUpdate to finish then release the thread and continue
  - If the promise is rejected the HTTP status code will be set, isSuccess is set to false and a message is returned
  - If the update is resolved the newly updated data, a success message is sent, isSuccess is set to true
  */
  const newData = await User.findByIdAndUpdate(req.user.id,{$set: userFields},{new: true});
  if(!newData) return res.status(500).json({isSuccess: false, message: 'Internal server error, try again'})
  
  res.json({
    isSuccess: true,
    data: _.pick(newData, ['name', 'email','phone', 'allergies']),
    message: "Your account has successfully been updated"
  });
});


// @route   DELETE /api/users
// @desc    
// @access  private
router.delete('/', passport.authenticate('jwt', {session:false}), async (req,res) => {
  
  /* 
  Deleting the user form the  database:
  - Wait for the findOneAndDelete function to finish 
  - If the promise is rejected set the status to 404, isSuccess is set to true and return the message
  - If the promise is resolved sent a success message and set isSuccess to false
  */
  const data = await User.findOneAndDelete(req.user._id);
  if(!data) return res.status(404).json({isSuccess: false,message: "Oh no, I couldn't find the user "})
    
  res.json({
    isSuccess:true,
    message: "Your account has successfully been deleted"
  });
});

module.exports = router;
