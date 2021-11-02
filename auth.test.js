// testing the auth middleware 
const request = require('supertest');
const { User } = require('./modals/user');

 let server;
describe('auth middleware ', () => {
  beforeEach(() => { server = require('./index'); })
  afterEach(async () => { await server.close() 
  
})

  let token ;
  const exec =  () => {
  return  request(server).post('/api/genres').set("x-auth-jwt", token ).send({name : "genre1"})
  }
  beforeEach(()=>{
token = new User().generateAuthToken()
  })
  it('should return 400 if invalid  token is provided ', async  ()=>{
token = "kkk"
   const res =  await exec();
      expect(res.status).toBe(400)

  })
  it('should return 200  token is provided ', async  ()=>{
    token = new User().generateAuthToken()
   const res =  await exec();
      expect(res.status).toBe(200)

  })

})