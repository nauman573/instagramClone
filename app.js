
const mongoose = require('mongoose');
const adminUsers = require('./routes/adminUsers');
const auth = require('./routes/auth');
const apartments = require('./routes/usersApartment')
const adminApartments = require('./routes/adminApartments');
const express = require('express');
const config = require('config');

const app = express();


if (!config.get('jwtPrivateKey')) {
    console.error('jwtPrivateKey is not defined');
    process.exit(1);
  }
  

  
  app.use(express.json());
  
  app.use('/api/auth', auth);

  app.use('/api/apartments', apartments);

  app.use('/api/adminUsers', adminUsers);
  app.use('/api/adminApartments', adminApartments);
  
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
  
  
  mongoose.connect('mongodb://localhost/apartmentSystem')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));