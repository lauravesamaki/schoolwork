const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    code: String,
    teacher: String,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;