import { useState, type ReactNode } from "react";
import { AuthContext } from './auth-context';

/**
 * Provides authentication context to its children.
 * 
 * @param {object} props
 * @param {ReactNode} props.children - The child components that need access to auth context.
 * @returns {JSX.Element} The provider wrapping child components.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
    // Initial state checks if a token is already stored in localStorage
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('token')
    );

    /**
     * Marks the user as authenticated.
     * Can be extended to store a token if needed.
     */
    const login = () => setIsAuthenticated(true);

    /**
     * Logs the user out by clearing token from localStorage
     * and updating authentication state.
     */
    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
