const express = require('express');
const requireAuth = require('../middleware/requireAuth')
const { getAllNotes, createNote, updateNoteById, deleteNoteById } = require('../controllers/noteController');


const router = express.Router();

router.use(requireAuth)

// Get all notes
router.get('/', (req, res) => getAllNotes(req, res));

// create a new note
router.post('/', (req, res) => createNote(req, res));

// update a note
router.patch('/:id',(req, res) => updateNoteById(req, res));

// delete a note
router.delete('/:id',(req, res) => deleteNoteById(req, res));

module.exports = router;