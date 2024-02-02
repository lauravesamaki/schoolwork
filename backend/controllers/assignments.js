const express = require('express');
const Assignment = require('../models/assignments');
const { createAPIError } = require('../errors/custom');
const app = express();

app.use(express.json());


// GET /api/assignments
// access private
const getAllAssignments = async (req, res) => {
    const assignments = await Assignment.find({ user: req.user._id });
    res.status(200).json(assignments);
};

// GET /api/assignments/:id
// access private
const getAssignment = async (req, res, next) => {
    const id = req.params.id;
    const assignment = await Assignment.findOne({_id: id});
    if (!assignment) {
        return next(createAPIError('Assignment not found', 404));
    }
    res.status(200).json(assignment);
};

// POST /api/assignments
// access private
const createAssignment = async (req, res) => {
    const newAssignment = await Assignment.create(req.body);
    res.status(201).json(newAssignment);
};

// PUT /api/assignments/:id
// access private
const updateAssignment = async (req, res) => {
    const updateAssignment = await Assignment.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    );
    res.status(200).json(updateAssignment);
};

// DELETE /api/assignments/:id
// access private
const deleteAssignment = async (req, res) => {
    const deleteAssignment = await Assignment.findOneAndDelete({_id: req.params.id});
    res.status(200).json(deleteAssignment);
};

module.exports = {
    getAllAssignments,
    getAssignment,
    createAssignment,
    updateAssignment,
    deleteAssignment
};