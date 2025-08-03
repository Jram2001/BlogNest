import React, { forwardRef } from 'react';

type TextInputProps = {
    label?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
    showErrorIcon?: boolean;
    type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
    label,
    placeholder,
    error,
    required = false,
    showErrorIcon = true,
    type = 'text',
    className = '',
    ...rest
}, ref) => {
    const hasError = Boolean(error);

    const inputClasses = `
        w-full px-4 py-2 rounded-md 
        bg-[var(--primary-color)] 
        text-[var(--primary-text-color)] 
        placeholder-gray-500 
        shadow-sm 
        border-2 
        transition-all duration-200 
        focus:outline-none 
        focus:ring-2 
        ${hasError
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-transparent focus:ring-[var(--primary-text-color)] focus:border-[var(--primary-text-color)]'
        }
        ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
        <div className="my-3">
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <label
                        className="text-left text-sm font-medium text-[var(--secondary-text-color)]"
                        htmlFor={rest.id}
                    >
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>

                    {showErrorIcon && hasError && (
                        <div className="relative group">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600 transition-colors"
                                aria-label="Error"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            )}

            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                className={inputClasses}
                aria-invalid={hasError}
                aria-describedby={hasError ? `${rest.id || 'input'}-error` : undefined}
                {...rest}
            />

            {hasError && (
                <p
                    id={`${rest.id || 'input'}-error`}
                    className="mt-1 text-sm text-red-600"
                    role="alert"
                >
                    {error}
                </p>
            )}
        </div>
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;