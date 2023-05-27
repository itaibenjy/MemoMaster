const express = require('express');

// import routes
const userRouter = require('./userRouter');
const toDoRouter = require('./toDoRouter');

const router = express.Router();

// user routes
router.use('/api/user', userRouter);

// To Do routes
router.use('/api/todo', toDoRouter);

module.exports = router;