const express = require('express');
const asyncHandler = require('express-async-handler');
const Assignment = require('../models/assignments');
const APIError = require('../errors/custom');
const Course = require('../models/courses');
const app = express();

app.use(express.json());

// @desc Get assignments
// @route GET /api/assignments
// @access Private
const getAssignments = asyncHandler( async (req, res) => {
    const assignments = await Assignment.find({ course: req.course._id }).lean().exec();
    
    res.status(200).json(assignments);
});

// @desc Create a new assignment
// @route POST /api/assignments
// @access Private
const createAssignment = asyncHandler( async (req, res) => {
    const { name, dueDate, course } = req.body;

    //check for the required fields
    if(!name || !dueDate || !course) {
        throw new APIError(400, 'Fill in all required fields');
    }

    // check if the course exists
    const courseExists = await Course.findById(course).lean().exec();

    if(!courseExists) {
        throw new APIError(404, 'Course not found');
    }

    // check if the user is authorized to create the assignment
    if(courseExists.user.toString() !== req.user._id.toString()) {
        throw new APIError(401, 'User not authorized');
    }

    const assignmentObject = {
        name: name,
        dueDate: dueDate,
        course: course,
    };

    const assignment = await Assignment.create(assignmentObject);

    if(assignment){
        await Course.findByIdAndUpdate(course, {
            $push: {
                assignments: assignment._id,
            }
        });

        res.status(201).json({message: `${assignment.name} has been created`});
    }
    else {
        throw new APIError(400, 'Invalid assignment data');
    }
});

// @desc Update an assignment
// @route PATCH /api/assignments/:id
// @access Private
const updateAssignment = asyncHandler( async (req, res) => {
    const { id, name, dueDate, course, completed } = req.body;

    // Confirm that the course exists
    const courseExists = await Course.findById(course).lean().exec();

    if(!courseExists) {
        throw new APIError(404, 'Course not found');
    }

    // Confirm that the user is authorized to update the course
    if(courseExists.user.toString() !== req.user._id.toString()) {
        throw new APIError(401, 'User not authorized');
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(id,{
        _id: id,
        name: name,
        dueDate: dueDate,
        course: course,
        completed: completed,
    });

    // Remove the old assignment and add the updated one
    await Course.findByIdAndUpdate(course, {
        $pull: {
            assignments: id,
        }
    });

    await Course.findByIdAndUpdate(course, {
        $push: {
            assignments: updatedAssignment._id,
        },
    });

    res.status(200).json({ message: `${updatedAssignment.name} has been updated`});
});

// @desc delete an assignment
// @route DELETE /api/assignments/:id
// @access Private
const deleteAssignment = asyncHandler( async (req, res) => {
    const { id, course } = req.body;

    const assignment = await Assignment.findById(id).lean().exec();

    if(!assignment) {
        throw new APIError(404, 'Assignment not found');
    }

    // Confirm that the course exists
    const courseExists = await Course.findById(course).lean().exec();

    if(!courseExists) {
        throw new APIError(404, 'Course not found');
    }

    // Confirm that the user exists
    if(!req.user) {
        throw new APIError(401, 'User not found');
    }

    // Confirm that the user is authorized to update the course
    if(courseExists.user.toString() !== req.user._id.toString()) {
        throw new APIError(401, 'User not authorized');
    }

    const result = await Assignment.findByIdAndDelete(id);

    // Remove the assignment from the course
    await Course.findByIdAndUpdate(courseExists._id, {
        $pull: {
            assignments: result._id,
        }
    });

    res.status(200).json({ message: `${result.name} has been deleted successfully` });
});

module.exports = {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
};