const express = require('express');
const router = express.Router();

const Venue = require('../models/venue');


router.get('/', function(req, res, next) {
  res.render('index', {
    layout: 'layout'
  });
});

router.get('/new-venue', function(req, res, next) {
  res.render('new-venue', {
    layout: 'layout'
  });
});

router.post('/addVenue', function(req, res, next) {
  const data = req.body;

  const newVenue = new Venue();

  newVenue.name = data.name;
  newVenue.location.lat = data.lat;
  newVenue.location.lng = data.lng;
  newVenue.image = data.imgUrl || "";
  newVenue.options.wifi = data.wifi || false,
  newVenue.options.toilet = data.toilet || false;

  newVenue.save(function(err) {
    if(err) throw err;
  });
});

router.get('/venues', function(req, res, next) {
  Venue.find({}, function(err, venues) {
    if(err) throw err;

    res.json(venues);
  });
});

module.exports = router;