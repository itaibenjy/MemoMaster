// Importing the mongoose library
const mongoose = require('mongoose');

// Defining the schema for the ToDoList model
const todoListSchema = new mongoose.Schema({
    // The title of the ToDoList, which is a required field of type String
    title: {
        type: String,
        required: true,
    },
    // The color of the ToDoList, which is an optional field of type String with a default value of 'primary'
    color: {
        type: String,
        default: 'primary'
    },
    // A boolean flag indicating whether the ToDoList is done or not, with a default value of false
    ifDone: {
        type: Boolean,
        default: false
    },
    // The owner of the ToDoList, which is a required field of type ObjectId that references the User model
    ownerUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // An array of child ToDoText objects, which is an optional field of type ObjectId array that references the ToDoText model
    childText: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'ToDoText'
    }
}, {timestamps: true});

// Exporting the ToDoList model
module.exports = mongoose.model('ToDoList', todoListSchema);