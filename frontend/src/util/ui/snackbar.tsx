import { useEffect, useState } from 'react';
import { useSnackBar } from "../../context/snackbar-context";

export function SnackBar() {
    const { message, variation } = useSnackBar();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message) return null;

    const getStyles = () => {
        switch (variation) {
            case 'success': return 'bg-green-600 text-white';
            case 'error': return 'bg-red-600 text-white';
            case 'warning': return 'bg-yellow-600 text-white';
            default: return 'bg-gray-800 text-white';
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className={`
                px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out
                ${getStyles()}
                ${show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
            `}>
                {message}
            </div>
        </div>
    );
}
