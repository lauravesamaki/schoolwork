const express = require('express');
const User = require('../models/users');
const Course = require('../models/courses');
const Assignment = require('../models/assignments');
const APIError = require('../errors/custom');
const asyncHandler = require('express-async-handler');
const app = express();

app.use(express.json());

// @desc Get all courses
// @route GET /api/courses
// @access Private
const getCourses = asyncHandler( async (req, res) => {
    const courses = await Course.find({ user: req.user._id }).populate('assignments');

    res.status(200).json(courses);
});

// @desc Create a new course
// @route POST /api/courses
// @access Private
const createCourse = asyncHandler( async (req, res) => {
    const { name, code, teacher } = req.body;

    // Check for the required fields
    if(!name) {
        throw new APIError(400, 'Name is required');
    }

    // Check if user exists
    const userExists = await User.findById(req.user._id).lean().exec();

    if(!userExists) {
        throw new APIError(404, 'User not found');
    }

    // Create the course
    const course = await Course.create({
        name: name,
        user: userExists._id,
        code: code,
        teacher: teacher,
    });

    res.status(201).json({ message: `${course.name} has been created`});
});

// @desc Update a course
// @route PATCH /api/courses/:id
// @access Private
const updateCourse = asyncHandler( async (req, res) => {
    const { id, name, code, teacher, userId } = req.body;

    // Confirm that the user exists
    if(!req.user) {
        throw new APIError(401, 'User not found');
    }

    // Confirm that the user is logged in
    if(userId.toString() !== req.user._id.toString()) {
        throw new APIError(401, 'User not authorized');
    }

    const updatedCourse = await Course.save({
        _id: id,
        name: name,
        code: code,
        teacher: teacher,
        user: userId,
    });

    res.status(200).json({ message: `${updatedCourse.name} has been updated`});
});

// @desc Delete a course
// @route DELETE /api/courses/:id
// @access Private
const deleteCourse = asyncHandler( async (req, res) => {
    const { id } = req.body;
    
    const course = await Course.findById(id).lean().exec();

    // Confirm that the course exists
    if (!course) {
        throw new APIError(404, 'Course not found');
    }

    // Confirm that the user exists
    if(!req.user) {
        throw new APIError(401, 'User not found');
    }

    // Confirm that the user is logged in
    if(course.user.toString() !== req.user._id.toString()) {
        throw new APIError(401, 'User not authorized');
    }

    const result = await Course.findByIdAndDelete(id);

    // Delete all assignments associated with the course
    await Assignment.deleteMany({ course: result._id });

    const reply = `Course ${course.name} and its assignments have been deleted successfully`;

    res.status(200).json({ message: reply});
});

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
};