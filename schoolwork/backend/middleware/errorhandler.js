const APIError = require('../errors/custom');

const errorHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({message: err.message});
    }
    else {
        res.status(500).json({message: 'Something went wrong'});
    }
};

module.exports = errorHandler;