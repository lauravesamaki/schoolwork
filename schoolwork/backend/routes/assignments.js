const express = require('express');
const router = express.Router();

const {
    getAllAssignments,
    getAssignment,
    createAssignment,
    updateAssignment,
    deleteAssignment
} = require('../controllers/assignments');

const protect = require('../middleware/authMiddleware');

router.get ('/', protect, getAllAssignments);
router.get ('/:id', protect, getAssignment);
router.post ('/', protect, createAssignment);
router.put ('/:id', protect, updateAssignment);
router.delete ('/:id', protect, deleteAssignment);

module.exports = router;