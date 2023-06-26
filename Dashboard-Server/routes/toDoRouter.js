// Importing the Router class from the Express library
const { Router } = require("express");

// Importing the requireAuth middleware function from the middleware directory
const requireAuth = require('../middleware/requireAuth')

// Importing the getToDo, saveToDoList, updateToDoList, and deleteListWithChildText functions from the toDoController file
const { getToDo, saveToDoList,  updateToDoList, deleteListWithChildText } = require("../controllers/toDoController")

// Creating a new instance of the Router class
const router = Router()

// Using the requireAuth middleware function for all routes in this file
router.use(requireAuth)

// Defining a GET route for the root URL path
router.get("/", getToDo);

// Defining a POST route for the root URL path
router.post("/", (req, res) => saveToDoList(req, res));

// Defining a PATCH route for the URL path with a dynamic parameter of "id"
router.patch("/:id", (req, res) => updateToDoList(req, res));

// Defining a DELETE route for the URL path with a dynamic parameter of "id"
router.delete("/:id", deleteListWithChildText);

// Exporting the router object for use in other files
module.exports = router;