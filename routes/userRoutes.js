const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers).post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

module.exports = router;
