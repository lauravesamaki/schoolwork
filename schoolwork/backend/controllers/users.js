require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Assignment = require('../models/assignments');
const APIError = require('../errors/custom');
const app = express();

app.use(express.json());

const maxAge = 3 * 24 * 60 * 60;

const generateToken = (id) => {
    return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

const getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
};

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
};

const createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    const newUser = await user.save();

    const token = generateToken(newUser._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({user: newUser._id}).end();
};

const updateUser = async (req, res) => {
    const updateUser = await User.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
    );
    res.status(200).json(updateUser);
};

const deleteUser = async (req, res) => {
    const deleteUser = await User.findOneAndDelete({_id: req.params.id});

    await Assignment.deleteMany({user: req.params.id});
    
    res.status(200).json(deleteUser);
};

const login = async (req, res, next) => {
    const {username, password} = req.body;
    
    try {
        const user = await User.login(username, password);
        const token = generateToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id}).end();
    }
    catch {
        throw new APIError(401, 'Incorrect username or password');
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
};