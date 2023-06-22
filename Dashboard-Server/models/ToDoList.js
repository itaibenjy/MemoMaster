const mongoose = require('mongoose');

// The ToDo List schema
const todoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: 'primary'
    },
    ifDone: {
        type: Boolean,
        default: false
    },
    ownerUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    childText: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'ToDoText'
      }
}, {timestamps: true});

module.exports = mongoose.model('ToDoList', todoListSchema);