import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../util/ui/input';
import { signUpSchema, type SignUpFormData } from '../schema/authentication-schema';
import authService from '../services/auth-service';
import type { RawSignInResponse } from '../services/auth-interface';

type SignUpCardProps = {
    onSignUp?: (response: RawSignInResponse) => void; // Updated to pass response data
    onError?: (error: string) => void;
    isLoading?: boolean;
};

/**
 * React component controles sign-up ui
 * @param onSignUp -> callback function for signup functionality 
 * @param onError -> callback function for on error functionality
 * @param isLoading -> State of the signup callback  function
 * @returns 
 */
const SignUpCard: React.FC<SignUpCardProps> = ({
    onSignUp,
    onError,
    isLoading = false
}) => {

    /**
     * API error variable used to display errors
     * @type {string}
     */
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: 'onTouched',
    });

    /**
     * Fuction used to send local data to backend and create a user
     * @param data 
     */
    const onSubmit = async (data: SignUpFormData) => {
        try {
            setApiError(null);

            const response = await authService.signUp({
                username: data.username,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            });

            if (onSignUp) {
                onSignUp(response);
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Account creation failed';
            setApiError(errorMessage);

            if (onError) {
                onError(errorMessage);
            }

            console.error('Sign up error:', error);
        }
    };

    /**
     * Variables used for disabling form while loading.
     * @param boolean
     */
    const isFormDisabled = isLoading || isSubmitting;

    return (
        <div className="max-w-md w-7xl mx-auto mt-10 p-10 bg-[#090909] rounded-2xl border border-gray-700 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:border-indigo-400 flex flex-col">
            <h2 className="mb-6 text-2xl font-semibold text-center">Create Account</h2>

            {apiError && (
                <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-md text-red-200 text-sm">
                    {apiError}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                {/**User name inupt */}
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

                {/**Email inupt */}
                <TextInput
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    error={errors.email?.message}
                    required
                    disabled={isFormDisabled}
                    autoComplete="email"
                    id="email"
                    {...register('email')}
                />

                {/**Password inupt */}
                <TextInput
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                    error={errors.password?.message}
                    required
                    disabled={isFormDisabled}
                    autoComplete="new-password"
                    id="password"
                    {...register('password')}
                />

                {/**Confirm password inupt */}
                <TextInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    error={errors.confirmPassword?.message}
                    required
                    disabled={isFormDisabled}
                    autoComplete="new-password"
                    id="confirmPassword"
                    {...register('confirmPassword')}
                />

                {/**Button for submitting form */}
                <button
                    type="submit"
                    disabled={isFormDisabled}
                    className={`mt-6 w-full py-3 font-bold text-lg rounded-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 ${isFormDisabled
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
                            Creating Account...
                        </div>
                    ) : (
                        'Create Account'
                    )}
                </button>
            </form>
        </div>
    );
};

export default SignUpCard;
