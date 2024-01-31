const express = require('express');
const router = express.Router();

const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courses');

router.get ('/', getAllCourses);
router.get ('/:id', getCourse);
router.post ('/', createCourse);
router.put ('/:id', updateCourse);
router.delete ('/:id', deleteCourse);

module.exports = router;