import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogById } from '../services/blog-service';
import type { Blog } from '../services/blog-interface';

interface EditorBlog {
    _id?: string;
    title: string;
    description: string;
    content: string;
    userID?: { _id: string, username: string };
    createdAt?: string;
    updatedAt?: string;
}

type BlogViewProps = {
    blogData: Blog;
    mode?: 'preview' | 'view';
    onBack?: () => void;
    onEdit?: () => void;
    onPublish?: () => void;
    showActions?: boolean;
    authorName?: string;
};

const BlogView: React.FC<BlogViewProps> = ({
    blogData,
    mode = 'view',
    onBack,
    onEdit,
    onPublish,
    showActions = true,
}) => {
    /**
     * Blog if fetched from route param
     * @type {string}
     */
    const { id } = useParams<{ id: string }>();

    /**
     * Boolean representing loading state of the component
     * @type {boolean}
     */
    const [isLoading, setIsLoading] = useState<boolean>((mode == 'view' && !blogData));

    /**
     * Contains blog data to display in ui
     * @type {EditorBlog}
     */
    const [blogContent, setBlogContent] = useState<EditorBlog>(blogData);

    /**
     * Boolean representing component ie. view or preview
     * @type {boolean}
     */
    const isPreviewMode = mode === 'preview';

    /**
     * Fetches blog data from the backend using the provided blog ID.
     *
     * @param {string} blogId - The ID of the blog to fetch.
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    const fetchBlogData = async (blogId: string) => {
        try {
            setIsLoading(true);
            const response = await getBlogById(blogId);
            if (response) {
                setIsLoading(false);
                setBlogContent(response.data);
            }
        } catch (error) {
            console.error('Error fetching blog data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
      * Side effect function usedt to load blog data while mounting in view mode
      */
    useEffect(() => {
        if (mode === 'preview') {
            setBlogContent(blogData);
        } else if (mode == 'view' && id) {
            fetchBlogData(id);
        }
    }, [blogData, id, mode]);

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto mt-10 flex justify-center items-center">
                <div className="text-gray-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto mt-10">
            {/* Navigation Bar */}
            {showActions && (
                <div className="mb-6 flex justify-between items-center">
                    <button
                        onClick={onBack}
                        className="flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-200"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {isPreviewMode ? 'Back to Editor' : 'Back'}
                    </button>

                    {isPreviewMode && (
                        <div className="flex gap-3">
                            <button
                                onClick={onEdit}
                                className="px-6 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={onPublish}
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                            >
                                Publish
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Blog Post Container */}
            <article className="bg-[#090909] rounded-2xl border border-gray-700 shadow-lg overflow-hidden">
                <div className="px-12 py-16">
                    {/* Blog Title */}
                    <h1
                        className="text-5xl font-bold leading-tight mb-6 text-gray-100"
                        style={{
                            fontFamily: '"Georgia", "Times New Roman", serif',
                            lineHeight: '1.2',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        {blogContent.title || "Untitled Blog Post"}
                    </h1>

                    {/* Published Date */}
                    {!isPreviewMode && blogContent.createdAt && (
                        <div className="mb-6">
                            <p className="text-gray-500 text-sm">
                                Published on {new Date(blogContent.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    )}

                    {/* Blog Description */}
                    <p
                        className="text-xl leading-relaxed mb-12 text-gray-400"
                        style={{
                            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
                            fontWeight: '400',
                            lineHeight: '1.6',
                        }}
                    >
                        {blogContent.description || "No description provided."}
                    </p>

                    {/* Blog Content */}
                    <div
                        className="prose prose-lg max-w-none text-gray-200"
                        style={{
                            fontFamily: '"Georgia", "Times New Roman", serif',
                            fontSize: '21px',
                            lineHeight: '1.8',
                            letterSpacing: '-0.003em',
                            textAlign: 'left',
                            whiteSpace: 'pre-wrap',
                        }}
                    >
                        {blogContent.content || "Start writing your story..."}
                    </div>

                    {/* Author info */}
                    <div className="mt-12 pt-8 border-t border-gray-700">
                        <p className="text-gray-500 text-sm">
                            {isPreviewMode ? 'Published by' : 'By'}{' '}
                            <span className="text-gray-400 font-medium">
                                {blogData.userID.username || 'Author Name'}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="px-12 py-8 bg-gray-900 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                        <div className="text-gray-400 text-sm">
                            <span>{isPreviewMode ? 'Preview Mode' : 'Published'}</span>
                        </div>
                        <div className="flex gap-4 text-gray-400 text-sm">
                            <span>Words: {blogContent.content ? blogContent.content.split(' ').length : 0}</span>
                            <span>•</span>
                            <span>Characters: {blogContent.content ? blogContent.content.length : 0}</span>
                        </div>
                    </div>
                </div>
            </article>

            {/* Custom Styles */}
            <style>{`
                .prose p {
                    margin-bottom: 1.5em;
                }
                
                .prose strong {
                    font-weight: 700;
                    color: #F3F4F6;
                }
                
                .prose em {
                    font-style: italic;
                    color: #E5E7EB;
                }
            `}</style>
        </div>
    );
};

export default BlogView;
