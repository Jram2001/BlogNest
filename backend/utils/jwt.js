const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    console.log(process.env.JWT_SECRET, 'process.env.JWT_SECRET')
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
};

const verifyToken = (token) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }

    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken
};
