const { Router } = require("express");
const requireAuth = require('../middleware/requireAuth')

const { getToDo, saveToDoList,  updateToDoList, deleteListWithChildText } = require("../controllers/toDoController")



const router = Router()

router.use(requireAuth)

router.get("/", getToDo);

router.post("/saveList", (req, res) => saveToDoList(req, res));

router.patch("/update/:id", (req, res) => updateToDoList(req, res));


router.delete("/delete/:id", deleteListWithChildText);

module.exports = router;