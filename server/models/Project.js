const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Review', 'Deployed', 'Cancelled'],
        default: 'Pending'
    },
    value: {
        type: Number,
        required: true
    },
    milestones: [{
        title: String,
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Done'],
            default: 'Pending'
        },
        dueDate: Date
    }],
    startDate: {
        type: Date,
        default: Date.now
    },
    deadline: Date
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
