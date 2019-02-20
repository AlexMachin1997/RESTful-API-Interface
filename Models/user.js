const Joi = require("joi"); //Returns a class which contains premade methods
const mongoose = require("mongoose");

const User = mongoose.model("User", new mongoose.Schema ({
 name : {
    type: String,
    required: true,
    maxlength: 255
 },

 email : {  
    type: String,
    required: true,
    unique: true,
    maxlength: 255
 },
 
 password : {
    type: String,
    required: true,
    minLength: 5,
    maxlength: 1024,
 },

 phone: {
    type: Number,
 },

 allergies: [String],

 resetPasswordExpires: {
    type: Date
 },

 resetPasswordToken: {
    type: String
 },
}));

// Validates the object before going into the database
// When some data is wrong an error object is returned
function validateUser(user){
    const schema = {

      //Must be a string, is required, maximum of 255 and can only be values from al
      name: Joi.string().required().max(255),
      
      email: Joi.string().required().max(255).email(),
      
      password: Joi.string().required().min(5).max(255),
      
      phone: Joi.number(),
      
      allergies: Joi.array().items(Joi.string())
    }
    return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;