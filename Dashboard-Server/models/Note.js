const mongoose = require('mongoose');

// Define the schema for a note
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // The note title is required
    },
    content: {
        type: String,
        required: true, // The note content is required
    },
    color: {
        type: String,
        default: 'primary' // The default color for a note is 'primary'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // The note is associated with a user via their ObjectId
    }
}, {timestamps: true}); // The note schema includes timestamps for when it was created and updated

// Export the Note model, which is based on the note schema
module.exports = mongoose.model('Note', noteSchema);