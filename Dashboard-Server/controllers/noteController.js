// Import the Note model
const Note = require('../models/Note');

// Get all notes for the authenticated user
async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({owner: req.user._id});
        res.json(notes);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Create a new note for the authenticated user
async function createNote(req, res) {
    const {title, content, color} = req.body;
    if (!title || !content) {
        return res.status(400).json({error: 'Please provide title and content'});
    }
    try {
        const newNote = await Note.create({title, content, color, owner: req.user._id});
        res.status(201).json(newNote);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Update a note by ID for the authenticated user
async function updateNoteById(req, res) {
    try {
        const oldNote = await Note.findByIdAndUpdate({_id: req.params.id}, {...req.body});
        const newNote = await Note.findById(req.params.id);
        res.status(200).json(newNote);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Delete a note by ID for the authenticated user
async function deleteNoteById(req, res) {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Note deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

// Export the functions to be used in other files
module.exports = {getAllNotes, createNote, updateNoteById, deleteNoteById}// Import the Note model