const express = require('express');
const router = express.Router();

const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courses');

const protect = require('../middleware/authMiddleware');

router.get ('/', protect, getAllCourses);
router.get ('/:id', protect, getCourse);
router.post ('/', protect, createCourse);
router.put ('/:id', protect, updateCourse);
router.delete ('/:id', protect, deleteCourse);

module.exports = router;