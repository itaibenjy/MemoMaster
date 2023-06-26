// Import the ToDoList and ToDoText models
const ToDoList = require("../models/ToDoList");
const ToDoText = require("../models/ToDoText");

// Get all the ToDoLists for the authenticated user
async function getToDo(req, res) {
    try {
      const todolists = await ToDoList.find({ ownerUser: req.user._id }).populate('childText');
      res.json(todolists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

// Create a new ToDoList for the authenticated user
async function saveToDoList(req, res) {
    const { title, color, ifDone } = req.body;
    if (!title) {
        return res.status(400).json({error: 'Please enter the title of the list'});
    }
    try {
        const newToDo = await ToDoList.create({ title, color, ifDone, ownerUser: req.user._id});
        res.status(201).json(newToDo);
    } catch (error) {
        res.status(500).json({error: error.message});
    } 
}

// Delete a ToDoList and all its child ToDoTexts
async function deleteListWithChildText(req, res) {
    try {
      // Find the list to be deleted
      const list = await ToDoList.findById(req.params.id);
      if (!list) {
        console.log('List not found');
        return;
      }
  
      // Retrieve the childText IDs associated with the list
      const childTextIds = list.childText;
  
      // Delete the list
      await ToDoList.findByIdAndDelete(req.params.id);
  
      // Delete all the sub tasks that the list has
      await ToDoText.deleteMany({ _id: { $in: childTextIds } });
      
      res.status(200).json({ message: 'List deleted successfully' });
    } catch (error) {
      res.status(500).json({error: error.message});
    }
}

// Update a ToDoList for the authenticated user
async function updateToDoList(req, res) {
    try {
        
        const reqList = await ToDoList.findByIdAndUpdate({_id: req.params.id}, {...req.body});
        
        const newTodoList = await ToDoList.findById(req.params.id);
        
        res.status(200).json(newTodoList);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Export the functions to be used in other files
module.exports = { getToDo, saveToDoList, updateToDoList, deleteListWithChildText }