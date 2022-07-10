const express = require('express');

const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', tourController.checkID);

router.route('/Top-10-Cheap').get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/get-Monthly-Plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
//post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);

module.exports = router;
