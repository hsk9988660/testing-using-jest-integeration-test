// in integeration test we need to populate database


// that insertion may involve inspecting the response to a database 

// in integeration test we verify that yhis genres is present in database or not 


 //tdd starts with designing and devolping test for every small functionality of an application
 //tdd framwork intruct devolper to write new code if automated test failed 

 //full coverage by tets in tdd we write test 1st 
 // it is an approach to build software 

 // you write your test before writing production 

 // you start with failing testing 
 //  because we have no code that 
 // benifits tdd 
 //1-testable 
 //2- full cover 
 //simpler implementation 

 // our devolpment is driven by test 
 //implement returns 

 //  post /api/returns {sustomerId , movieId }
 
 //test cases  

 // return 401 if client is not logged 
 // only authrosed user can get these end points
 //return 400 if customerId is not provided 
 //return 400 if movieId is not provided 
 //return 404 if no rental found for this customer or movie 
 // return 400 if rental already process
 //return  200 if valid request 
 //set return date 
 // calculate rental fess 
 ///increase the stock
 //return the rental 

 /// populating database 
 // test authorization 
 const express = require('express');
 const {Rental} = require('../modals/rental');
 const auth=require("../middleware/auth");

const router = express.Router();


router.post('/',auth , async (req, res) => {

 if (!req.body.customerId) return res.status(400).send("customeerId is not provided ")

    

 

 if (!req.body.movieId) return res.status(400).send("movieId is not provided ")
    
 
  const rental = await Rental.findOne({
"customerId" : req.body.customerId,
"movieId" : req.body.movieId,

})
if (!rental)  return res.status(404).send("rental not found")
  if (rental.dateReturened) {
      return res.status(200).send("date is present")
  } 

 
   if (req.body.movieId && req.body.customerId) {
    return res.status(200).send('every thing is present') 
   } 

  });
  module.exports=router
