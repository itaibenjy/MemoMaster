const { Router } = require("express");
const requireAuth = require('../middleware/requireAuth')

const { getToDo, saveToDoList,  updateToDoList, deleteListWithChildText } = require("../controllers/toDoController")



const router = Router()

router.use(requireAuth)

// Get all To Do List
router.get("/", getToDo);

// create a new To Do List
router.post("/", (req, res) => saveToDoList(req, res));

// update a To Do List
router.patch("/:id", (req, res) => updateToDoList(req, res));

// delete a To Do List
router.delete("/:id", deleteListWithChildText);

module.exports = router;

