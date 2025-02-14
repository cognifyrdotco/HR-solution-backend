const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const employeeController = require('../controllers/employeeController');

// Validation middleware
const validateEmployee = [
    check('email', 'Please include a valid email').isEmail(),
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    check('employeeId', 'Employee ID is required').notEmpty()
];

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Get employee by ID
router.get('/:id', employeeController.getEmployeeById);

// Create new employee
router.post('/', validateEmployee, employeeController.createEmployee);

// Update employee
router.put('/:id', validateEmployee, employeeController.updateEmployee);

// Delete employee
router.delete('/:id', employeeController.deleteEmployee);

// Get employees by department
router.get('/department/:departmentId', employeeController.getEmployeesByDepartment);

// Update employee status
router.patch('/:id/status', 
    [check('status', 'Status is required').notEmpty()],
    employeeController.updateEmployeeStatus
);

// Add employee document
router.post('/:id/documents',
    [
        check('type', 'Document type is required').notEmpty(),
        check('url', 'Document URL is required').notEmpty()
    ],
    employeeController.addEmployeeDocument
);

module.exports = router; 