// src/services/auth.service.ts
import { httpGet, httpPost } from '../api/http-service';
import type { IUser, RawSignInResponse, SignInCredentials, SignUpCredentials } from './auth-interface';

const BASE_URL = '/auth';
/**
 * Authenticates user with credentials
 */
export const signIn = async (credentials: SignInCredentials): Promise<RawSignInResponse> => {
    return httpPost<RawSignInResponse, SignInCredentials>(
        `${BASE_URL}/login`,
        credentials
    );
};

/**
 * Registers new user account
 */
export const signUp = async (credentials: SignUpCredentials): Promise<RawSignInResponse> => {
    return httpPost<RawSignInResponse, SignUpCredentials>(
        `${BASE_URL}/register`,
        credentials
    );
};

/**
 * Registers new user account
 */
export const logout = async () => {
    console.log('logged out');
    return httpPost(
        `${BASE_URL}/logout`, { id: localStorage.getItem('token') }
    );
};

/**
 * Function to get one user by user id
 */
export const getOneUser = async (userID: string): Promise<IUser> => {
    return httpGet(`${BASE_URL}/getone`, { userID })
}


/**
 * Ends user session
 */
export const signOut = (): void => {
    localStorage.clear();
};


/**
 * Auth service namespace object
 */
export const authService = {
    signIn,
    signUp,
} as const;

/**
 * Default auth service export
 */
export default authService;
