import { z } from 'zod';

export const signInSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must be less than 50 characters'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password must be less than 100 characters'),
});

export const signUpSchema = z.object({
    username: z
        .string()
        .min(1, 'Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters')
        .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .regex(/(?=.*\d)/, 'Password must contain at least one number'),
    confirmPassword: z
        .string()
        .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});


// Zod schema for blog validation
export const BlogSchema = z.object({
    title: z.string()
        .min(1, "Title is required")
        .min(5, "Title must be at least 5 characters")
        .max(100, "Title must be less than 100 characters")
        .refine(val => val.trim().length > 0, "Title cannot be empty or just whitespace")
        .refine((val) => {
            // Check for HTML tags
            const htmlTagPattern = /<\s*(script|img|iframe|object|embed|link|style|meta|form|input|button|textarea|base|frame|frameset|applet)\s*[^>]*>/i;
            // Check for HTML entities
            const entityPattern = /&lt;\s*(script|img|iframe|object|embed|link|style|meta|form|input|button|textarea|base|frame|frameset|applet)\s*[^&]*&gt;/i;
            // Check for event handlers
            const eventPattern = /on(error|load|mouseover|focus|keydown|keyup|click|change|blur|select|submit|resize|unload|abort|contextmenu)\s*=/i;
            // Check for javascript: protocol
            const jsProtocolPattern = /javascript\s*:/i;
            // Check for data: URLs with scripts
            const dataUrlPattern = /data\s*:\s*[^,]*script/i;
            return !(htmlTagPattern.test(val) || entityPattern.test(val) || eventPattern.test(val) || jsProtocolPattern.test(val) || dataUrlPattern.test(val));
        }, 'Potentially dangerous text or keyword found'),

    description: z.string()
        .min(1, "Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(300, "Description must be less than 300 characters")
        .refine(val => val.trim().length > 0, "Description cannot be empty or just whitespace")
        .refine((val) => {
            // Check for HTML tags
            const htmlTagPattern = /<\s*(script|img|iframe|object|embed|link|style|meta|form|input|button|textarea|base|frame|frameset|applet)\s*[^>]*>/i;
            // Check for HTML entities
            const entityPattern = /&lt;\s*(script|img|iframe|object|embed|link|style|meta|form|input|button|textarea|base|frame|frameset|applet)\s*[^&]*&gt;/i;
            // Check for event handlers
            const eventPattern = /on(error|load|mouseover|focus|keydown|keyup|click|change|blur|select|submit|resize|unload|abort|contextmenu)\s*=/i;
            // Check for javascript: protocol
            const jsProtocolPattern = /javascript\s*:/i;
            // Check for data: URLs with scripts
            const dataUrlPattern = /data\s*:\s*[^,]*script/i;
            return !(htmlTagPattern.test(val) || entityPattern.test(val) || eventPattern.test(val) || jsProtocolPattern.test(val) || dataUrlPattern.test(val));
        }, 'Potentially dangerous text or keyword found'),

    content: z.string()
        .min(1, "Content is required")
        .min(50, "Content must be at least 50 characters")
        .max(10000, "Content must be less than 10,000 characters")
        .refine(val => val.trim().length > 0, "Content cannot be empty or just whitespace")
        .refine((val) => {
            // Check for HTML tags
            const htmlTagPattern = /<\s*(script|img|iframe|object|embed|link|style|meta|form|input|button|textarea|base|frame|frameset|applet)\s*[^>]*>/i;
            // Check for HTML entities
            const entityPattern = /&lt;\s*(script|img|iframe|object|embed|link|style|meta|form|input|button|textarea|base|frame|frameset|applet)\s*[^&]*&gt;/i;
            // Check for event handlers
            const eventPattern = /on(error|load|mouseover|focus|keydown|keyup|click|change|blur|select|submit|resize|unload|abort|contextmenu)\s*=/i;
            // Check for javascript: protocol
            const jsProtocolPattern = /javascript\s*:/i;
            // Check for data: URLs with scripts
            const dataUrlPattern = /data\s*:\s*[^,]*script/i;
            return !(htmlTagPattern.test(val) || entityPattern.test(val) || eventPattern.test(val) || jsProtocolPattern.test(val) || dataUrlPattern.test(val));
        }, 'Potentially dangerous text or keyword found'),

    userID: z.string("User if is required")
});


export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type BlogData = z.infer<typeof BlogSchema>;

