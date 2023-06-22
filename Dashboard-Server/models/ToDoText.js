const mongoose = require('mongoose');

// The sub To Do schema
const todoTextSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    ifDone: {
        type: Boolean,
        default: false
    },
    color: {
        type: String,
        required: true,
    },
    dateTime:    {
        type: Date,
        required: false,
    },
    ownerList: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ToDoList'
    }
}, {timestamps: true});

module.exports = mongoose.model('ToDoText', todoTextSchema);