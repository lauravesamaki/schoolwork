const express = require('express');
const Assignment = require('../models/assignments');
const { createAPIError } = require('../errors/custom');
const app = express();

app.use(express.json());

const getAllAssignments = async (req, res) => {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
};

const getAssignment = async (req, res, next) => {
    const id = req.params.id;
    const assignment = await Assignment.findOne({_id: id});
    if (!assignment) {
        return next(createAPIError('Assignment not found', 404));
    }
    res.status(200).json(assignment);
};

const createAssignment = async (req, res) => {
    const newAssignment = await Assignment.create(req.body);
    res.status(201).json(newAssignment);
};

const updateAssignment = async (req, res) => {
    const updateAssignment = await Assignment.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    );
    res.status(200).json(updateAssignment);
};

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