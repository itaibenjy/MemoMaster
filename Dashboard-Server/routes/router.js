const express = require('express');

// import routes
const userRouter = require('./userRouter');
const toDoRouter = require('./toDoRouter');
const toDoTextRouter = require('./toDoTextRouter');
const noteRouter = require('./noteRouter');

const router = express.Router();

// user routes
router.use('/api/user', userRouter);

// To Do routes
router.use('/api/todo', toDoRouter);

// To Do items routes
router.use('/api/todoText', toDoTextRouter);

// note routes
router.use('/api/note', noteRouter);

module.exports = router;