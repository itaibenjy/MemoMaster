const { Router } = require("express");
// const requireAuth = require('../middleware/requireAuth')

const { saveToDoText, updateToDoTextById, deleteToDoTextById } = require("../controllers/todoTextController")

const router = Router()

// router.use(requireAuth)

// create a new sub To Do 
router.post("/:id", (req, res) => saveToDoText(req, res)); // :id => id of the to do List its belong

// update a sub To Do 
router.patch('/:id', (req, res) => updateToDoTextById(req, res)); // :id => id of todoText

// delete a sub To Do 
router.delete('/:id', (req, res) => deleteToDoTextById(req, res)); // :id => id of todoText

module.exports = router;
