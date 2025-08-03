import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../util/ui/input';
import { signInSchema, type SignInFormData } from '../schema/authentication-schema';
import authService from '../services/auth-service';
import type { RawSignInResponse } from '../services/auth-interface';

type SignInCardProps = {
    onSignIn?: (response: RawSignInResponse) => void;
    onError?: (error: string) => void;
    isLoading?: boolean;
};

const SignInCard: React.FC<SignInCardProps> = ({
    onSignIn,
    onError,
    isLoading = false
}) => {
    /**
     * API error message to display in ui
     * @type {string | null}
     */
    const [apiError, setApiError] = useState<string | null>(null);

    /**
     * React hook form configuration for sign in form validation
     */
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        mode: 'onTouched',
    });

    /**
     * Handles form submission and authentication process
     * 
     * @param {SignInFormData} data - Form data containing username and password
     * @returns {Promise<void>} A promise that resolves when sign in is complete
     */
    const onSubmit = async (data: SignInFormData) => {
        try {
            setApiError(null);

            const response = await authService.signIn({
                username: data.username,
                password: data.password,
            });

            if (onSignIn) {
                onSignIn(response);
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ? (error as any)?.response?.data?.message || error.message
                : 'Sign in failed'; setApiError(errorMessage);

            if (onError) {
                onError(errorMessage);
            }

            console.error('Sign in error:', error);
        }
    };

    /**
     * Boolean representing if form should be disabled during loading states
     * @type {boolean}
     */
    const isFormDisabled = isLoading || isSubmitting;

    return (
        <div className="max-w-md w-7xl mx-auto mt-10 p-10 bg-[#090909] rounded-2xl border border-gray-700 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:border-indigo-400 flex flex-col">
            {/* Sign in form header */}
            <h2 className="mb-6 text-2xl font-semibold text-center">Sign In</h2>

            {/* Error message display */}
            {apiError && (
                <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-md text-red-200 text-sm">
                    {apiError}
                </div>
            )}

            {/* Main sign in form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
                <TextInput
                    label="Username"
                    placeholder="Enter username"
                    error={errors.username?.message}
                    required
                    disabled={isFormDisabled}
                    autoComplete="username"
                    id="username"
                    {...register('username')}
                />

                <TextInput
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    error={errors.password?.message}
                    required
                    disabled={isFormDisabled}
                    autoComplete="current-password"
                    id="password"
                    {...register('password')}
                />

                {/* Submit button with loading state */}
                <button
                    type="submit"
                    disabled={isFormDisabled}
                    className={`mt-4 w-full py-3 font-bold text-lg rounded-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 ${isFormDisabled
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-gray-100 hover:bg-indigo-700 active:scale-95'
                        }`}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing In...
                        </div>
                    ) : (
                        'Sign In'
                    )}
                </button>
            </form>
        </div>
    );
};

export default SignInCard;
