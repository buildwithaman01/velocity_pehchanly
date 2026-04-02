const express = require('express');
const router = express.Router();
const {
    getProjectNotes,
    addNote,
    updateNote,
    deleteNote
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');

// Get notes for project and add note to project
// These are usually prefixed by /projects/:id/notes in server.js
router.get('/:id/notes', protect, getProjectNotes);
router.post('/:id/notes', protect, addNote);

// Specific note operations
// These are usually prefixed by /notes/ in server.js
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);

module.exports = router;
