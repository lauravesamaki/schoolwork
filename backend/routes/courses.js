const express = require('express');
const router = express.Router();

const {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courses');

const protect = require('../middleware/authMiddleware');

router.get ('/', protect, getCourses);
router.post ('/', protect, createCourse);
router.patch ('/:id', protect, updateCourse);
router.delete ('/:id', protect, deleteCourse);

module.exports = router;