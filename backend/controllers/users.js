require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncErrors');
const User = require('../models/users');
const Course = require('../models/courses');
const APIError = require('../errors/custom');
const app = express();

app.use(express.json());

const maxAge = 3 * 24 * 60 * 60;

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

// @desc Register a user
// @route POST /api/users/signup
// @access Public
const registerUser = asyncHandler( async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new APIError('Please enter username and password', 400);
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
        throw new APIError('User already exists', 400);
    }

    const user = await User.create({ username, password });
    
    if (user) {
        return res.status(201).json(
            { 
                id: user._id,
                username: user.username,
                token: generateToken(user._id)
            }
        );
    }
    else {
        throw new APIError('Invalid user data', 400);
    }
});

// @desc Login a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler( async (req, res) => {
    const { username, password } = req.body;
    const user = await User.login(username, password);

    return res.status(200).json(
        { 
            id: user._id,
            username: user.username,
            token: generateToken(user._id)
        }
    );
});

// @desc get user
// @route GET /api/users/:username
// @access Private
const getUser = asyncHandler( async (req, res) => {
    return res.status(200).json(req.user);
});

// @desc Update a user
// @route PATCH /api/users/:id
// @access Private
const updateUser = asyncHandler( async (req, res) => {
    const { id, username, password } = req.body;

    if(!username || !password) {
        throw new APIError(400, 'Fill in all required fields');
    }

    // Confirm that the user exists
    const userExists = await User.findById(id).lean().exec();

    if(!userExists) {
        throw new APIError(404, 'User not found');
    }

    const user = await User.save({
        _id: id,
        username: username,
        password: password,
    });

    res.status(200).json({ message: `${user.username} has been updated`});
});

// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler( async (req, res) => {
    const { id } = req.body;

    // Confirm that the user exists
    const userExists = await User.findById(id).lean().exec();

    if(!userExists) {
        throw new APIError(404, 'User not found');
    }

    // check if the user is authorized to delete the user
    if(userExists._id.toString() !== req.user._id.toString()) {
        throw new APIError(401, 'User not authorized');
    }

    const result = await User.findByIdAndDelete(id).exec();

    // Delete all the user's courses
    await Course.deleteMany({ user: result._id });


    res.status(200).json({ message: `User ${result.username} has been deleted`});
});

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
};