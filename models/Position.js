const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String,
        trim: true
    }],
    responsibilities: [{
        type: String,
        trim: true
    }],
    salaryRange: {
        min: Number,
        max: Number
    },
    level: {
        type: String,
        enum: ['entry', 'junior', 'mid', 'senior', 'lead', 'manager'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'frozen'],
        default: 'active'
    },
    skills: [{
        type: String,
        trim: true
    }],
    experienceRequired: {
        min: Number,
        max: Number
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Position', positionSchema); 