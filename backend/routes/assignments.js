const express = require('express');
const router = express.Router();

const {
    getAssignments,
    createAssignment,
    updateAssignment,
    deleteAssignment
} = require('../controllers/assignments');

const protect = require('../middleware/authMiddleware');

router.get ('/', protect, getAssignments);
router.post ('/', protect, createAssignment);
router.patch ('/:id', protect, updateAssignment);
router.delete ('/:id', protect, deleteAssignment);

module.exports = router;