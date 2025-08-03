const express = require('express');
const authController = require('../controller/auth.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);

// Protected routes
router.post('/logout', authenticateToken, async (req, res) => {
    const { id } = req.body;
    res.status(200).json({ message: 'Logged out successfully' });
});
router.get('/getone', authenticateToken, authController.getUserById);
router.get('/verify', authenticateToken, (req, res) => {
    res.status(200).json({ success: true })
});

module.exports = router;
