// Importing the Router class from the Express library
const { Router } = require("express");

// Importing the requireAuth middleware function from the middleware folder
const requireAuth = require('../middleware/requireAuth')

// Importing the saveToDoText, updateToDoTextById, and deleteToDoTextById functions from the todoTextController file
const { saveToDoText, updateToDoTextById, deleteToDoTextById } = require("../controllers/todoTextController")

// Creating a new instance of the Router class
const router = Router()

// Using the requireAuth middleware function for all routes in this file
router.use(requireAuth)


// This route handles POST requests to create a new to-do text item with the given ID
router.post("/:id", (req, res) => saveToDoText(req, res));

// This route handles PATCH requests to update an existing to-do text item with the given ID
router.patch('/:id', (req, res) => updateToDoTextById(req, res));

// This route handles DELETE requests to delete an existing to-do text item with the given ID
router.delete('/:id', (req, res) => deleteToDoTextById(req, res));


// Exporting the router object for use in other files
module.exports = router;
