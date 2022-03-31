const express = require('express');
const router = express.Router();

const TestController = require('../controllers/TestController');
const DriverController = require('../controllers/DriverController');
const UserController = require('../controllers/UserController');


const SampleObject = new TestController();

router.get('/', SampleObject.apiTest);
router.post('/add-driver', DriverController.register);
router.post('/add-user', UserController.register);
router.post('/request-cab', UserController.requestCab);
router.post('/set-driver-availability', DriverController.setDriverAvailability);
router.post('/trip-end', DriverController.endTrip);



module.exports = router;
