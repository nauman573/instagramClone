const {Apartment ,validate} = require('../models/apartment'); 
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {

  const apartment = await Apartment.find({userId : req.user._id});
  res.send(apartment);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let apartment = new Apartment({ 
    apartmentNo: req.body.apartmentNo,
    floor: req.body.floor,
    bedroomSize: req.body.bedroomSize,
    owner: req.user.name,
    userId: req.user._id,
    currentTenant: req.body.currentTenant,
  });
 


  const result = await apartment.save();
   res.status(200).send(result);
});
 
router.put('/:id', auth, async (req, res) => {

  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const apartment = await Apartment.findByIdAndUpdate(req.params.id,
    { 
        apartmentNo: req.body.apartmentNo,
        floor: req.body.floor,
        bedroomSize: req.body.bedroomSize,
        owner: req.user.name,
        currentTenant: req.body.currentTenant
     });

   if (!apartment) return res.status(404).send('The apartment with the given ID was not found.');
      res.status(200).send(apartment);
});

router.delete('/:id', auth, async (req, res) => {
  const apartment = await Apartment.findByIdAndRemove(req.params.id);

  if (!apartment) return res.status(404).send('The apartment with the given ID was not found.');

  res.send(apartment);
});

router.get('/:id', auth, async (req, res) => {
  const apartment = await Apartment.findById(req.params.id);

  if (!apartment) return res.status(404).send('The apartment with the given ID was not found.');

  res.send(apartment);
});

module.exports = router; 