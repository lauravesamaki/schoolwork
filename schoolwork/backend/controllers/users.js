require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncErrors');
const User = require('../models/users');
const Assignment = require('../models/assignments');
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

// register user
// POST /api/users/signup
// access public
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


// login user
// POST /api/users/login
// access public
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

// get user
// GET /api/users/:username
// access private
const getUser = asyncHandler( async (req, res) => {
    const {_id, username} = await User.findById(req.user.id);
    return res.status(200).json({
        id: _id,
        username,
    });
});

module.exports = {
    registerUser,
    loginUser,
    getUser,
};