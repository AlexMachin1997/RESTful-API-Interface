const Joi = require("joi"); //Returns a class which contains premade methods
const mongoose = require("mongoose");

const User = mongoose.model("User", new mongoose.Schema ({

 //Name field
 name : {
    type: String,
    required: true,
    maxlength: 255
 },

 //Email field
 email : {  
    type: String,
    required: true,
    unique: true,
    maxlength: 255
 },
 
 //Password field 
 password : {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 1024,
 },

 //Phone field
 phone: {
    type: Number,
 },

 //Allergies field
 allergies: [String],

 //Reset password toekn Field
 resetPasswordExpires: {
    type: Date
 },

 //Rest password token field 
 resetPasswordToken: {
    type: String
 },
}));

// Validates the User scheam before going into the database
// When some data is wrong an error object is returned
function validateUser(user){
    const schema = {
      name: Joi.string().required().max(255),
      email: Joi.string().required().max(255).email(),
      password: Joi.string().required().min(5).max(255),
      phone: Joi.number(),
      allergies: Joi.array().items(Joi.string())
    }
    return Joi.validate(user, schema);
}

function validateLogin(req) {
   const schema = {
     email: Joi.string().required().max(255).email(),
     password: Joi.string().required().min(5).max(255),
   }
 
   return Joi.validate(req, schema);
 }

exports.User = User; 
exports.validateUser = validateUser;
exports.validateLogin = validateLogin 