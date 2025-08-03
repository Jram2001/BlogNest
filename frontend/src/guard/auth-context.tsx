import { createContext, useContext } from "react";

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
};

/**
 * React context used for managing authentication state.
 * Initially set to `undefined` to enforce use within `AuthProvider`.
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Custom hook to access authentication context.
 *
 * @throws Will throw an error if used outside of `AuthProvider`.
 * @returns {AuthContextType} The authentication context value.
 */
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
}
