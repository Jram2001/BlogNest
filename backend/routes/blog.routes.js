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
router.get('/getall', getAllBlogs);
router.get('/get/:id', getBlogById);

// Protected Routes
router.post('/create', authenticateToken, createBlog);
router.put('/update/:id', authenticateToken, updateBlog);
router.delete('/delete/:id', authenticateToken, deleteBlog);
router.get('/getuserblogs/:id', authenticateToken, getBlogByUserId);

module.exports = router;
