import { httpDelete, httpGet, httpPost, httpPut } from "../api/http-service"
import type { BlogData } from "../schema/authentication-schema";
import type { Blog, BlogListResponse, CreateBlogParam, SingleBlogResponse } from "./blog-interface";

export const getAllBlogs = async (userID?: string): Promise<BlogListResponse> => {
    const response = await httpGet<BlogListResponse>('blog', { userID });
    return response;
}

// Get a single blog by ID (Public)
export const getBlogById = async (id: string): Promise<SingleBlogResponse> => {
    return await httpGet<SingleBlogResponse>(`blog/${id}`);
};

// Create a new blog (Protected)
export const createBlog = async (data: Partial<CreateBlogParam>): Promise<Blog> => {
    return await httpPost<Blog>('blog', data);
};

// Update a blog by ID (Protected)
export const updateBlog = async (id: string, data: Partial<BlogData>): Promise<Blog> => {
    return await httpPut<Blog>(`blog/${id}`, data);
};

// Delete a blog by ID (Protected)
export const deleteBlog = async (id: string): Promise<{ success: boolean; message?: string }> => {
    return await httpDelete<{ success: boolean; message?: string }>(`blog/${id}`);
};

// Update a blog by userID (Protected)
export const getBlogByUserId = async (userID: string): Promise<BlogListResponse> => {
    return await httpGet<BlogListResponse>(`blog/getuserblogs/${userID}`);
};
