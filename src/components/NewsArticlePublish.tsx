import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Eye, Clock, X } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { publishContent } from '../utils/apiService';

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

// 处理内容中的代码块
const processContent = (content: string) => {
  if (!content) return '';
  
  // 匹配代码块 ```language\ncode\n``` 
  const codeBlockRegex = /```([\w-]*)\n([\s\S]*?)```/g;
  
  return content.replace(codeBlockRegex, (_, language, code) => {
    const lang = language || 'text';
    return `<div class="code-block-wrapper" data-lang="${lang}" data-code="${encodeURIComponent(code)}"></div>`;
  });
};

const NewsArticlePublish: React.FC = () => {
  const { t } = useTranslation();
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

  // 新闻类别选项
  const newsCategories = [
    { value: 'frontend', label: '前端' },
    { value: 'web3', label: 'Web3' },
    { value: 'ai', label: 'AI' }
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
      
      // 调用发布API
      const { error } = await publishContent(submitData);
      
      if (error) {
        throw new Error(error);
      }
      
      toast.success(t('publish.success.published'));
      
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
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t('publish.backToHome')}
          </motion.a>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('publish.pageTitle')}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {t('publish.description')}
          </p>
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
                          <option key={category.value} value={category.value}>
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
                            {category.value.charAt(0).toUpperCase() + category.value.slice(1)}
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
                  {isSubmitting ? t('publish.publishing') : t('publish.publish')}
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
                            {(() => {
                              const processedContent = processContent(formData.translations['zh-CN'].content);
                              const parts = processedContent.split(/<div class="code-block-wrapper" data-lang="([^"]+)" data-code="([^"]+)"><\/div>/g);
                              
                              return parts.map((part, index) => {
                                if (index % 3 === 1) {
                                  return null; // Skip the matched wrapper div
                                } else if (index % 3 === 2) {
                                  const lang = parts[index - 1];
                                  const code = decodeURIComponent(parts[index]);
                                  return (
                                    <SyntaxHighlighter
                                      key={index}
                                      language={lang}
                                      style={oneDark}
                                      customStyle={{
                                        margin: '8px 0',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                      }}
                                    >
                                      {code}
                                    </SyntaxHighlighter>
                                  );
                                } else {
                                  return part ? <div key={index}>{part}</div> : null;
                                }
                              });
                            })()}
                            {!formData.translations['zh-CN'].content && t('publish.noContent')}
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3">
                        <div className="flex flex-col h-full">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-16 flex-shrink-0 mb-1">
                            {t('publish.content.label')}:
                          </span>
                          <div className="text-sm text-gray-900 dark:text-white ml-2 flex-1 prose prose-sm dark:prose-invert max-h-40 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded">
                            {(() => {
                              const processedContent = processContent(formData.translations['en-US'].content);
                              const parts = processedContent.split(/<div class="code-block-wrapper" data-lang="([^"]+)" data-code="([^"]+)"><\/div>/g);
                              
                              return parts.map((part, index) => {
                                if (index % 3 === 1) {
                                  return null; // Skip the matched wrapper div
                                } else if (index % 3 === 2) {
                                  const lang = parts[index - 1];
                                  const code = decodeURIComponent(parts[index]);
                                  return (
                                    <SyntaxHighlighter
                                      key={index}
                                      language={lang}
                                      style={oneDark}
                                      customStyle={{
                                        margin: '8px 0',
                                        borderRadius: '4px',
                                        fontSize: '12px'
                                      }}
                                    >
                                      {code}
                                    </SyntaxHighlighter>
                                  );
                                } else {
                                  return part ? <div key={index}>{part}</div> : null;
                                }
                              });
                            })()}
                            {!formData.translations['en-US'].content && t('publish.noContent')}
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
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
                  >
                    {t('publish.previewModal.close')}
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