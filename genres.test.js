const request = require('supertest');
const {Genre} = require('./modals/genre');
const mongoose = require('mongoose');
const { User } = require('./modals/user');
const auth=require("./middleware/auth");
const { JsonWebTokenError } = require('jsonwebtoken');
// jest --watchAll --verbose
///in  get request we have to use /api/genres

///this is very important 

let server;

describe('/api/genres', () => {
  beforeEach(() => { server = require('./index'); })

  afterEach(async () => { 
await Genre.remove({})
 
  });
 

  describe('GET /', () => {
    it('should return all genres', async () => {
      const genres = [
        { name: 'genre1' },
        { name: 'genre2' },
      ];
    
      await Genre.collection.insertMany(genres);

      const res = await request(server).get('/api/genres');
      
      expect(res.status).toBe(401);
console.log(res.body);
     
      //some check existing of an object in array
    });
    //testing routes with parameter
  });

  
  describe("Get /:id",()=>{
it("it return genre if valid id ",async ()=>{
const genre=new Genre({name:"genre1"})
 genre.save()
// const res = await request(server).get("/api/genres/:id")
// const res = await request(server).get("/api/genres/"+genre._id)
//  we have to use in url /api/genres 
//not api/genres this is wrone way 
const res = await request(server).get("/api/genres/"+genre._id)

expect(res.status).toBe(200);
expect(res.body).toHaveProperty("name",genre.name)
})
it("should return 404 if no genres with given id has not foound",async ()=>{

const res = await request(server).get("/api/genres/617fd093164689e3703b483b")
expect(res.status).toBe(404);
})
  })
  describe("post /",()=>{
it("return 401 if client is not logged ", async  ()=>{

const res = await request(server).post("/api/genres").send({name:"genres3"})

expect(res.status)  .   toBe(401)
});
it("return 400  if genre is less than 7 characters", async  ()=>{

const token  = new User().generateAuthToken()
const res = await request(server).post("/api/genres") .set('x-auth-jwt',token).send({name:"12"})

expect(res.status).toBe(400)
});
it("return save the genre if there is valid ", async  ()=>{
// testing happy path

const token  = new User().generateAuthToken()
const res = await request(server).post("/api/genres") .set('x-auth-jwt',token).send({name:"genre1"})
const genre   = await Genre.find({name:"genre1"})
expect(res.status).not.toBeNull()
})
it("return  genre if there is valid ", async  ()=>{
// testing happy path

const token  = new User().generateAuthToken()
const res = await request(server).post("/api/genres") .set('x-auth-jwt',token).send({name:"genre1"})


expect(res.body).toHaveProperty('name','genre1')
})
// writing the clean test  
})

});

/// auth test 

// number of test is equal to number of execution 
