const express = require('express');
const { authenticateToken } = require('../middleware/auth.middleware');
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
    getBlogByUserId
} = require('../controller/blog.controlller');

const router = express.Router();

// Public Routes
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

// Protected Routes
router.post('/', authenticateToken, createBlog);
router.put('/:id', authenticateToken, updateBlog);
router.delete('/:id', authenticateToken, deleteBlog);


router.get('/getuserblogs/:id', authenticateToken, getBlogByUserId);

module.exports = router;
