const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000
    }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
