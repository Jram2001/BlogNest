import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth-service';

type NavigationProps = {
    isLoading?: boolean;
};

const Navigation: React.FC<NavigationProps> = ({
    isLoading = false
}) => {
    /**
     * Boolean representing mobile menu visibility state
     * @type {boolean}
     */
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    /**
     * Current location object from react router
     */
    const location = useLocation();

    /**
     * Navigation function for programmatic routing
     */
    const navigate = useNavigate();

    /**
     * Handles user logout by clearing storage and redirecting to home
     */
    const handleLogout = async () => {
        try {
            const response = await logout();
            console.log(response)
        } catch (err) {
            console.log(err, 'there is an error')
        }
        localStorage.clear();
        navigate('/');
    };

    /**
     * Checks if current path matches the provided path for active state
     * 
     * @param {string} path - The path to check against current location
     * @returns {boolean} True if paths match
     */
    const isActivePath = (path: string) => location.pathname === path;

    /**
     * Returns CSS classes for desktop navigation links based on active state
     * 
     * @param {string} path - The path to generate classes for
     * @returns {string} Combined CSS classes string
     */
    const linkClasses = (path: string) =>
        `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActivePath(path)
            ? 'bg-indigo-600 text-white shadow-md'
            : 'text-white hover:text-indigo-200 hover:bg-gray-700'
        }`;

    /**
     * Returns CSS classes for mobile navigation links based on active state
     * 
     * @param {string} path - The path to generate classes for
     * @returns {string} Combined CSS classes string
     */
    const mobileLinkClasses = (path: string) =>
        `block px-4 py-3 text-base font-medium transition-all duration-200 ${isActivePath(path)
            ? 'bg-indigo-600 text-white'
            : 'text-white hover:text-indigo-200 hover:bg-gray-700'
        }`;

    return (
        <>
            {/* Main navigation bar */}
            <nav className="bg-[#090909] border-b border-gray-700 shadow-lg w-full fixed top-0 left-0 z-50">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Brand Logo */}
                        <div className="flex items-center">
                            <Link
                                to="home"
                                className="text-2xl font-[Jaro] font-bold transition-colors duration-200 transform perspective-1000 rotate-x-100 skew-y-100"
                                style={{
                                    transform: 'perspective(300px) rotateX(15deg) skewY(-3deg)'
                                }}
                            >
                                BlogNest
                            </Link>
                        </div>

                        {/* Desktop Navigation - Only main functionality pages */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="home" className={linkClasses('/home')}>
                                    Home
                                </Link>
                                <Link to="create" className={linkClasses('/create')}>
                                    Create Post
                                </Link>
                                <Link to="profile" className={linkClasses('/profile')}>
                                    My Profile
                                </Link>
                            </div>
                        </div>

                        {/* User Menu / Auth Actions */}
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6 space-x-4">
                                <button
                                    onClick={handleLogout}
                                    disabled={isLoading}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 ${isLoading
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'
                                        }`}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging out...
                                        </div>
                                    ) : (
                                        'Logout'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400 transition-all duration-200"
                            >
                                <svg className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu - Only main functionality pages */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="px-2 pt-2 text-white pb-3 space-y-1 bg-[#0a0a0a] border-t border-gray-700">
                        <Link
                            to="/"
                            className={mobileLinkClasses('')}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="create"
                            className={mobileLinkClasses('/create')}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Create Post
                        </Link>
                        <Link
                            to="profile"
                            className={mobileLinkClasses('/profile')}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            My Profile
                        </Link>

                        {/* Mobile logout button */}
                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-200 ${isLoading
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'text-red-400 hover:text-red-300 hover:bg-gray-700'
                                }`}
                        >
                            {isLoading ? 'Logging out...' : 'Logout'}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;
