
// Authentication request interfaces
export interface SignInCredentials {
    username: string; // Username or email
    password: string;
}

export type RawSignInResponse = {
    success: boolean;
    message: string;
    data: {
        user: {
            id: string;
            username: string;
            email: string;
            createdAt: string;
        };
        token: string;
    };
};

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

// Authentication response interfaces
export interface SignInResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: string;
    };
}

export interface SignUpResponse {
    token: string;
    user: {
        id: string;
        username: string;
        email: string;
        createdAt: string;
    };
    message?: string;
}

// User data interface
export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string;
}

// User management response interfaces
export interface GetAllUsersResponse {
    users: User[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
    message?: string; // For empty results
}

export interface DeleteUserResponse {
    message: string;
}

// Error handling interfaces
export interface AuthError {
    message: string;
    statusCode: number;
    field?: string;
}

export interface ApiErrorResponse {
    error: {
        message: string;
        statusCode: number;
        field?: string;
    };
}


export interface IUser {
    success: boolean;
    message: string;
    data: {
        user: {
            id: string;
            username: string;
            email: string;
            createdAt: string;
        }
    }
}