// it('should return 400  if return already in process ' , async ()=>{
//     // looking up in object 
   
//     rental.dateReturned = new Date()
 
//      await rental.save()
 
 
//              const res = await  exec();
//              expect(res.status).toBe(400)
 
//          })
const mongoose  = require('mongoose');
const request = require('supertest');
const auth = require('./middleware/auth');
const { User } = require('./modals/user');


describe("auth middleware 2",()=>{
it('should populate req.user with a payload of valid jwt',()=>{
    const user = {_id:mongoose.Types.ObjectId()}

let token = new User(user).generateAuthToken()

let req = {
header : jest.fn().mockReturnValue(token)


}
let res = {}

let next = jest.fn()
auth(req,res,next)
expect(req.user).toBeDefined()
expect(req.user).toMatchObject(user)


})


})

// for checking how many test has been cover by test we use command

//"start":"jest --watchAll --verbose --coverage"

// for integeration test we use following command 

//"start":"jest --watchAll --verbose "