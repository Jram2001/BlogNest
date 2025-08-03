/**
 * Authentication Middleware
 * 
 * Purpose: Handles JWT token verification and user authentication for protected routes
 * Created by: Jayaram
 * Created on: August 1, 2025
 * 
 * Description: This middleware validates JWT tokens, verifies user existence,
 * and attaches user information to the request object for downstream controllers.
 */

const User = require('../models/user');
const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');

/**
 * Token Authentication Middleware
 * 
 * Purpose: Verifies JWT tokens and authenticates users for protected routes
 * Created by: Jayaram
 * Created on: August 1, 2025
 */
const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return sendError(res, 401, 'Access denied. No token provided.');
        }

        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return sendError(res, 401, 'Invalid token');
        }

        req.user = user;
        next();

    } catch (error) {
        console.error('Authentication error:', error);
        return sendError(res, 401, 'Invalid token');
    }
};

module.exports = { authenticateToken };
