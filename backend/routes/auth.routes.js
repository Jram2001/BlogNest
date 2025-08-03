const express = require('express');
const authController = require('../controller/auth.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

// Protected routes
router.get('/getone', authenticateToken, authController.getUserById);
router.get('/verify', authenticateToken, (req, res) => {
    res.status(200).json({ success: true })
});

module.exports = router;
