import { createContext, useContext, useState, type ReactNode } from "react";

type SnackBarType = {
    message: string | undefined;
    variation: string | undefined;
    showSnackbar: (input: { message: string; variation: string }) => void;
};

/**
 * Snackbar context used to maintain snackbar message and variation
 * @type {SnackBarType}
 */
const snackbarContext = createContext<SnackBarType | undefined>(undefined);

/**
 * Function used to create a custome hook.
 * Used to access snackbar context values.
 * @type {SnackBarType}
 * @retuns {context}
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useSnackBar() {
    const context = useContext(snackbarContext)
    if (!context) {
        throw new Error('Context must be used inside a provider');
    }
    return context;
}

/**
 * React provider used to provide snackbar context 
 * 
 * @param children -> Child components can access context 
 * @returns jsx provider
 */
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<string>();
    const [variation, setVariation] = useState<string>();
    const showSnackbar = ({ message, variation }: { message: string, variation: string }) => {
        setMessage(message)
        setVariation(variation)
    }
    return (
        <snackbarContext.Provider value={{ message, variation, showSnackbar }}>
            {children}
        </snackbarContext.Provider>
    )
}

