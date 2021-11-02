const {validate, User}=require("../modals/user")
const jWt=require("jsonwebtoken")
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _=require("lodash")
const bcrypt=require("bcrypt");

require('dotenv').config()
const auth=require("../middleware/auth")
// we use get methods to get current users

// perhaps due to securety reason we don't want end points like this
router.get('/me',auth,async(req,res)=>{
// this end points oly availble to authenticate user
// if clients never send  valid web token we will never allow user to see this secret  data

req.user._id

})
router.post('/', async (req, res) => {
    const {error}  =  validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
// we use findOne ton find user by its email or name password
         let user=await User.findOne({email:req.body.email})
         if (user) {
             return res.status(400).send('user already register')
         } 
        //  user=new User({
        //  name:req.body.name,
        //  email:req.body.email,
        //  password:req.body.password
        //  })
        user =new User(_.pick(req.body,['name','email','password']))
        const salt=await  bcrypt.genSalt(10)
      user.password=await bcrypt.hash(user.password,salt)
        //above is like same as name:req.body.name,
         await user.save()
        

         //in array we write property we want to pick in user
         //basically in array  there are property of user object that we want to pick

         //pick will return object with only those property which we write in array
        //  res.send({
        //  name:user.name,
        //  email:user.email


        //  })
        //  before 

        //// before we send  response to client we send json web token

        ///// just like haeder in req 
//we also have header5s in response 

        // res.header.( '*-auth-token' ,jwt ).send(  _.pick(user,[ '_id'  ,'name','email','password']))
        //for defining any haeder we should prefix with *-auth-token
        //auth is name of header and 2nd is value 
        // res.send( _.pick(user,[ '_id'  ,'name','email','password']))

        // 
        const jwt = jWt.sign({_id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY)
        // we add new property to know if an user is admin or not
        // in payload we add 2nd property
        
        // how we encapsulte it 
res.header('x-auth-jwt',jwt).status(200).send( _.pick(user,[ '_id'  ,'name','email','password']))
  });
  module.exports=router
  // we can use loddash .com
  //it is optimize version of underscore
  //it has lot function to working with objects,array and json
  //Lodash is a popular javascript based library which provides 200+ functions to facilitate web development. It provides helper functions like map, filter, invoke as well as function binding, javascript templating, deep equality checks, creating indexes and so on. Lodash can be used directly inside a browser and also with Node.js.
