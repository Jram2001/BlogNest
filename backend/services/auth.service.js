/**
 * Authentication Service
 * Enhanced with comprehensive error handling and optimized code structure
 * Created by: Jayaram | Updated: August 1, 2025
 */

const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

// Custom error class for consistent error handling
class AuthError extends Error {
    constructor(message, statusCode, field = null) {
        super(message);
        this.statusCode = statusCode;
        this.field = field;
    }
}

/**
 * Create User Service - Enhanced with validation and error handling
 */
const createUser = async (userData) => {
    try {
        // Input validation
        if (!userData || typeof userData !== 'object') {
            throw new AuthError('Invalid user data provided', 400);
        }

        const { username, email, password } = userData;

        // Required fields validation
        if (!username?.trim() || !email?.trim() || !password) {
            throw new AuthError('Username, email, and password are required', 400);
        }

        // Check for existing user
        const existingUser = await User.findOne({
            $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
        });

        if (existingUser) {
            const field = existingUser.email === email.toLowerCase() ? 'email' : 'username';
            throw new AuthError(`User with this ${field} already exists`, 409, field);
        }

        // Create and save user
        const user = new User({
            username: username.trim(),
            email: email.toLowerCase().trim(),
            password
        });

        await user.save();
        const token = generateToken(user._id.toString());

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            },
            token
        };

    } catch (error) {
        if (error instanceof AuthError) throw error;

        // Handle MongoDB duplicate key error
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            throw new AuthError(`User with this ${field} already exists`, 409, field);
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const field = Object.keys(error.errors)[0];
            throw new AuthError(error.errors[field].message, 400, field);
        }

        throw new AuthError('Failed to create user', 500, error);
    }
};

/**
 * Authenticate User Service - Enhanced with multiple validation layers
 */
const authenticateUser = async (credentials) => {
    try {
        // Input validation
        if (!credentials || typeof credentials !== 'object') {
            throw new AuthError('Invalid credentials provided', 400);
        }

        const { username, password } = credentials;

        if (!username?.trim() || !password) {
            throw new AuthError('Username/email and password are required', 400);
        }

        // Find user by username or email
        const user = await User.findOne({
            $or: [
                { username: username.toLowerCase().trim() },
                { email: username.toLowerCase().trim() }
            ]
        }).select('+password');

        if (!user) {
            throw new AuthError('Invalid credentials', 401);
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new AuthError('Invalid credentials', 401);
        }

        const token = generateToken(user._id.toString());

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            },
            token
        };

    } catch (error) {
        if (error instanceof AuthError) throw error;
        throw new AuthError('Authentication failed', 500, error);
    }
};

/**
 * Get User By ID Service - Enhanced with validation and error cases
 */
const getUserById = async (userId) => {
    try {
        // Input validation
        if (!userId) {
            throw new AuthError('User ID is required', 400);
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new AuthError('User not found', 404);
        }

        return {
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        };

    } catch (error) {
        if (error instanceof AuthError) throw error;

        // Handle MongoDB CastError
        if (error.name === 'CastError') {
            throw new AuthError('Invalid user ID format', 400);
        }

        throw new AuthError('Failed to retrieve user', 500);
    }
};

/**
 * Get User By ID Service - Enhanced with validation and error cases
 */
const getUserName = async (userId) => {
    try {
        // Input validation
        if (!userId) {
            throw new AuthError('User ID is required', 400);
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new AuthError('User not found', 404);
        }

        return {
            username: user.username,
        };

    } catch (error) {
        if (error instanceof AuthError) throw error;

        // Handle MongoDB CastError
        if (error.name === 'CastError') {
            throw new AuthError('Invalid user ID format', 400);
        }

        throw new AuthError('Failed to retrieve user', 500);
    }
};

/**
 * Get All Users Service - New addition for handling empty user collections
 */
const getAllUsers = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find({})
                .select('-password')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            User.countDocuments({})
        ]);

        if (total === 0) {
            return {
                users: [],
                pagination: { total: 0, page, limit, pages: 0 },
                message: 'No users found in the system'
            };
        }

        return {
            users: users.map(user => ({
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            })),
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };

    } catch (error) {
        throw new AuthError('Failed to retrieve users', 500);
    }
};

/**
 * Delete User Service - Enhanced with validation
 */
const deleteUser = async (userId) => {
    try {
        if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
            throw new AuthError('Valid user ID is required', 400);
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            throw new AuthError('User not found', 404);
        }

        return { message: 'User deleted successfully' };

    } catch (error) {
        if (error instanceof AuthError) throw error;
        throw new AuthError('Failed to delete user', 500);
    }
};


const getUserDetails = async (userID) => {
    const user = await User.findOne({ _id: userID }).populate();
}

module.exports = {
    createUser,
    authenticateUser,
    getUserById,
    getAllUsers,
    deleteUser,
    getUserName,
    AuthError
};
