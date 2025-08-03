
const validateSignUp = (data) => {
    const errors = {};

    if (!data.username || data.username.trim().length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }

    if (!data.email || !/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(data.email)) {
        errors.email = 'Please enter a valid email';
    }

    if (!data.password || data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords don't match";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

const validateSignIn = (data) => {
    const errors = {};

    if (!data.username || data.username.trim().length === 0) {
        errors.username = 'Username is required';
    }

    if (!data.password || data.password.length === 0) {
        errors.password = 'Password is required';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};


const validateBlogData = (data) => {
    const errors = [];

    // Title validation
    if (!data.title || typeof data.title !== 'string') {
        errors.push({ field: 'title', message: 'Title is required and must be a string' });
    } else if (data.title.trim().length < 3) {
        errors.push({ field: 'title', message: 'Title must be at least 3 characters long' });
    } else if (data.title.trim().length > 200) {
        errors.push({ field: 'title', message: 'Title must not exceed 200 characters' });
    }

    // Description validation
    if (!data.description || typeof data.description !== 'string') {
        errors.push({ field: 'description', message: 'Description is required and must be a string' });
    } else if (data.description.trim().length < 10) {
        errors.push({ field: 'description', message: 'Description must be at least 10 characters long' });
    } else if (data.description.trim().length > 500) {
        errors.push({ field: 'description', message: 'Description must not exceed 500 characters' });
    }

    // Content validation
    if (!data.content || typeof data.content !== 'string') {
        errors.push({ field: 'content', message: 'Content is required and must be a string' });
    } else if (data.content.trim().length < 50) {
        errors.push({ field: 'content', message: 'Content must be at least 50 characters long' });
    }

    // UserID validation
    if (!data.userID || typeof data.userID !== 'string') {
        errors.push({ field: 'userID', message: 'UserID is required and must be a string' });
    }

    return errors;
};

const validateBlogUpdate = (data) => {
    const errors = [];

    // For updates, fields might be optional
    if (data.title !== undefined) {
        if (typeof data.title !== 'string' || data.title.trim().length < 3 || data.title.trim().length > 200) {
            errors.push({ field: 'title', message: 'Title must be a string between 3-200 characters' });
        }
    }

    if (data.description !== undefined) {
        if (typeof data.description !== 'string' || data.description.trim().length < 10 || data.description.trim().length > 500) {
            errors.push({ field: 'description', message: 'Description must be a string between 10-500 characters' });
        }
    }

    if (data.content !== undefined) {
        if (typeof data.content !== 'string' || data.content.trim().length < 50) {
            errors.push({ field: 'content', message: 'Content must be a string with at least 50 characters' });
        }
    }

    return errors;
};


const validateSingleUser = (data) => {

}

module.exports = {
    validateSignUp,
    validateSignIn,
    validateBlogData,
    validateBlogUpdate
};
