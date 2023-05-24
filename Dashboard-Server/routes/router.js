const express = require('express');
const userRouter = require('./userRouter');
const router = express.Router();

// user routes
router.use('/api/user', userRouter);

module.exports = router;