const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const departmentController = require('../controllers/departmentController');

// Validation middleware
const validateDepartment = [
    check('name', 'Department name is required').notEmpty(),
    check('description', 'Description is required').notEmpty()
];

// Get all departments
router.get('/', departmentController.getAllDepartments);

// Get department by ID
router.get('/:id', departmentController.getDepartmentById);

// Create new department
router.post('/', validateDepartment, departmentController.createDepartment);

// Update department
router.put('/:id', validateDepartment, departmentController.updateDepartment);

// Delete department
router.delete('/:id', departmentController.deleteDepartment);

// Add department objective
router.post('/:id/objectives',
    [
        check('title', 'Objective title is required').notEmpty(),
        check('description', 'Objective description is required').notEmpty(),
        check('deadline', 'Deadline is required').notEmpty().isISO8601()
    ],
    departmentController.addObjective
);

// Update objective status
router.patch('/:id/objectives/:objectiveId/status',
    [check('status', 'Status is required').notEmpty()],
    departmentController.updateObjectiveStatus
);

module.exports = router; 