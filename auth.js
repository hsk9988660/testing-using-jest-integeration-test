//LOGIN PAGE


const { User}=require("../modals/user")
require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const Joi=require("joi")
const jWt=require("jsonwebtoken")
//validate function only validate new user 
const router = express.Router();
const _=require("lodash")
const bcrypt=require("bcrypt");


router.post('/', async (req, res) => {
    const {error}  =  validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
// we use findOne ton find user by its email or name password
         let user=await User.findOne({email:req.body.email})
         if (!user) {
            return  res.status(400).send('invalid email or password')
             // we send 404 error brcause we don't want the user to kknow why authentication failed
         }
       const validpassword=await bcrypt.compare(req.body.password,user.password)
      if (!validpassword) {
         return res.status(400).send("invalid email or pasword")
      }
       // we add new property to know if an user is admin or not
        // in payload we add 2nd property
     
  const token = user.generateAuthToken();
        //  const jwt = jWt.sign({_id:user._id},config.get("jwtPrivateKey"))
// now jwtPrivateKey is a name of our application sitting 
// it is secret now
//the actaul secret in our variable
         // in get method we pass configeration sitting
       // we take secretkey from auth.js and store in envirnoment variables
      // we will store keys in codes otherwise it will accessible to any one


      //secretkey can be any string it 


      // we can give any name to this secretkey

      //donot save secretkey in source code we store it in envirnoment variable 

      //sign method has two arg 1st has payload, 2nd is secretkey
      //scretkey is use to generate digital signature 
      res.status(200).send(token)

      //we return jwt token to clients
      // instead returning simple true we return json web tokens
      //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTdhZDhlMmJkYjI2YzUxOGZmODgyZTYiLCJpYXQiOjE2MzU0NDU0MDd9.4APXIIHy0iet_b4fMri9_iOipirzWup0ncyKALjqKcI

      // token like this will send to clients which store on client browser





       // bcrypt get those password and rehash it and compare with login password
       //if it equal it will return true

  });
  function validateUser(req) {
    const schema = {
     email: Joi.string().min(5).max(233).required().email(),
      password: Joi.string().min(5).max(50).required()
    };
   
    return Joi.validate(req, schema);
  
  }
  module.exports=router
  // we can use loddash .com
  //it is optimize version of underscore
  //it has lot function to working with objects,array and json
  //Lodash is a popular javascript based library which provides 200+ functions to facilitate web development. It provides helper functions like map, filter, invoke as well as function binding, javascript templating, deep equality checks, creating indexes and so on. Lodash can be used directly inside a browser and also with Node.js.


  //{
//   "_id": "617ad8e2bdb26c518ff882e6",
//   "iat": 1635445407
// }

// _id is an id we give in sign method
//iat is a time at which it generated
