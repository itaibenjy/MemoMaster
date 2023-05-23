const express = require('express');
const { loginUser, signupUser } = require('../controllers/userController')


const router = express.Router();


// POST request to login user
router.post('/login', loginUser);

// POST request to create new user
router.post('/signup', signupUser);

module.exports = router;