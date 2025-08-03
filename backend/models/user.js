/**
 * User Model
 * 
 * Purpose: Defines the user schema with authentication capabilities including password hashing and validation
 * Created by: Jayaram
 * Created on: August 1, 2025
 * 
 * Description: This model handles user data structure, password encryption using bcrypt,
 * and provides methods for password comparison and secure JSON serialization.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema Definition
 * 
 * Purpose: Defines the structure and validation rules for user documents
 * Created by: Jayaram
 * Created on: August 1, 2025
 */
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    }
}, {
    timestamps: true
});

/**
 * Password Hashing Middleware
 * 
 * Purpose: Automatically hashes user passwords before saving to database
 * Created by: Jayaram
 * Created on: August 1, 2025
 */
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});
/**
 * Secure JSON Serialization Method
 * 
 * Purpose: Removes sensitive password field from JSON output
 * Created by: Jayaram
 * Created on: August 1, 2025
 */
UserSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

module.exports = mongoose.model('User', UserSchema);
