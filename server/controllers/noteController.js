const Note = require('../models/Note');

// @desc    Get all notes for a project
// @route   GET /api/v1/projects/:id/notes
// @access  Private
const getProjectNotes = async (req, res) => {
    try {
        const notes = await Note.find({ project: req.params.id }).populate('author', 'name role');
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a note to a project
// @route   POST /api/v1/projects/:id/notes
// @access  Private/Client
const addNote = async (req, res) => {
    const { content } = req.body;

    try {
        const note = await Note.create({
            project: req.params.id,
            author: req.user._id,
            content
        });
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Edit a note
// @route   PUT /api/v1/notes/:noteId
// @access  Private/Client
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id); // noteId from params

        if (note) {
            // Only the author can edit
            if (note.author.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'User not authorized' });
            }

            note.content = req.body.content || note.content;
            const updatedNote = await note.save();
            res.json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/v1/notes/:noteId
// @access  Private/Client
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note) {
            if (note.author.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'User not authorized' });
            }

            await note.deleteOne();
            res.json({ message: 'Note removed' });
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjectNotes,
    addNote,
    updateNote,
    deleteNote
};
