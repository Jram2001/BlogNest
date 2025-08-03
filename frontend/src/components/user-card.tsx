import React from 'react';

type UserCardProps = {
    username: string;
    email: string;
    buttonText?: string;
    onButtonClick?: () => void;
    isLoading?: boolean;
};


/**
 * React component used to display user info in a card
 * @param username  -> User name of the user
 * @param email  -> Email of the user
 * @param buttonText  -> Text inside button to be displayed
 * @param onButtonClick  -> call backfunction user for button click event
 * @param isLoading  -> State of component 
 * @returns 
 */
const UserCard: React.FC<UserCardProps> = ({
    username,
    email,
    buttonText,
    onButtonClick,
    isLoading = false
}) => {
    return (
        <div className="max-w-md w-7xl mx-auto mt-10 p-10 bg-[#090909] rounded-2xl border border-gray-700 text-gray-200 shadow-lg transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:border-indigo-400 flex flex-col">
            <h2 className="mb-6 text-2xl font-semibold text-center">User Profile</h2>

            <div className="flex flex-col space-y-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Username
                    </label>
                    <div className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200">
                        {username}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        Email
                    </label>
                    <div className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200">
                        {email}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onButtonClick}
                    disabled={isLoading}
                    className={`mt-4 w-full py-3 font-bold text-lg rounded-md transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50 ${isLoading
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 text-gray-100 hover:bg-indigo-700 active:scale-95'
                        }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading...
                        </div>
                    ) : (
                        buttonText
                    )}
                </button>
            </div>
        </div>
    );
};

export default UserCard;
