const mongoose = require('mongoose');

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
    ownerList: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'ToDoList'
    }
}, {timestamps: true});

module.exports = mongoose.model('ToDoText', todoTextSchema);