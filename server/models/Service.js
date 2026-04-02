const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Web', 'SEO', 'GMB', 'Branding', 'Social'],
        required: true
    },
    techStack: {
        type: [String],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;
