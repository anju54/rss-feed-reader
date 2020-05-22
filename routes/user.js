const express = require('express');
var verifyToken = require('../middleware/verifyToken');
const adminRole=require('../middleware/auth');

const userController = require('../controller/user');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/login',userController.login);

router.post('/subscribe', verifyToken, userController.subcribeForCategory);

router.get('/news',verifyToken, userController.getNews);

/**
 * This is used to get all the users 
 * ( Added middleware for verifying token and roles i.e adminRole )
 */
router.get('/all', adminRole, userController.getAllUsers);

module.exports = router;