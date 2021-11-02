//user models
const Joi = require('joi');
const bcrypt=require("bcrypt");
const mongoose = require('mongoose');
const jWt=require("jsonwebtoken");
require("dotenv").config()
// diff between joi and mongoose is moongoose values has 1st uppercase letter
// while joi value has all lowercase letter
let UserSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
 email: {
    type: String,
    required: true,
    unique:true,// very useful property each user has one email
    minlength: 5,
    maxlength: 222
  },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1000
    },
    isAdmin:Boolean

})

UserSchema.methods.generateAuthToken = function() { 
  const token = jWt.sign({ _id: this._id}, process.env.SECRET_KEY);
  return token;
}

// we add second propety either given user is admin or not 

const User = mongoose.model('User',UserSchema);
// UserSchema.methods.generateAuthToken=function(){
//   const jwt = jWt.sign({_id:this._id},process.env.SECRET_KEY)
//   return jwt
// }
// arrow function don't have this
// if we craete method we cannot use fat arrow function



// we use "JOI.EMAIL" TO SURE there must be email not a simple string

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
   email: Joi.string().min(5).max(233).required().email(),
    password: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(user, schema);
}


exports.User=User,
exports.validate=validateUser


// joi-password-complexity is package we use for defining complexty oif password