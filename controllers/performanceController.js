const Performance = require('../models/Performance');
const { validationResult } = require('express-validator');

// Get all performance reviews
exports.getAllPerformanceReviews = async (req, res) => {
    try {
        const reviews = await Performance.find()
            .populate('employee', 'firstName lastName employeeId')
            .populate('reviewer', 'firstName lastName');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get performance review by ID
exports.getPerformanceReviewById = async (req, res) => {
    try {
        const review = await Performance.findById(req.params.id)
            .populate('employee', 'firstName lastName employeeId')
            .populate('reviewer', 'firstName lastName');
        if (!review) {
            return res.status(404).json({ message: 'Performance review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new performance review
exports.createPerformanceReview = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const review = new Performance(req.body);
        const savedReview = await review.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update performance review
exports.updatePerformanceReview = async (req, res) => {
    try {
        const review = await Performance.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Performance review not found' });
        }

        Object.assign(review, req.body);
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete performance review
exports.deletePerformanceReview = async (req, res) => {
    try {
        const review = await Performance.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Performance review not found' });
        }

        await review.remove();
        res.json({ message: 'Performance review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get employee's performance reviews
exports.getEmployeePerformanceReviews = async (req, res) => {
    try {
        const reviews = await Performance.find({ employee: req.params.employeeId })
            .populate('reviewer', 'firstName lastName')
            .sort({ 'reviewPeriod.endDate': -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update review status
exports.updateReviewStatus = async (req, res) => {
    try {
        const review = await Performance.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Performance review not found' });
        }

        review.status = req.body.status;
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add goal to performance review
exports.addGoal = async (req, res) => {
    try {
        const review = await Performance.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Performance review not found' });
        }

        review.goals.push(req.body);
        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update goal status
exports.updateGoalStatus = async (req, res) => {
    try {
        const review = await Performance.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: 'Performance review not found' });
        }

        const goal = review.goals.id(req.params.goalId);
        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        goal.status = req.body.status;
        if (req.body.status === 'completed') {
            goal.completionDate = new Date();
        }

        await review.save();
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 