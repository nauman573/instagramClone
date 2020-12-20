
const mongoose = require('mongoose');
const Joi = require('joi');

const  apartmentSchema = new mongoose.Schema({
    apartmentNo: {
      type: Number,
      required: true,
      min : 1,
      max :1000
     
    },
    floor: {
      type: Number,
      required: true,
      min : 1,
      max :1000
     
    },
    bedroomSize: {
      type: Number,
      required: true,
      min : 100,
      max :2000
      
    },
    owner: {
        type: String,
        required: true,
        minlength : 3,
        maxlength : 50
       
      },
    currentTenant : {
        type: String,
        required: true,
        minlength : 3,
        maxlength : 50
       
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
      });



      function validateApartment(user) {
        const schema = {
          apartmentNo: Joi.number().min(1).max(1000).required(),
          floor: Joi.number().min(1).max(1000).required(),
          bedroomSize: Joi.number().min(100).max(2000).required(),
          currentTenant: Joi.string().min(3).max(50).required()
        };
      
        return Joi.validate(user, schema);
      }

  const Apartment = mongoose.model('Apartment', apartmentSchema);
  exports.Apartment = Apartment;
  exports.validate = validateApartment;