const express = require('express');
const Course = require('../models/courses');
const Assignment = require('../models/assignments');
const { createAPIError } = require('../errors/custom');
const app = express();

app.use(express.json());

const getAllCourses = async (req, res) => {
    const courses = await Course.find();
    res.status(200).json(courses);
};

const getCourse = async (req, res, next) => {
    const id = req.params.id;
    const course = await Course.findOne({_id: id});
    if (!course) {
        return next(createAPIError('Course not found', 404));
    }
    res.status(200).json(course);
};

const createCourse = async (req, res) => {
    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
    const updateCourse = await Course.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    );
    res.status(200).json(updateCourse);
};

const deleteCourse = async (req, res) => {
    const deleteCourse = await Course.findOneAndDelete({_id: req.params.id});

    await Assignment.deleteMany({course: req.params.id});

    res.status(200).json(deleteCourse);
};

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
};