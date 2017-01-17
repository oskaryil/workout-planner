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
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  image: {
    type: String,
    required: false
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