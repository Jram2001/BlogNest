// components/BlogEditor/PublishSection.tsx
import React from 'react';

interface PublishSectionProps {
    onPreview: () => void;
    onPublish: () => void;
    isDisabled: boolean;
    hasErrors: boolean;
    isPublishing: boolean;
}

export const PublishSection: React.FC<PublishSectionProps> = ({
    onPreview,
    onPublish,
    isDisabled,
    hasErrors,
    isPublishing
}) => {
    return (
        <div className="px-12 py-8 bg-gray-900 border-t border-gray-700">
            <div className="flex justify-between items-center">
                <div className="text-gray-400 text-sm">
                    <span>Ready to share your story?</span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onPreview}
                        disabled={isDisabled}
                        className={`px-6 py-3 font-semibold text-lg rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50 ${isDisabled
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-700 text-gray-200 hover:bg-gray-600 active:scale-95'
                            }`}
                    >
                        Preview
                    </button>
                    <button
                        onClick={onPublish}
                        disabled={isDisabled || hasErrors}
                        className={`px-8 py-3 font-semibold text-lg rounded-full transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 ${isDisabled || hasErrors
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-lg hover:shadow-xl'
                            }`}
                    >
                        {isPublishing ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Publishing...
                            </div>
                        ) : (
                            'Publish Story'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
