const bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const {User , validate} = require('../models/user');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

//Geting users details 

router.get('/', auth, admin, async (req, res) => {

    let users = await User.find();
    if(!users) return res.status(404).send('User not Found');
    res.status(200).send(users);
});

//Posting users 

router.post('/', auth, admin, async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
    
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    const token = user.generateAuthToken();
    res.header('auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  
});


//Updating user details 
router.put('/:id', auth, admin, async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findByIdAndUpdate(req.params.id,
      { 
           name: req.body.name,
           email: req.body.email,
           password: req.body.password
       });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    const token = user.generateAuthToken();
    res.header('auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  
});

//Deleting specific user 

router.delete('/:id',auth,admin, async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

     const token = user.generateAuthToken();
    res.header('auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

//Geting specific user details
router.get('/:id', auth, admin, async (req, res) => {

    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found');

    const token = user.generateAuthToken();
    res.header('auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));

});


  
  module.exports = router; 
  






  