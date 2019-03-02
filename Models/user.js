//Requiring dependencies for the schema
const jwt = require('jsonwebtoken');
const config = require('../Config/keys');
const Joi = require("joi"); //Returns a class which contains premade methods
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating the user schema using mongoose
const userSchema = new Schema({

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
});

/* 
Generate authentication token:
- Generates a JWT with a payload, private key defined in the enviroment variables, and an expiration time (1 week)
- Return the token when the function is used
*/
userSchema.methods.generateAuthToken = function(){
   const token = jwt.sign({_id: this._id}, config.secret, {expiresIn:86400});
   return token;
}

//Creating a user instace with the userSchema
const User = mongoose.model('user', userSchema);

/* 
Registration validation
- Validate the user schema before reaching the database
- When there is any errors it will return them through an error object 
- Joi notes: https://medium.com/@Yuschick/building-custom-localised-error-messages-with-joi-4a348d8cc2ba
*/
function registrationValidation(user){
    const schema = {
      name: Joi.string().required().max(255),
      email: Joi.string().required().max(255).email(),
      password: Joi.string().required().min(5).max(255),
      phone: Joi.number(),
      allergies: Joi.array().items(Joi.string())
    }
    return Joi.validate(user, schema);
}

/* 
loginValidation:
- Requires the request from the body
- It checks for an email and password, they are needed to login
- Joi notes: https://medium.com/@Yuschick/building-custom-localised-error-messages-with-joi-4a348d8cc2ba
*/
function loginValidation(req) {
   const schema = {
     email: Joi.required(),
     password: Joi.required(),
   }
   return Joi.validate(req, schema);
}

/* 
editValidation:
- Requires the request from the body
- It checks for name, email, phone and allergies
- Joi notes: https://medium.com/@Yuschick/building-custom-localised-error-messages-with-joi-4a348d8cc2ba
*/
function editValidation(user) {
   const schema = {
      name: Joi.string().required().max(255),
      email: Joi.string().required().max(255).email(),
      phone: Joi.number(),
      allergies: Joi.array().items(Joi.string())
   }
   return Joi.validate(user, schema);
}

exports.User = User; 
exports.registrationValidation = registrationValidation;
exports.loginValidation = loginValidation; 
exports .editValidation = editValidation;