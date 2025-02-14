const Position = require('../models/Position');
const { validationResult } = require('express-validator');

// Get all positions
exports.getAllPositions = async (req, res) => {
    try {
        const positions = await Position.find()
            .populate('department', 'name');
        res.json(positions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get position by ID
exports.getPositionById = async (req, res) => {
    try {
        const position = await Position.findById(req.params.id)
            .populate('department', 'name');
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }
        res.json(position);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new position
exports.createPosition = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const position = new Position(req.body);
        const savedPosition = await position.save();
        res.status(201).json(savedPosition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update position
exports.updatePosition = async (req, res) => {
    try {
        const position = await Position.findById(req.params.id);
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }

        Object.assign(position, req.body);
        const updatedPosition = await position.save();
        res.json(updatedPosition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete position
exports.deletePosition = async (req, res) => {
    try {
        const position = await Position.findById(req.params.id);
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }

        await position.remove();
        res.json({ message: 'Position deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get positions by department
exports.getPositionsByDepartment = async (req, res) => {
    try {
        const positions = await Position.find({ department: req.params.departmentId });
        res.json(positions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update position status
exports.updatePositionStatus = async (req, res) => {
    try {
        const position = await Position.findById(req.params.id);
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }

        position.status = req.body.status;
        const updatedPosition = await position.save();
        res.json(updatedPosition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add or update position requirements
exports.updateRequirements = async (req, res) => {
    try {
        const position = await Position.findById(req.params.id);
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }

        position.requirements = req.body.requirements;
        const updatedPosition = await position.save();
        res.json(updatedPosition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 