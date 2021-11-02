const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const express = require('express');
const app = express();
const users=require("./routes/register")
const auths=require("./routes/auth")
const returns = require("./routes/return")
// we need to ensure envirnoment variable is set

//otherwise we terminate the application because our application end points does niot work properly
// console.log(process.env.SECRET_KEY);
mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'))
const rentals=require("./routes/rentals")
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use("/api/rentals",rentals)
app.use("/api/users",users)
app.use("/api/auth",auths)
app.use("/api/returns",returns)

// we can say auth as login page

const port = process.env.PORT || 1336;
  const server  =  app.listen(port, () => console.log(`Listening on port ${port}...`));
module.exports = server      

// in using postmon we write genreId on place of genre 
//but in mongodb compasss genre will create object of genre which it access through id

//diff b/w mongoose and joi

// joi validate clients input but mongoose validate input on which save in mongodb 



// x-auth-jwt →eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTdhNzVhYmY3MDQyYTJkYmE2ZDlhMDYiLCJpYXQiOjE2MzU0MTU0Njd9.M1-lLaeFDo-w_VfnLUwdPpw4tH82HdKml9PhHHEeDbU

//  when user login we read this token and store into our header
// we store this on client
// next time when api call we will send this to server
