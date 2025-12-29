import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Eye, Clock, X, Search, Trash2 } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { publishContent, updateContent, deleteContent, getContentById } from '../utils/apiService';

interface FormData {
    type: 'news' | 'article';
    translations: {
        'zh-CN': {
            title: string;
            author: string;
            excerpt: string;
            category: string;
            content: string;
        };
        'en-US': {
            title: string;
            author: string;
            excerpt: string;
            category: string;
            content: string;
        };
    };
}

// 处理HTML内容，将代码块转换为SyntaxHighlighter组件
const processContent = (html: string) => {
    if (!html) return null;

    // 使用正则表达式匹配代码块
    const codeBlockRegex = /<pre><code class="language-([^"]*)">([\s\S]*?)<\/code><\/pre>/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    // 分割HTML内容，分离代码块和非代码块部分
    while ((match = codeBlockRegex.exec(html)) !== null) {
        // 添加代码块之前的内容
        if (match.index > lastIndex) {
            const beforeContent = html.substring(lastIndex, match.index);
            if (beforeContent.trim()) {
                parts.push(
                    <div
                        key={`before-${lastIndex}`}
                        dangerouslySetInnerHTML={{ __html: beforeContent }}
                    />
                );
            }
        }

        // 添加代码块
        const language = match[1] || 'javascript';
        const codeText = match[2]
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'");

        parts.push(
            <SyntaxHighlighter
                key={`code-${match.index}`}
                language={language}
                style={oneDark}
                customStyle={{
                    margin: '8px 0',
                    borderRadius: '4px',
                    fontSize: '12px'
                }}
            >
                {codeText}
            </SyntaxHighlighter>
        );

        lastIndex = codeBlockRegex.lastIndex;
    }

    // 添加最后一个代码块之后的内容
    if (lastIndex < html.length) {
        const afterContent = html.substring(lastIndex);
        if (afterContent.trim()) {
            parts.push(
                <div
                    key={`after-${lastIndex}`}
                    dangerouslySetInnerHTML={{ __html: afterContent }}
                />
            );
        }
    }

    // 如果没有找到代码块，直接返回原始HTML
    if (parts.length === 0) {
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }

    return parts;
};

const NewsArticlePublish: React.FC = () => {
    const { t } = useTranslation();

    // 检查是否为编辑模式
    const isEditMode = window.location.hash.includes('mode=edit');

    // 导航函数
    const navigate = (path: string) => {
        window.location.hash = path;
    };

    const [formData, setFormData] = useState<FormData>({
        type: 'article',
        translations: {
            'zh-CN': {
                title: '',
                author: '',
                excerpt: '',
                category: '',
                content: ''
            },
            'en-US': {
                title: '',
                author: '',
                excerpt: '',
                category: '',
                content: ''
            }
        }
    });

    const [readTime, setReadTime] = useState<number>(0);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
    const [editId, setEditId] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [contentLoaded, setContentLoaded] = useState(false);

    // 新闻类别选项
    const newsCategories = [
        { value: 'Frontend', label: '前端' },
        { value: 'Web3', label: 'Web3' },
        { value: 'AI', label: 'AI' }
    ];

    // 计算阅读时长（基于中文和英文内容的总字数）
    useEffect(() => {
        const zhContent = formData.translations['zh-CN'].content;
        const enContent = formData.translations['en-US'].content;

        // 简单计算：中文按字符数，英文按单词数
        const zhWordCount = zhContent.length;
        const enWordCount = enContent.split(/\s+/).filter(word => word.length > 0).length;

        // 假设平均阅读速度：中文每分钟300字，英文每分钟200词
        const zhReadTime = zhWordCount / 300; // 分钟
        const enReadTime = enWordCount / 200; // 分钟

        // 取两者中较大的值，并转换为秒
        const totalReadTimeSeconds = Math.max(zhReadTime, enReadTime) * 60;
        setReadTime(Math.round(totalReadTimeSeconds));
    }, [formData.translations['zh-CN'].content, formData.translations['en-US'].content]);

    // 查询内容功能
    const handleSearchContent = async () => {
        if (!editId.trim()) {
            toast.error(t('publish.errors.idRequired'));
            return;
        }

        setIsSearching(true);

        try {
            const { data, error } = await getContentById(editId.trim());

            if (error || !data) {
                // 清空表单数据
                setFormData({
                    type: 'article',
                    translations: {
                        'zh-CN': {
                            title: '',
                            author: '',
                            excerpt: '',
                            category: '',
                            content: ''
                        },
                        'en-US': {
                            title: '',
                            author: '',
                            excerpt: '',
                            category: '',
                            content: ''
                        }
                    }
                });

                // 重置内容加载状态
                setContentLoaded(false);

                toast.error(t('publish.errors.contentNotFound'));
                return;
            }

            // 填充表单数据
            setFormData({
                type: data.type || 'article',
                translations: {
                    'zh-CN': {
                        title: data.translations?.['zh-CN']?.title || '',
                        author: data.translations?.['zh-CN']?.author || '',
                        excerpt: data.translations?.['zh-CN']?.excerpt || '',
                        category: data.translations?.['zh-CN']?.category || '',
                        content: data.translations?.['zh-CN']?.content || ''
                    },
                    'en-US': {
                        title: data.translations?.['en-US']?.title || '',
                        author: data.translations?.['en-US']?.author || '',
                        excerpt: data.translations?.['en-US']?.excerpt || '',
                        category: data.translations?.['en-US']?.category || '',
                        content: data.translations?.['en-US']?.content || ''
                    }
                }
            });

            // 标记内容已加载
            setContentLoaded(true);
            toast.success(t('publish.success.contentLoaded'));
        } catch (error) {
            console.error('查询内容失败:', error);
            toast.error(t('publish.errors.searchFailed'));
        } finally {
            setIsSearching(false);
        }
    };

    // 删除内容功能
    const handleDeleteContent = async () => {
        if (!editId.trim()) {
            toast.error(t('publish.errors.idRequired'));
            return;
        }

        if (!window.confirm(t('publish.confirmDelete'))) {
            return;
        }

        setIsSubmitting(true);

        try {
            const { error } = await deleteContent(editId.trim());

            if (error) {
                throw new Error(error);
            }

            toast.success(t('publish.success.deleted'));

            // 重置表单
            setFormData({
                type: 'article',
                translations: {
                    'zh-CN': {
                        title: '',
                        author: '',
                        excerpt: '',
                        category: '',
                        content: ''
                    },
                    'en-US': {
                        title: '',
                        author: '',
                        excerpt: '',
                        category: '',
                        content: ''
                    }
                }
            });

            setEditId('');
            setContentLoaded(false);
        } catch (error) {
            console.error('删除内容失败:', error);
            toast.error(t('publish.errors.deleteFailed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    // 处理类型变更
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value as 'news' | 'article';
        setFormData(prev => ({
            ...prev,
            type: newType,
            // 如果从新闻切换到文章或反之，清空类别
            translations: {
                ...prev.translations,
                'zh-CN': {
                    ...prev.translations['zh-CN'],
                    category: ''
                },
                'en-US': {
                    ...prev.translations['en-US'],
                    category: ''
                }
            }
        }));
    };

    // 处理表单字段变更
    const handleFieldChange = (
        lang: 'zh-CN' | 'en-US',
        field: keyof FormData['translations']['zh-CN'],
        value: string
    ) => {
        setFormData(prev => ({
            ...prev,
            translations: {
                ...prev.translations,
                [lang]: {
                    ...prev.translations[lang],
                    [field]: value
                }
            }
        }));
    };

    // 提交表单
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 基本验证
        if (!formData.translations['zh-CN'].title || !formData.translations['en-US'].title) {
            toast.error(t('publish.errors.titleRequired'));
            return;
        }

        if (!formData.translations['zh-CN'].content || !formData.translations['en-US'].content) {
            toast.error(t('publish.errors.contentRequired'));
            return;
        }

        if (!formData.translations['zh-CN'].category || !formData.translations['en-US'].category) {
            toast.error(t('publish.errors.categoryRequired'));
            return;
        }

        setIsSubmitting(true);

        try {
            // 构建提交数据
            const submitData = {
                type: formData.type,
                translations: formData.translations,
                readTime: readTime
            };

            let result;

            // 根据是否为编辑模式调用不同的API
            if (isEditMode && editId.trim()) {
                // 更新内容
                result = await updateContent(editId.trim(), submitData);
            } else {
                // 创建新内容
                result = await publishContent(submitData);
            }

            if (result.error) {
                throw new Error(result.error);
            }

            toast.success(isEditMode ? t('publish.success.updated') : t('publish.success.published'));

            // 重置表单
            setFormData({
                type: 'article',
                translations: {
                    'zh-CN': {
                        title: '',
                        author: '',
                        excerpt: '',
                        category: '',
                        content: ''
                    },
                    'en-US': {
                        title: '',
                        author: '',
                        excerpt: '',
                        category: '',
                        content: ''
                    }
                }
            });

            if (isEditMode) {
                setEditId('');
            }

        } catch (error) {
            console.error('发布失败:', error);
            toast.error(t('publish.errors.publishFailed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePublishFromPreview = async () => {
        // 基本验证
        if (!formData.translations['zh-CN'].title || !formData.translations['en-US'].title) {
            toast.error(t('publish.errors.titleRequired'));
            return;
        }

        if (!formData.translations['zh-CN'].content || !formData.translations['en-US'].content) {
            toast.error(t('publish.errors.contentRequired'));
            return;
        }

        if (!formData.translations['zh-CN'].category || !formData.translations['en-US'].category) {
            toast.error(t('publish.errors.categoryRequired'));
            return;
        }

        setIsSubmitting(true);

        try {
            // 构建提交数据
            const submitData = {
                type: formData.type,
                translations: formData.translations,
                readTime: readTime
            };

            let result;

            // 根据是否为编辑模式调用不同的API
            if (isEditMode && editId.trim()) {
                // 更新内容
                result = await updateContent(editId.trim(), submitData);
            } else {
                // 创建新内容
                result = await publishContent(submitData);
            }

            if (result.error) {
                throw new Error(result.error);
            }

            toast.success(isEditMode ? t('publish.success.updated') : t('publish.success.published'));

            // 关闭预览弹框
            setShowPreviewModal(false);

            // 重置表单
            setFormData({
                type: 'article',
                translations: {
                    'zh-CN': {
                        title: '',
                        author: '',
                        excerpt: '',
                        category: '',
                        content: ''
                    },
                    'en-US': {
                        title: '',
                        author: '',
                        excerpt: '',
                        category: '',
                        content: ''
                    }
                }
            });

            if (isEditMode) {
                setEditId('');
            }

        } catch (error) {
            console.error('发布失败:', error);
            toast.error(t('publish.errors.publishFailed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <motion.a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate('#/');
                        }}
                        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
                        whileHover={{ x: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        {t('publish.backToHome')}
                    </motion.a>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        {isEditMode ? t('publish.editPageTitle') : t('publish.pageTitle')}
                    </h1>
                    {(!isEditMode && <p className="mt-2 text-gray-600 dark:text-gray-400 mb-8">
                        {t('publish.description')}
                    </p>)}

                    {/* 编辑模式的ID输入和查询按钮 */}
                    {isEditMode && (
                        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center space-x-4">
                                <label htmlFor="editId" className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                    {t('publish.editId.label')}
                                </label>
                                <input
                                    type="text"
                                    id="editId"
                                    value={editId}
                                    onChange={(e) => {
                                        setEditId(e.target.value);
                                        setContentLoaded(false);
                                    }}
                                    placeholder={t('publish.editId.placeholder')}
                                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                <button
                                    type="button"
                                    onClick={handleSearchContent}
                                    disabled={isSearching}
                                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                >
                                    <Search size={16} className="mr-2" />
                                    {isSearching ? t('publish.searching') : t('publish.search')}
                                </button>
                                {contentLoaded && editId && (
                                    <button
                                        type="button"
                                        onClick={handleDeleteContent}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                    >
                                        <Trash2 size={16} className="mr-2" />
                                        {t('publish.delete')}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* 类型选择 */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {t('publish.type.label')}
                            </label>
                            <div className="mt-1">
                                <select
                                    id="type"
                                    value={formData.type}
                                    onChange={handleTypeChange}
                                    className="w-full px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    style={{
                                        paddingRight: '2.5rem',
                                        appearance: 'none',
                                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                        backgroundPosition: `right 0.75rem center`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em'
                                    }}
                                >
                                    <option value="article">{t('publish.type.article')}</option>
                                    <option value="news">{t('publish.type.news')}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 中英文表单区域 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* 中文区域 */}
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                {t('publish.chineseSection')}
                            </h2>

                            <div className="space-y-6">
                                {/* 标题 */}
                                <div>
                                    <label htmlFor="zh-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.title.label')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="zh-title"
                                            value={formData.translations['zh-CN'].title}
                                            onChange={(e) => handleFieldChange('zh-CN', 'title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={t('publish.title.placeholder.zh')}
                                        />
                                    </div>
                                </div>

                                {/* 作者 */}
                                <div>
                                    <label htmlFor="zh-author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.author.label')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="zh-author"
                                            value={formData.translations['zh-CN'].author}
                                            onChange={(e) => handleFieldChange('zh-CN', 'author', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={t('publish.author.placeholder.zh')}
                                        />
                                    </div>
                                </div>

                                {/* 摘要 */}
                                <div>
                                    <label htmlFor="zh-excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.excerpt.label')}
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="zh-excerpt"
                                            rows={3}
                                            value={formData.translations['zh-CN'].excerpt}
                                            onChange={(e) => handleFieldChange('zh-CN', 'excerpt', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={t('publish.excerpt.placeholder.zh')}
                                        />
                                    </div>
                                </div>

                                {/* 类别 */}
                                <div>
                                    <label htmlFor="zh-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.category.label')}
                                    </label>
                                    <div className="mt-1">
                                        {formData.type === 'news' ? (
                                            <select
                                                id="zh-category"
                                                value={formData.translations['zh-CN'].category}
                                                onChange={(e) => handleFieldChange('zh-CN', 'category', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                style={{
                                                    paddingRight: '2.5rem',
                                                    appearance: 'none',
                                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                    backgroundPosition: `right 0.75rem center`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '1.5em 1.5em'
                                                }}
                                            >
                                                <option value="">{t('publish.category.selectPlaceholder')}</option>
                                                {newsCategories.map(category => (
                                                    <option key={category.label} value={category.label}>
                                                        {category.label}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                id="zh-category"
                                                value={formData.translations['zh-CN'].category}
                                                onChange={(e) => handleFieldChange('zh-CN', 'category', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder={t('publish.category.placeholder.zh')}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* 正文 */}
                                <div>
                                    <label htmlFor="zh-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.content.label')}
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="zh-content"
                                            rows={12}
                                            value={formData.translations['zh-CN'].content}
                                            onChange={(e) => handleFieldChange('zh-CN', 'content', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={t('publish.content.placeholder.zh')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 英文区域 */}
                        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                {t('publish.englishSection')}
                            </h2>

                            <div className="space-y-6">
                                {/* 标题 */}
                                <div>
                                    <label htmlFor="en-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.title.label')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="en-title"
                                            value={formData.translations['en-US'].title}
                                            onChange={(e) => handleFieldChange('en-US', 'title', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={t('publish.title.placeholder.en')}
                                        />
                                    </div>
                                </div>

                                {/* 作者 */}
                                <div>
                                    <label htmlFor="en-author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.author.label')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="en-author"
                                            value={formData.translations['en-US'].author}
                                            onChange={(e) => handleFieldChange('en-US', 'author', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={t('publish.author.placeholder.en')}
                                        />
                                    </div>
                                </div>

                                {/* 摘要 */}
                                <div>
                                    <label htmlFor="en-excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.excerpt.label')}
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="en-excerpt"
                                            rows={3}
                                            value={formData.translations['en-US'].excerpt}
                                            onChange={(e) => handleFieldChange('en-US', 'excerpt', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={t('publish.excerpt.placeholder.en')}
                                        />
                                    </div>
                                </div>

                                {/* 类别 */}
                                <div>
                                    <label htmlFor="en-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.category.label')}
                                    </label>
                                    <div className="mt-1">
                                        {formData.type === 'news' ? (
                                            <select
                                                id="en-category"
                                                value={formData.translations['en-US'].category}
                                                onChange={(e) => handleFieldChange('en-US', 'category', e.target.value)}
                                                className="w-full px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                                style={{
                                                    paddingRight: '2.5rem',
                                                    appearance: 'none',
                                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                    backgroundPosition: `right 0.75rem center`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundSize: '1.5em 1.5em'
                                                }}
                                            >
                                                <option value="">{t('publish.category.selectPlaceholder')}</option>
                                                {newsCategories.map(category => (
                                                    <option key={category.value} value={category.value}>
                                                        {category.value}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type="text"
                                                id="en-category"
                                                value={formData.translations['en-US'].category}
                                                onChange={(e) => handleFieldChange('en-US', 'category', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                                placeholder={t('publish.category.placeholder.en')}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* 正文 */}
                                <div>
                                    <label htmlFor="en-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {t('publish.content.label')}
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="en-content"
                                            rows={12}
                                            value={formData.translations['en-US'].content}
                                            onChange={(e) => handleFieldChange('en-US', 'content', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                                            placeholder={t('publish.content.placeholder.en')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 阅读时长和操作按钮 */}
                    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <Clock className="h-5 w-5 mr-2" />
                                <span>
                                    {t('publish.readTime')}: {readTime} {t('publish.seconds')}
                                </span>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPreviewModal(true)}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                                >
                                    <Eye className="h-4 w-4 mr-2" />
                                    {t('publish.preview')}
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 cursor-pointer"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    {isSubmitting
                                        ? (isEditMode ? t('publish.updating') : t('publish.publishing'))
                                        : (isEditMode ? t('publish.update') : t('publish.publish'))
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {/* 预览模态框 */}
                {showPreviewModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 shadow-lg rounded-md bg-white dark:bg-gray-800">
                            <div className="mt-3">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        {t('publish.previewModal.title')}
                                    </h3>
                                    <button
                                        onClick={() => setShowPreviewModal(false)}
                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                                    >
                                        <X className="h-6 w-6" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {/* 类型 */}
                                    <div>
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {t('publish.type.label')}:
                                        </span>
                                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                            {formData.type === 'news' ? t('publish.type.news') : t('publish.type.article')}
                                        </span>
                                    </div>

                                    {/* 中英文内容预览 - 左右布局 */}
                                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                        {/* 标题行 */}
                                        <div className="grid grid-cols-2 bg-gray-50 dark:bg-gray-700">
                                            <div className="px-4 py-2 border-r border-gray-200 dark:border-gray-600">
                                                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                                                    {t('publish.chineseSection')}
                                                </h4>
                                            </div>
                                            <div className="px-4 py-2">
                                                <h4 className="text-md font-medium text-gray-900 dark:text-white">
                                                    {t('publish.englishSection')}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* 标题行 */}
                                        <div className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-600">
                                            <div className="px-4 py-3 border-r border-gray-200 dark:border-gray-600">
                                                <div className="flex items-start">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">
                                                        {t('publish.title.label')}:
                                                    </span>
                                                    <p className="text-sm text-gray-900 dark:text-white ml-2 flex-1">
                                                        {formData.translations['zh-CN'].title || t('publish.noContent')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3">
                                                <div className="flex items-start">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">
                                                        {t('publish.title.label')}:
                                                    </span>
                                                    <p className="text-sm text-gray-900 dark:text-white ml-2 flex-1">
                                                        {formData.translations['en-US'].title || t('publish.noContent')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 作者行 */}
                                        <div className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-600">
                                            <div className="px-4 py-3 border-r border-gray-200 dark:border-gray-600">
                                                <div className="flex items-start">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">
                                                        {t('publish.author.label')}:
                                                    </span>
                                                    <p className="text-sm text-gray-900 dark:text-white ml-2 flex-1">
                                                        {formData.translations['zh-CN'].author || t('publish.noContent')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3">
                                                <div className="flex items-start">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">
                                                        {t('publish.author.label')}:
                                                    </span>
                                                    <p className="text-sm text-gray-900 dark:text-white ml-2 flex-1">
                                                        {formData.translations['en-US'].author || t('publish.noContent')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 摘要行 */}
                                        <div className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-600">
                                            <div className="px-4 py-3 border-r border-gray-200 dark:border-gray-600">
                                                <div className="flex items-start">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">
                                                        {t('publish.excerpt.label')}:
                                                    </span>
                                                    <p className="text-sm text-gray-900 dark:text-white ml-2 flex-1">
                                                        {formData.translations['zh-CN'].excerpt || t('publish.noContent')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3">
                                                <div className="flex items-start">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">
                                                        {t('publish.excerpt.label')}:
                                                    </span>
                                                    <p className="text-sm text-gray-900 dark:text-white ml-2 flex-1">
                                                        {formData.translations['en-US'].excerpt || t('publish.noContent')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 类别行 */}
                                        <div className="grid grid-cols-2 border-b border-gray-200 dark:border-gray-600">
                                            <div className="px-4 py-3 border-r border-gray-200 dark:border-gray-600">
                                                <div className="flex items-start">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">
                                                        {t('publish.category.label')}:
                                                    </span>
                                                    <p className="text-sm text-gray-900 dark:text-white ml-2 flex-1">
                                                        {formData.translations['zh-CN'].category || t('publish.noContent')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3">
                                                <div className="flex items-start">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0">
                                                        {t('publish.category.label')}:
                                                    </span>
                                                    <p className="text-sm text-gray-900 dark:text-white ml-2 flex-1">
                                                        {formData.translations['en-US'].category || t('publish.noContent')}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 正文行 */}
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-3 border-r border-gray-200 dark:border-gray-600">
                                                <div className="flex flex-col h-full">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0 mb-1">
                                                        {t('publish.content.label')}:
                                                    </span>
                                                    <div className="text-sm text-gray-900 dark:text-white ml-2 flex-1 prose prose-sm dark:prose-invert max-h-40 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded">
                                                        {formData.translations['zh-CN'].content
                                                            ? processContent(formData.translations['zh-CN'].content)
                                                            : <div>{t('publish.noContent')}</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-3">
                                                <div className="flex flex-col h-full">
                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0 mb-1">
                                                        {t('publish.content.label')}:
                                                    </span>
                                                    <div className="text-sm text-gray-900 dark:text-white ml-2 flex-1 prose prose-sm dark:prose-invert max-h-40 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded">
                                                        {formData.translations['en-US'].content
                                                            ? processContent(formData.translations['en-US'].content)
                                                            : <div>{t('publish.noContent')}</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 阅读时长 */}
                                    <div>
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                            {t('publish.readTime')}:
                                        </span>
                                        <span className="ml-2 text-sm text-gray-900 dark:text-white">
                                            {readTime} {t('publish.seconds')}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        onClick={() => setShowPreviewModal(false)}
                                        className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                                    >
                                        {t('publish.previewModal.backToEdit')}
                                    </button>
                                    <button
                                        onClick={handlePublishFromPreview}
                                        disabled={isSubmitting}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting
                                            ? (isEditMode ? t('publish.updating') : t('publish.publishing'))
                                            : (isEditMode ? t('publish.update') : t('publish.previewModal.publishNow'))
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsArticlePublish;