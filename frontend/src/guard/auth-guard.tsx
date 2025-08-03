import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import type { ReactNode } from 'react';

export default function AuthGuard({ children }: { children: ReactNode }) {

    /**
     * Retrieves the token from local storage.
     * Used to verify user authentication status.
     * 
     * @type {string | null}
     */
    const token = localStorage.getItem('token');

    // If token doesn't exist, redirect to home/login page
    if (!token) {
        return <Navigate to="/" />;
    }

    try {
        /**
         * Decode the JWT token to extract the expiration time (`exp`).
         * `exp` is in seconds since Unix epoch.
         */
        const { exp } = jwtDecode<{ exp: number }>(token);

        // If token has expired, remove it and redirect
        if (!exp || exp * 1000 <= Date.now()) {
            localStorage.removeItem('token');
            return <Navigate to="/" />;
        }
    } catch {
        // If decoding fails (invalid token), remove token and redirect
        localStorage.removeItem('token');
        return <Navigate to="/" />;
    }

    // If token is valid, render the protected children
    return <>{children}</>;
}
