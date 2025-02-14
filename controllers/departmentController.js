const Department = require('../models/Department');
const { validationResult } = require('express-validator');

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
            .populate('head', 'firstName lastName email');
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id)
            .populate('head', 'firstName lastName email');
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new department
exports.createDepartment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const department = new Department(req.body);
        const savedDepartment = await department.save();
        res.status(201).json(savedDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update department
exports.updateDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        Object.assign(department, req.body);
        const updatedDepartment = await department.save();
        res.json(updatedDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        await department.remove();
        res.json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add department objective
exports.addObjective = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        department.objectives.push(req.body);
        const updatedDepartment = await department.save();
        res.json(updatedDepartment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update department objective status
exports.updateObjectiveStatus = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }

        const objective = department.objectives.id(req.params.objectiveId);
        if (!objective) {
            return res.status(404).json({ message: 'Objective not found' });
        }

        objective.status = req.body.status;
        await department.save();
        res.json(department);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 