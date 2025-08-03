const Blog = require('../models/blog');
const authService = require('../services/auth.service');
const mongoose = require('mongoose');

/**
 * Creates new blog post with provided data
 * 
 * @param {object} blogData - Blog data containing title, description, content, userID
 * @returns {Promise<Blog>} Created blog document
 */
async function createBlog(blogData) {
    const { title, description, content, userID } = blogData;

    const newBlog = new Blog({
        title,
        description,
        content,
        userID: JSON.parse(userID),
        createdAt: new Date(),
        updatedAt: new Date()
    });

    console.log(JSON.parse(userID), 'userID')
    return await newBlog.save();
}

/**
 * Retrieves all blogs with pagination and optional user filtering
 * 
 * @param {object} options - Query options including page, limit, userID
 * @returns {Promise<object>} Blogs array with pagination metadata
 */
async function getAllBlogs(options = {}) {
    const { page = 1, limit = 10, userID } = options;
    const skip = (page - 1) * limit;
    const filter = userID ? { userID } : {};

    const blogs = await Blog.find(filter)
        .populate({ path: 'userID', select: 'username' })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const totalBlogs = await Blog.countDocuments(filter);

    return {
        blogs,
        pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalBlogs / limit),
            totalBlogs,
            hasNext: page * limit < totalBlogs,
            hasPrev: page > 1
        }
    };
}

/**
 * Retrieves single blog by ID with user data populated
 * 
 * @param {string} id - Blog ID to fetch
 * @returns {Promise<Blog>} Blog document with populated user data
 */
async function getBlogById(id) {
    const blog = await Blog.findById(id).populate({ path: 'userID', select: 'username' });

    if (blog.userID) {
        const userName = await authService.getUserName(blog.userID);
        blog.userName = userName;
    }

    if (!blog) {
        throw new Error('Blog post not found');
    }

    return blog;
}

/**
 * Updates existing blog with new data
 * 
 * @param {string} id - Blog ID to update
 * @param {object} updateData - Updated blog content
 * @returns {Promise<Blog>} Updated blog document
 */
async function updateBlog(id, updateData) {
    const { title, description, content } = updateData;
    console.log(title, description, content);

    const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        {
            title,
            description,
            content,
            updatedAt: new Date()
        },
        { new: true, runValidators: true }
    );

    if (!updatedBlog) {
        throw new Error('Blog post not found');
    }

    return updatedBlog;
}

/**
 * Deletes blog by ID
 * 
 * @param {string} id - Blog ID to delete
 * @returns {Promise<Blog>} Deleted blog document
 */
async function deleteBlog(id) {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
        throw new Error('Blog post not found');
    }

    return deletedBlog;
}

/**
 * Retrieves all blogs by specific user ID
 * 
 * @param {string} id - User ID to filter blogs
 * @returns {Promise<Blog[]>} Array of user's blogs
 */
async function getBlogByUserId(id) {
    const blog = await Blog.find({ userID: id });

    if (!blog) {
        throw new Error('Blogs not found')
    }

    return blog
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogByUserId
};
