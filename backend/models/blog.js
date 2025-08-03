const mongoose = require('mongoose');

/**
 * Blog schema definition with validation rules
 */
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxLength: [500, 'Description cannot exceed 500 characters']
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'User ID is required'],
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
blogSchema.pre('save', function (next) {
    if (this.isModified() && !this.isNew) {
        this.updatedAt = new Date();
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
