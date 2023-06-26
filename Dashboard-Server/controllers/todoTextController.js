// Import the ToDoText and ToDoList models
const ToDoText = require("../models/ToDoText");
const ToDoList = require("../models/ToDoList");

// Save a new ToDoText to the database
async function saveToDoText(req, res) {
    const { content, ifDone } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Please enter content of your sub task' });
    }
    try {
      // Find the ToDoList associated with the new ToDoText
      const todoList = await ToDoList.findById(req.params.id);
      if (!todoList) {
        return res.status(404).json({ error: 'ToDoList not found' });
      }
  
      // Create a new ToDoText with the given content and associated with the ToDoList
      const newToDo = await ToDoText.create({
        content,
        color: todoList.color,
        ifDone,
        ownerList: req.params.id
      });
  
      // Update the ToDoList's childText array with the newToDo's _id
      todoList.childText.push(newToDo._id);
      await todoList.save();
  
      // Return the new ToDoText
      res.status(201).json(newToDo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
// Update a ToDoText by ID
async function updateToDoTextById(req, res) {
    try {
        // Find the old ToDoText and update it with the new data
        const oldText = await ToDoText.findByIdAndUpdate({_id: req.params.id}, {...req.body});
        // Find the updated ToDoText and return it
        const newToDoText = await ToDoText.findById(req.params.id);
        res.status(200).json(newToDoText);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Delete a ToDoText by ID
async function deleteToDoTextById(req, res) {
    try {
      const todoTextId = req.params.id;
      
      // Find the ToDoText to be deleted
      const todoText = await ToDoText.findById(todoTextId);
      if (!todoText) {
        return res.status(404).json({ error: 'ToDoText not found' });
      }
  
      // Get the associated list ID
      const listId = todoText.ownerList;
  
      // Remove the ToDoText from the childText array of the associated list
      await ToDoList.findByIdAndUpdate(listId, {
        $pull: { childText: todoTextId }
      });
  
      // Delete the ToDoText
      await ToDoText.findByIdAndDelete(todoTextId);
  
      // Return a success message
      res.status(200).json({ message: 'ToDoText deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
// Export the functions for use in other files
module.exports = { saveToDoText, updateToDoTextById, deleteToDoTextById }