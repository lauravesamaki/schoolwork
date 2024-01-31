const express = require('express');
const router = express.Router();

const {
    getAllAssignments,
    getAssignment,
    createAssignment,
    updateAssignment,
    deleteAssignment
} = require('../controllers/assignments');

router.get ('/', getAllAssignments);
router.get ('/:id', getAssignment);
router.post ('/', createAssignment);
router.put ('/:id', updateAssignment);
router.delete ('/:id', deleteAssignment);

module.exports = router;