const mongoose = require('mongoose');

const VenueSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    lat: {
      type: Number,
      required: false
    },
    lng: {
      type: Number,
      required: false
    }
  },
  adress: {
    type: String
  },
  image: {
    type: String,
    required: false
  },
  description: {
    type: String
  },
  options: {
    wifi: {
      type: Boolean,
      required: false
    },
    toilet: {
      type: Boolean,
      required: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

var Venue = module.exports = mongoose.model('Venue', VenueSchema);