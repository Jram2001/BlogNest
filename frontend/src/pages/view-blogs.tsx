import { useNavigate, useParams } from "react-router-dom";
import BlogView from "./preview-blog";
import { useEffect, useState } from "react";
import { getBlogById } from "../services/blog-service";
import type { Blog } from "../services/blog-interface";

export const BlogPreviewWrapper = () => {
    /**
     * Blog if fetched from route param
     * @type {string}
     */
    const { id } = useParams();

    /**
     * Blog data used to pass blog information to view page
     * @type {Blog}
     */
    const [blogData, setBlogData] = useState<Blog>();

    /**
     * React hook used for navigation
     */
    const navigate = useNavigate();

    /**
     * Side effect function used o load blog data while mounting
     */
    useEffect(() => {
        fetchBlog('' + id)
    }, [id]);

    /**
     * Fetches blog data from the backend using the provided blog ID.
     *
     * @param {string} id - The ID of the blog to fetch.
     * @returns {Promise<void>} A promise that resolves when the data is fetched.
     */
    const fetchBlog = async (id: string) => {
        try {
            const response = await getBlogById(id);
            setBlogData(response.data);
            return response;
        } catch (error) {
            console.error("Failed to fetch blog:", error);
        }
    }

    /**
     * Function to navigate back to home page
     */
    const onBack = () => {
        navigate('/dashboard/home')
    }

    return (
        <>
            {blogData &&
                <BlogView
                    blogData={blogData}
                    mode="view"
                    showActions={true}
                    onBack={onBack}
                />
            }
        </>
    );
};
