const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/users');

const protect = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getUser);
router.patch('/me', protect, updateUser);
router.delete('/me', protect, deleteUser);

module.exports = router;