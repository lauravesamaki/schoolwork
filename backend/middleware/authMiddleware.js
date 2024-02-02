const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncErrors');
const User = require('../models/users');
const APIError = require('../errors/custom');

const protect = asyncHandler( async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // split token from Bearer
            token = req.headers.authorization.split(' ')[1];

            // decode token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            // get user from the token
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }
        catch(err) {
            throw new APIError('Not authorized', 401);
        }
    }
    
    if (!token) {
        throw new APIError('Not authorized, no token', 401);
    }
});

module.exports = protect;