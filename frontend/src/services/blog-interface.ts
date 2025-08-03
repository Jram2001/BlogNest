export interface Blog {
    _id: string;
    title: string;
    description: string;
    content: string;
    userID: { _id: string, username: string };
    createdAt: string;
    updatedAt: string;
}

export interface BlogListResponse {
    success: boolean;
    data: Blog[];
}

export interface SingleBlogResponse {
    success: boolean;
    data: Blog;
}

export interface CreateBlogParam {
    title: string;
    description: string;
    content: string;
    userID: string
}