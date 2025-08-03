import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInCard from '../components/sign-in-card';
import SignUpCard from '../components/sign-up-card';
import type { RawSignInResponse } from '../services/auth-interface';

const AuthenticationPage: React.FC = () => {

    /**
     * Boolean state for signin adn signup sate of this components.
     * @type {boolean}
     */
    const [isSignUp, setIsSignUp] = useState(false);

    /**
     * React hook used for page navigation.
     */
    const navigate = useNavigate();

    /**
     * Function used after signing
     * Setup local storage values
     * Navigate to dashboard components  
     */
    const handleSignIn = (response: RawSignInResponse) => {
        try {
            // Store authentication data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', JSON.stringify(response.data.user.username));
            localStorage.setItem('userID', JSON.stringify(response.data.user.id));

            // Redirect to dashboard or home page
            navigate('/dashboard/home');
        } catch (error) {
            console.error('Error handling sign in response:', error);
        }
    };

    /**
     * Function used after signup
     * Setup local storage values
     * Navigate to dashboard components  
     */
    const handleSignUp = (response: RawSignInResponse) => {
        try {
            // Store authentication data
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user.username));
            console.log('User signed up:', response);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error handling sign up response:', error);
        }
    };

    /**
     * Handles authentication error 
     */
    const handleAuthError = (error: string) => {
        console.error('Authentication error:', error);
    };

    /**
     * Function used to witch component modes 
     */
    const handleToggleMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex overflow-hidden rounded-xl flex-col items-center justify-center">
                {isSignUp ? (
                    <SignUpCard
                        onSignUp={handleSignUp}
                        onError={handleAuthError}
                    />
                ) : (
                    <SignInCard
                        onSignIn={handleSignIn}
                        onError={handleAuthError}
                    />
                )}

                <button
                    onClick={handleToggleMode}
                    className="mt-4 text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
                >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default AuthenticationPage;
