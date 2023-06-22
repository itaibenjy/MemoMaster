// Import ToDo models
const ToDoText = require("../models/ToDoText");
const ToDoList = require("../models/ToDoList");

// Create a new sub to do for the authenticated user
async function saveToDoText(req, res) {
    const { content, ifDone } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Please enter content of your sub task' });
    }
    try {
      const todoList = await ToDoList.findById(req.params.id);
      if (!todoList) {
        return res.status(404).json({ error: 'ToDoList not found' });
      }
  
      const newToDo = await ToDoText.create({
        content,
        color: todoList.color,
        ifDone,
        ownerList: req.params.id
      });
  
      // Update the ToDoList's childText array with the newToDo's _id
      todoList.childText.push(newToDo._id);
      await todoList.save();
  
      res.status(201).json(newToDo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
// Update a sub to do by ID for the authenticated user
async function updateToDoTextById(req, res) {
    try {
        console.log(req.body);
        const oldText = await ToDoText.findByIdAndUpdate({_id: req.params.id}, {...req.body});
        const newToDoText = await ToDoText.findById(req.params.id);
        console.log(newToDoText);
        res.status(200).json(newToDoText);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Delete a sub to do by ID for the authenticated user
async function deleteToDoTextById(req, res) {
    try {
      const todoTextId = req.params.id;
      
      // Find the todoText to be deleted
      const todoText = await ToDoText.findById(todoTextId);
      if (!todoText) {
        return res.status(404).json({ error: 'ToDoText not found' });
      }
  
      // Get the associated list ID
      const listId = todoText.ownerList;
  
      // Remove the todoText from the childText array of the associated list
      await ToDoList.findByIdAndUpdate(listId, {
        $pull: { childText: todoTextId }
      });
  
      // Delete the todoText
      await ToDoText.findByIdAndDelete(todoTextId);
  
      res.status(200).json({ message: 'ToDoText deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
// Export the functions to be used in other files
module.exports = { saveToDoText, updateToDoTextById, deleteToDoTextById }