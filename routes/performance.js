const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const performanceController = require('../controllers/performanceController');

// Validation middleware
const validatePerformanceReview = [
    check('employee', 'Employee ID is required').notEmpty().isMongoId(),
    check('reviewer', 'Reviewer ID is required').notEmpty().isMongoId(),
    check('reviewPeriod.startDate', 'Review period start date is required').notEmpty().isISO8601(),
    check('reviewPeriod.endDate', 'Review period end date is required').notEmpty().isISO8601()
];

// Get all performance reviews
router.get('/', performanceController.getAllPerformanceReviews);

// Get performance review by ID
router.get('/:id', performanceController.getPerformanceReviewById);

// Create new performance review
router.post('/', validatePerformanceReview, performanceController.createPerformanceReview);

// Update performance review
router.put('/:id', validatePerformanceReview, performanceController.updatePerformanceReview);

// Delete performance review
router.delete('/:id', performanceController.deletePerformanceReview);

// Get employee's performance reviews
router.get('/employee/:employeeId', performanceController.getEmployeePerformanceReviews);

// Update review status
router.patch('/:id/status',
    [check('status', 'Status is required').notEmpty()],
    performanceController.updateReviewStatus
);

// Add goal to performance review
router.post('/:id/goals',
    [
        check('description', 'Goal description is required').notEmpty(),
        check('deadline', 'Goal deadline is required').notEmpty().isISO8601()
    ],
    performanceController.addGoal
);

// Update goal status
router.patch('/:id/goals/:goalId/status',
    [check('status', 'Status is required').notEmpty()],
    performanceController.updateGoalStatus
);

module.exports = router; 