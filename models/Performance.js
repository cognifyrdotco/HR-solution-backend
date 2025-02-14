const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewPeriod: {
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    ratings: {
        productivity: {
            type: Number,
            min: 1,
            max: 5
        },
        communication: {
            type: Number,
            min: 1,
            max: 5
        },
        teamwork: {
            type: Number,
            min: 1,
            max: 5
        },
        leadership: {
            type: Number,
            min: 1,
            max: 5
        },
        technical: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    goals: [{
        description: String,
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'completed', 'cancelled'],
            default: 'pending'
        },
        deadline: Date,
        completionDate: Date
    }],
    feedback: {
        strengths: [String],
        improvements: [String],
        comments: String
    },
    status: {
        type: String,
        enum: ['draft', 'submitted', 'reviewed', 'acknowledged'],
        default: 'draft'
    },
    overallRating: {
        type: Number,
        min: 1,
        max: 5
    },
    recommendations: {
        training: [String],
        promotion: Boolean,
        salary: {
            increase: Boolean,
            percentage: Number
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Performance', performanceSchema); 