const { validateBlogData, validateBlogUpdate } = require('../utils/validation');
const blogService = require('../services/blog.service');

// Create a new blog post
const createBlog = async (req, res) => {
    try {
        const errors = validateBlogData(req.body);
        if (errors.length > 0) {
            return res.status(422).json({
                success: false,
                errors: errors
            });
        }

        const savedBlog = await blogService.createBlog(req.body);

        res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: savedBlog
        });
    } catch (error) {
        console.error(error, 'error');
        res.status(500).json({
            success: false,
            message: 'Error creating blog post',
            error: error.message
        });
    }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
    try {
        const result = await blogService.getAllBlogs(req.params.id);

        res.status(200).json({
            success: true,
            data: result.blogs,
            pagination: result.pagination
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blog posts',
            error: error.message
        });
    }
};

// Get a single blog post by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await blogService.getBlogById(req.params.id);

        res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        if (error.message === 'Blog post not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error fetching blog post',
            error: error.message
        });
    }
};

// Update a blog post by ID
const updateBlog = async (req, res) => {
    try {
        const errors = validateBlogUpdate(req.body);
        if (errors.length > 0) {
            return res.status(422).json({
                success: false,
                errors: errors.array()
            });
        }

        const updatedBlog = await blogService.updateBlog(req.params.id, req.body);

        res.status(200).json({
            success: true,
            message: 'Blog post updated successfully',
            data: updatedBlog
        });
    } catch (error) {
        if (error.message === 'Blog post not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating blog post',
            error: error.message
        });
    }
};

// Delete a blog post by ID
const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await blogService.deleteBlog(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Blog post deleted successfully',
            data: deletedBlog
        });
    } catch (error) {
        if (error.message === 'Blog post not found') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting blog post',
            error: error.message
        });
    }
};


const getBlogByUserId = async (req, res) => {
    try {
        if (!req.params.id === 'Blog post not found') {
            return res.status(401).json({
                success: false,
                message: "User id is required"
            });
        }
        const blog = await blogService.getBlogByUserId(req.params.id);
        res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching blog posts',
            error: error.message
        });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogByUserId
};
