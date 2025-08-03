/**
 * Sends successful response with optional data payload
 * 
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code, defaults to 200
 * @param {string} message - Success message to send
 * @param {any} data - Optional data payload to include
 * @returns {Response} Express response with JSON data
 */
const sendSuccess = (res, statusCode = 200, message, data = null) => {
    /**
     * Base response object with success flag and message
     * @type {object}
     */
    const response = {
        success: true,
        message
    };

    // Add data to response if provided
    if (data) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

/**
 * Sends error response with optional error details
 * 
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code, defaults to 500
 * @param {string} message - Error message to send
 * @param {any} errors - Optional error details to include
 * @returns {Response} Express response with JSON error data
 */
const sendError = (res, statusCode = 500, message, errors = null) => {
    /**
     * Base response object with error flag and message
     * @type {object}
     */
    const response = {
        success: false,
        message
    };

    // Add error details to response if provided
    if (errors) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};

module.exports = {
    sendSuccess,
    sendError
};
