import React, { useState, useEffect } from 'react';
import BlogCard from './blog-card';
import { deleteBlog, getAllBlogs } from '../../services/blog-service';
import type { Blog } from '../../services/blog-interface';
import { useNavigate } from 'react-router-dom';
import { useSnackBar } from '../../context/snackbar-context';

type BlogListingProps = {
    userId?: string;
    emptyMessage?: string;
    isProfilemode?: boolean;
};

const BlogListing: React.FC<BlogListingProps> = ({
    userId,
    emptyMessage = "No blogs available",
    isProfilemode = false
}) => {
    /**
     * Snackbar context for displaying notifications.
     */
    const { showSnackbar } = useSnackBar();

    /**
     * Array containing all blog posts data.
     * @type {Blog[]}
     */
    const [blogs, setBlogs] = useState<Blog[]>([]);

    /**
     * Boolean representing loading state during data fetch.
     * @type {boolean}
     */
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Navigation function for programmatic routing.
     */
    const navigate = useNavigate();

    /**
     * Side effect function usedt to fetch blogs on component mount.
     */
    useEffect(() => {
        fetchBlogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Handles blog card click navigation to blog view page
     * 
     * @param {string} id - The blog ID to navigate to
     */
    const onBlogClick = (id: string) => {
        navigate(`/dashboard/viewblog/${id}`);
    };

    /**
     * Handles edit button click navigation to edit page
     * 
     * @param {string} id - The blog ID to edit
     */
    const onEditClick = (id: string) => {
        navigate(`/dashboard/create/${id}`);
    };

    /**
     * Handles blog deletion with confirmation and notification
     * 
     * @param {string} id - The blog ID to delete
     * @returns {Promise<void>} A promise that resolves when deletion is complete
     */
    const onDelete = async (id: string) => {
        try {
            const deleteResponse = await deleteBlog(id);
            if (deleteResponse) {
                showSnackbar({ message: 'Blog deleted sucessfully', variation: 'sucess' });
                await fetchBlogs();
            }
        } catch {
            showSnackbar({ message: 'Blog deletion failed', variation: 'error' });
            return ''
        }
    }

    /**
     * Fetches blog data from backend API based on user filter
     * 
     * @returns {Promise<void>} A promise that resolves when blogs are fetched
     */
    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await getAllBlogs(userId);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto mt-10 p-10">
                {/* Loading skeleton grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map(() => (
                        <div
                            className="p-6 bg-[#090909] rounded-2xl border border-gray-700 animate-pulse"
                        >
                            <div className="h-6 bg-gray-700 rounded w-60 mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded mb-2"></div>
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="max-w-6xl mx-auto mt-10 p-10">
                {/* Empty state message */}
                <div className="text-center p-12 bg-[#090909] rounded-2xl border border-gray-700 text-gray-400">
                    <h3 className="text-xl font-semibold mb-2">No Blogs Found</h3>
                    <p>{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-10">
            {/* Blog cards grid layout */}
            <div className="relative grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div className="flex flex-col justify-between">
                        <BlogCard blog={blog} onBlogClick={onBlogClick} />

                        {/* Profile mode action buttons */}
                        {isProfilemode && (
                            <div className="mt-2 w-full flex gap-2 transition-opacity duration-200">
                                {/* Edit blog button */}
                                <button
                                    onClick={() => onEditClick(blog._id)}
                                    className="p-2 flex justify-center w-1/2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors duration-200 shadow-lg"
                                    title="Edit blog"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>

                                {/* Delete blog button */}
                                <button
                                    onClick={() => onDelete(blog._id)}
                                    className="p-2 flex justify-center w-1/2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-lg text-white text-sm font-medium transition-colors duration-200 shadow-lg"
                                    title="Delete blog"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogListing;
