//importing express
const express = require('express');

//using router function
const router =  express.Router();


const usersController = require('../controllers/users');

router.post('/create',usersController.create);

router.post('/create-session',usersController.createSession);

router.get('/profile',usersController.profile);

module.exports = router;