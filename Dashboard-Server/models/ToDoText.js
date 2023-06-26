// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the schema for a todo text item
const todoTextSchema = new mongoose.Schema({
    // The content of the todo item
    content: {
        type: String,
        required: true,
    },
    // Whether the todo item is marked as done or not
    ifDone: {
        type: Boolean,
        default: false
    },
    // The color associated with the todo item
    color: {
        type: String,
        required: true,
    },
    // The date and time associated with the todo item
    dateTime:    {
        type: Date,
        required: false,
    },
    // The ID of the todo list that this item belongs to
    ownerList: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ToDoList'
    }
}, {timestamps: true});

// Exporting the Mongoose model for the todo text item schema
module.exports = mongoose.model('ToDoText', todoTextSchema);