const Note = require('../models/Note');

async function getAllNotes(req, res) {
    try {
        const notes = await Note.find({owner: req.user._id});
        res.json(notes);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

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

async function updateNoteById(req, res) {
    try {
        const updatedNote = await Note.findByIdAndUpdate({_id: req.params.id}, {...req.body});
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

async function deleteNoteById(req, res) {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Note deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


module.exports = {getAllNotes, createNote, updateNoteById, deleteNoteById}