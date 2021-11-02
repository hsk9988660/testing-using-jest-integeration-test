// we need to log in database 
//beforeeach test 
//
// to send a request we need to load supertest
const { User } = require('./modals/user');

const request = require("supertest")
const mongoose = require("mongoose")
const {Rental} = require('./modals/rental');
describe("/api/returns",()=>{
    let server;
    let customerId;
    let movieId;
    let rental;
    let token ;
    let  exec = () =>{
     return    request(server).
      post("/api/returns").set("x-auth-jwt",token).
      send({customerId , movieId})

    }
   
        beforeEach( async() => { server = require('./index'); 
   customerId=mongoose.Types.ObjectId()
     movieId=  mongoose.Types.ObjectId()
    token = new User().generateAuthToken()


    rental = new Rental({
      customer:{

      _id:customerId,
         name:"123456",
       phone:"123456"
                } ,
    movie:{
_id:movieId,
title:"movie title ",
dailyRentalRate:2


    }

})
await rental.save()
              })
      
      
        afterEach(async () => { 
      await server.close()
       
        })

      
        it('should return 401 if client is not logged in !' , async ()=>{
     token = "";
           const res = await exec();
           expect(res.status).toBe(401)
           // it give error on 404 if end points does not exist 
           // we don't use auth middleware 
           // because tdd forces you to write code that you need 

           // tdd comes with simpler implementation 
           // if give error like earsose 3000
           // we need to await server.close
          

        })
        it('should return 400 if customerId is not provided !' , async ()=>{
   // user is logged in but he did't provide customerId
  

   customerId = '';

            const res = await exec();
            expect(res.status).toBe(400)

        })

        it('should return 400 if movieId is not provided !' , async ()=>{
   // user is logged in but he did't provide customerId
  
   movieId='';

            const res = await  exec();
            expect(res.status).toBe(400)

        })
      
        it('should return 404 rental is not provided' , async ()=>{
   // looking up in object 
  
   await Rental.remove({})


            const res = await  exec();
            expect(res.status).toBe(404)

        })
       
        it('should return 200  if we have valid request  ' , async ()=>{

 
            const res = await  exec();
            expect(res.status).toBe(200)

        })
       
    
   


})

//refactoring code 

// how to get variable and funcion we define 

//shift + ctrl + o