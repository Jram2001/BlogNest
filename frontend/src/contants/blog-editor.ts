// constants/blogEditor.ts
export const BLOG_EDITOR_STYLES = {
    title: {
        className: "text-5xl font-bold leading-tight mb-6",
        style: {
            fontFamily: '"Georgia", "Times New Roman", serif',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
        }
    },
    description: {
        className: "text-xl leading-relaxed mb-12",
        style: {
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            fontWeight: '400',
            lineHeight: '1.6',
        }
    },
    content: {
        className: "prose prose-lg max-w-none mb-12",
        style: {
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontSize: '21px',
            lineHeight: '1.8',
            letterSpacing: '-0.003em',
            minHeight: '400px',
            textAlign: 'left' as const,
        }
    }
} as const;

export const PLACEHOLDERS = {
    title: "Your compelling blog title goes here...",
    description: "A compelling subtitle or brief description that draws readers in...",
    content: "Start writing your story...\n\nPress Enter to create new paragraphs. You can use bold and italic formatting while typing."
} as const;
