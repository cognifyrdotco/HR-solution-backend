const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const positionController = require('../controllers/positionController');

// Validation middleware
const validatePosition = [
    check('title', 'Position title is required').notEmpty(),
    check('department', 'Department is required').notEmpty().isMongoId(),
    check('description', 'Description is required').notEmpty(),
    check('level', 'Level is required').notEmpty()
];

// Get all positions
router.get('/', positionController.getAllPositions);

// Get position by ID
router.get('/:id', positionController.getPositionById);

// Create new position
router.post('/', validatePosition, positionController.createPosition);

// Update position
router.put('/:id', validatePosition, positionController.updatePosition);

// Delete position
router.delete('/:id', positionController.deletePosition);

// Get positions by department
router.get('/department/:departmentId', positionController.getPositionsByDepartment);

// Update position status
router.patch('/:id/status',
    [check('status', 'Status is required').notEmpty()],
    positionController.updatePositionStatus
);

// Update position requirements
router.put('/:id/requirements',
    [check('requirements', 'Requirements array is required').isArray()],
    positionController.updateRequirements
);

module.exports = router; 