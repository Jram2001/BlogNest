import type { BlogData } from "../../schema/authentication-schema";

// components/BlogEditor/EditableField.tsx
interface EditableFieldProps {
    elementType: 'h1' | 'p' | 'div';
    placeholder: string;
    fieldName: keyof BlogData;
    className: string;
    style?: React.CSSProperties;
    error?: string;
    disabled?: boolean;
    onFocus: () => void;
    forwardRef: React.RefObject<HTMLElement>;
}

export const EditableField: React.FC<EditableFieldProps> = ({
    elementType: Element,
    placeholder,
    className,
    style,
    error,
    disabled,
    onFocus,
    forwardRef
}) => {
    /**
     * Combined CSS classes for the editable element based on state
     * @type {string}
     */
    const baseClassName = `focus:bg-transparent! outline-none transition-all duration-200 ${error
        ? 'text-red-400 border-b-2 border-red-500'
        : 'text-gray-100'
        } ${disabled
            ? 'cursor-not-allowed opacity-50'
            : 'hover:text-indigo-200 focus:text-white'
        }`;

    return (
        <div>
            {/* Dynamic editable element with conditional styling */}
            <Element
                ref={forwardRef as never}
                contentEditable={!disabled}
                suppressContentEditableWarning={true}
                onFocus={onFocus}
                className={`${baseClassName} ${className}`}
                style={style}
            >
                {placeholder}
            </Element>

            {/* Error message display */}
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>
    );
};
