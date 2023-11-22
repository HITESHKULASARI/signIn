//importing express
const express = require('express');

//using router function
const router =  express.Router();

const homeSignInUp = require('../controllers/homeSignInUp');


router.get('/',homeSignInUp.homeSignInUp);

router.get('/signUp',homeSignInUp.signUP);

router.use('/users',require('./users'));
console.log("router is working");


module.exports = router;