var express = require('express'),
	router = express.Router(),
	ctrlLocations = require('../controllers/locations'),
	ctrlOthers = require('../controllers/others');

// GET locations pages. 
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

// Get other pages
router.get('/about', ctrlOthers.about);
module.exports = router;
