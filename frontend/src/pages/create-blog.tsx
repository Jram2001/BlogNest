import React, { useEffect, useState, type RefObject } from 'react';
import { useBlogEditor } from '../util/hooks/useBloggerEditor';
import { BLOG_EDITOR_STYLES, PLACEHOLDERS } from '../contants/blog-editor';
import { ValidationErrorSummary } from '../components/blog-editor/ValidationErrorSummary';
import { EditableField } from '../components/blog-editor/editable-feild';
import { PublishSection } from '../components/blog-editor/publish';
import BlogPreview from './preview-blog';
import type { Blog } from '../services/blog-interface';
import { useParams } from 'react-router-dom';
import { createBlog, getBlogById, updateBlog } from '../services/blog-service';
import type { BlogData } from '../schema/authentication-schema';

type BlogEditorProps = {
    blogData?: Blog
};

const BlogEditor: React.FC<BlogEditorProps> = () => {
    /**
     * Blog if fetched from route param.
     * @type {string}
     */
    const { id } = useParams<{ id: string }>();

    /**
     * Boolean representing publishing state of the content.
     * @type {boolean}
     */
    const [isPublishing, setIsPublishing] = useState(false);

    /**
     * Boolean state represents preview state while creating a blog.
     * @type {boolean}
     */
    const [showPreview, setShowPreview] = useState(false);

    /**
     * Boolean representing loading state of the component.
     * @type {boolean}
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Blog data used while editing available blog 
     * @type {Blog}
     */
    const [blogContent, setBlogContent] = useState<Blog>();

    /**
     * Schema type used to verify contnet of blog data  
     * @type {Blog}
     */
    const [localData, setLocalData] = useState<Partial<BlogData>>();

    /**
     * Custom hook for handling blog editor logic.
     *
     * Destructured values:
     * @property {Record<string, React.RefObject>} refs - Refs for form fields used to manage focus.
     * @property {Record<string, string>} validationErrors - Validation errors for blog fields.
     * @property {() => Blog} getBlogData - Function to get current blog form data.
     * @property {() => boolean} validateBlogData - Validates the blog data and returns whether it is valid.
     * @property {(field: string) => void} clearErrorOnFocus - Clears validation error when the user focuses on a field.
     * @property {() => void} focusFirstErrorField - Focuses on the first field that has a validation error.
     */
    const {
        refs,
        validationErrors,
        getBlogData,
        validateBlogData,
        clearErrorOnFocus,
        focusFirstErrorField
    } = useBlogEditor();

    /**
     * Function used to fetch blog data from backend
     * Exclusive for editior mode  
     * @type {blogId} - Blog id of the required blog
     */
    const fetchBlogData = async (blogId: string) => {
        try {
            setIsLoading(true);
            const response = await getBlogById(blogId);
            if (response) {
                setIsLoading(false);
                setBlogContent(response.data);
            }
        } catch (error) {
            console.error('Error fetching blog data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Side effect function 
     * Used fetch data while component mopunting
     */
    useEffect(() => {
        if (id) {
            fetchBlogData(id);
        }
    }, [id]);

    /**
     * Function used to trigger preview mode.
     * Validate blog data.
     */
    const handlePreview = async () => {
        const blogData = getBlogData();
        setLocalData(blogData)
        const validation = validateBlogData(blogData);
        if (validation.success) {
            setShowPreview(true);
        } else {
            focusFirstErrorField(validation.errors);
        }
    };

    /**
     * Function used to publish created blog.
     * Send data to backend and save it.
     */
    const handlePublish = async () => {
        try {
            setIsPublishing(true);
            const blogData = getBlogData();
            const validation = validateBlogData(blogData);

            if (!validation.success) {
                focusFirstErrorField(validation.errors);
                return;
            }

            const response = id
                ? await updateBlog(id, blogData)
                : await createBlog(blogData);

            return response;
        } catch (error) {
            console.error('Publishing error:', error);
        } finally {
            setIsPublishing(false);
        }
    };

    /**
     * Function used to disable form of while loading or publishing.
     * @type {boolean}
     */
    const isFormDisabled = isLoading || isPublishing;
    const hasErrors = Object.keys(validationErrors).length > 0;

    if (showPreview) {
        return (
            <BlogPreview
                blogData={{
                    title: getBlogData().title,
                    description: getBlogData().description,
                    content: getBlogData().content
                }}
                onBack={() => setShowPreview(false)}
                onEdit={() => setShowPreview(false)}
            />
        );
    }
    return (
        <div className="max-w-4xl mx-auto mt-10">
            {/** Vali dation errors */}
            <ValidationErrorSummary errors={validationErrors} />
            <article className="bg-[#090909] rounded-2xl border border-gray-700 shadow-lg transition-all duration-300 ease-in-out hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:border-indigo-400 overflow-hidden">
                <div className="px-12 py-16">
                    {/** Editable header tag represent title */}
                    <EditableField
                        elementType="h1"
                        fieldName="title"
                        placeholder={localData?.title || blogContent?.title || PLACEHOLDERS.title}
                        className={BLOG_EDITOR_STYLES.title.className}
                        style={BLOG_EDITOR_STYLES.title.style}
                        error={validationErrors.title}
                        disabled={isFormDisabled}
                        onFocus={() => clearErrorOnFocus('title')}
                        forwardRef={refs.titleRef as RefObject<HTMLElement>}
                    />

                    {/** Editable p tag represent description */}
                    <EditableField
                        elementType="p"
                        fieldName="description"
                        placeholder={localData?.description || blogContent?.description || PLACEHOLDERS.description}
                        className={BLOG_EDITOR_STYLES.description.className}
                        style={BLOG_EDITOR_STYLES.description.style}
                        error={validationErrors.description}
                        disabled={isFormDisabled}
                        onFocus={() => clearErrorOnFocus('description')}
                        forwardRef={refs.descriptionRef as RefObject<HTMLElement>}
                    />

                    {/** Editable div tag represent blog content  */}
                    <EditableField
                        elementType="div"
                        fieldName="content"
                        placeholder={localData?.content || blogContent?.content || PLACEHOLDERS.content}
                        className={BLOG_EDITOR_STYLES.content.className}
                        style={BLOG_EDITOR_STYLES.content.style}
                        error={validationErrors.content}
                        disabled={isFormDisabled}
                        onFocus={() => clearErrorOnFocus('content')}
                        forwardRef={refs.contentRef as RefObject<HTMLElement>}
                    />

                    <div className="mt-12 pt-8 border-t border-gray-700">
                        <p className="text-gray-500 text-sm">
                            Published by <span className="text-gray-400 font-medium">Author Name</span>
                        </p>
                    </div>
                </div>

                {/** Footer section with access to preview , publish functionality */}
                <PublishSection
                    onPreview={handlePreview}
                    onPublish={handlePublish}
                    isDisabled={isFormDisabled}
                    hasErrors={hasErrors}
                    isPublishing={isPublishing}
                />
            </article>
        </div>
    );
};

export default BlogEditor;
