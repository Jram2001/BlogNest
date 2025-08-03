// hooks/useBlogEditor.ts
import { useRef, useState } from 'react';
import { z } from 'zod';
import { BlogSchema, type BlogData } from '../../schema/authentication-schema'

type ValidationErrors = Partial<Record<keyof BlogData, string>>;

export const useBlogEditor = () => {
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const contentRef = useRef<HTMLParagraphElement>(null);

    const getBlogData = (): Omit<BlogData, never> => {
        return {
            title: titleRef.current?.textContent?.trim() || '',
            description: descriptionRef.current?.textContent?.trim() || '',
            content: contentRef.current?.textContent?.trim() || '',
            userID: '' + localStorage?.getItem('userID')
        };
    };

    const validateBlogData = (data: ReturnType<typeof getBlogData>) => {
        try {
            const validatedData = BlogSchema.parse(data);
            setValidationErrors({});
            return { success: true as const, data: validatedData };
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors: ValidationErrors = {};
                error.issues.forEach((err) => {
                    const path = err.path[0] as keyof BlogData;
                    errors[path] = err.message;
                });
                setValidationErrors(errors);
                return { success: false as const, errors };
            }
            return { success: false as const, errors: { title: 'Unknown validation error' } };
        }
    };

    const clearErrorOnFocus = (field: keyof BlogData) => {
        if (validationErrors[field]) {
            setValidationErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const focusFirstErrorField = (errors: ValidationErrors) => {
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField === 'title') titleRef.current?.focus();
        else if (firstErrorField === 'description') descriptionRef.current?.focus();
        else if (firstErrorField === 'content') contentRef.current?.focus();
    };

    return {
        refs: { titleRef, descriptionRef, contentRef },
        validationErrors,
        getBlogData,
        validateBlogData,
        clearErrorOnFocus,
        focusFirstErrorField
    };
};
