const {Genre, validate} = require('../modals/genre');
const express = require('express');
const router = express.Router();
const auth=require('../middleware/auth');
const admin = require('../middleware/admin')


router.get('/',auth, async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});



router.post('/',auth,async (req, res) => {

  // auth is amiddleware function we it in between req,res
  // auth will execute before res function 
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
const token =req.header('x-token')
res.status(401)
// we need to put this in seperate middleware function so
// we can apply middleware function in seperate module
//we should not write these lines of code in each modules

// headers contain all information regarding request and response

// then we 
// now we should validate this only valid user can access this api end point
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.status(200).send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

// we apply to middleware function here 
// so we pass array
//this will excute  in a line 1st excutes auth and then Admin
// if user is admin then he can access
//,[auth,admin] 
router.delete('/:id',async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;