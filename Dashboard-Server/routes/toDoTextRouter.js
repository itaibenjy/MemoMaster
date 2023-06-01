const { Router } = require("express");
// const requireAuth = require('../middleware/requireAuth')

const { saveToDoText, updateToDoTextById, deleteToDoTextById } = require("../controllers/todoTextController")

const router = Router()

// router.use(requireAuth)

router.post("/:id", (req, res) => saveToDoText(req, res)); // :id => id of the to do List its belong

router.patch('/:id', (req, res) => updateToDoTextById(req, res)); // :id => id of todoText

router.delete('/:id', (req, res) => deleteToDoTextById(req, res)); // :id => id of todoText

module.exports = router;
