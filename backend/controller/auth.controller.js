/**
 * Authentication Controller
 * 
 * Purpose: Handles user authentication operations including sign up, sign in, and user profile retrieval
 * Created by: Jayaram
 * Created on: August 1, 2025
 * 
 * Description: This controller manages all authentication-related HTTP requests,
 * including user registration, login, and profile access. It integrates with
 * the auth service for business logic and provides standardized response formatting.
 */

const authService = require('../services/auth.service');
const { validateSignUp, validateSignIn } = require('../utils/validation');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * User Registration Controller
 * 
 * Purpose: Handles new user account creation with validation and error handling
 * Created by: Jayaram
 * Created on: August 1, 2025
 */
const signUp = async (req, res) => {
    try {
        const validation = validateSignUp(req.body);
        if (!validation.isValid) {
            return sendError(res, 400, 'Validation failed', validation.errors);
        }

        const result = await authService.createUser(req.body);
        return sendSuccess(res, 201, 'Account created successfully', result);
    } catch (error) {
        console.error('Sign up error:', error);

        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return sendError(res, 409, `User with this ${field} already exists`, {
                [field]: `This ${field} is already taken`
            });
        }

        if (error.statusCode) {
            const errors = error.field ? { [error.field]: `This ${error.field} is already taken` } : null;
            return sendError(res, error.statusCode, error.message, errors);
        }

        return sendError(res, 500, 'Internal server error', {
            server: 'Something went wrong. Please try again later.'
        });
    }
};

/**
 * User Login Controller
 * 
 * Purpose: Authenticates existing users and provides access tokens
 * Created by: Jayaram
 * Created on: August 1, 2025
 */
const signIn = async (req, res) => {
    try {
        const validation = validateSignIn(req.body);
        if (!validation.isValid) {
            return sendError(res, 400, 'Validation failed', validation.errors);
        }
        const result = await authService.authenticateUser(req.body);
        return sendSuccess(res, 200, 'Sign in successful', result);
    } catch (error) {
        console.error('Sign in error:', error);

        if (error.statusCode === 401) {
            return sendError(res, 401, 'Invalid credentials', {
                username: 'Invalid username or password'
            });
        }

        return sendError(res, 500, 'Internal server error', {
            server: 'Something went wrong. Please try again later.'
        });
    }
};

/**
 * Get Current User Profile Controller
 * 
 * Purpose: Retrieves authenticated user's profile information
 * Created by: Jayaram
 * Created on: August 1, 2025
 */
const getUserById = async (req, res) => {
    try {
        const user = await authService.getUserById(req.query.userID);
        return sendSuccess(res, 200, 'User retrieved successfully', { user });
    } catch (error) {
        console.error('Get user error:', error);

        if (error.statusCode === 404) {
            return sendError(res, 404, 'User not found');
        } ``

        return sendError(res, 500, 'Internal server error');
    }
};


const verifyJWT = async (req , res) => {
    try{    
        
    }catch{

    }
}

module.exports = {
    signUp,
    signIn,
    getUserById
};
