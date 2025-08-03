import React from 'react';
import type { Blog } from '../../services/blog-interface';

type BlogCardProps = {
    blog: Blog;
    onBlogClick?: (id: string) => void;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, onBlogClick }) => {
    /**
     * Handles card click event and triggers callback with blog ID
     */
    const handleClick = () => {
        if (onBlogClick) {
            onBlogClick(blog._id);
        }
    };

    return (
        < div
            onClick={handleClick}
            className={`p-6 h-1/1 w-1/1 bg-[#090909] rounded-2xl border border-gray-700 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:border-indigo-400 flex flex-col ${onBlogClick ? 'cursor-pointer hover:scale-105' : ''
                }`
            }
        >
            {/* Blog title with hover effect */}
            < h3 className="text-xl font-semibold mb-3 text-gray-100 line-clamp-2 hover:text-indigo-300 transition-colors duration-200" >
                {blog.title}
            </h3 >

            {/* Blog description with line clamping */}
            < p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow" >
                {blog.description}
            </p >

            {/* Blog metadata section */}
            {
                (blog.userID._id || blog.userID.username || blog.createdAt) && (
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-700">
                        <div className="flex items-center space-x-2">
                            {/* Author name display */}
                            {(blog.userID.username || blog.userID.username) && (
                                <span>
                                    By {blog.userID.username}
                                </span>
                            )}

                            {/* Creation date display */}
                            {blog.createdAt && (
                                <span>
                                    • {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </span>
                            )}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default BlogCard;
