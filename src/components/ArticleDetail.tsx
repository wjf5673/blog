import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calendar, Clock, User, Heart, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getArticles, likeContent } from "../utils/apiService";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  formattedDate: string;
  readTime: string;
  likes: number;
  imageUrl: string;
  tags: string[];
}

export function ArticleDetail() {
  const { t, i18n } = useTranslation();
  const [currentArticle, setCurrentArticle] = useState<ArticleItem | null>(null);
  const [prevArticle, setPrevArticle] = useState<ArticleItem | null>(null);
  const [nextArticle, setNextArticle] = useState<ArticleItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);

  // 从URL获取ID参数
  const getArticleIdFromUrl = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]);
    return params.get('id');
  };

  // 获取文章数据
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setIsLoading(true);
        const articleId = getArticleIdFromUrl();
        
        if (!articleId) {
          setError(t('articleDetail.errors.missingId'));
          setIsLoading(false);
          return;
        }

        const { data, error } = await getArticles();
        
        if (error) {
          setError(t('articleDetail.errors.fetchFailed'));
          setIsLoading(false);
          return;
        }

        if (!data || data.length === 0) {
          setError(t('articleDetail.errors.noData'));
          setIsLoading(false);
          return;
        }

        // 找到当前文章
        const currentIndex = data.findIndex(article => article.id === articleId);
        
        if (currentIndex === -1) {
          setError(t('articleDetail.errors.notFound', { id: articleId }));
          setIsLoading(false);
          return;
        }

        // 设置当前文章和相邻文章
        setCurrentArticle(data[currentIndex]);
        setPrevArticle(currentIndex > 0 ? data[currentIndex - 1] : null);
        setNextArticle(currentIndex < data.length - 1 ? data[currentIndex + 1] : null);
        setError(null);
      } catch (err) {
        setError(t('articleDetail.errors.fetchError'));
        console.error('Error fetching article data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticleData();
    
    // 监听hash变化
    const handleHashChange = () => {
      fetchArticleData();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [i18n.language]);

  // 处理点赞功能
  const handleLike = async () => {
    if (!currentArticle) return;
    
    try {
      const { error } = await likeContent(currentArticle.id);
      
      if (error) {
        toast.error(t('articleDetail.toast.likeFailed'));
        return;
      }

      // 显示飘心动画
      setShowFloatingHeart(true);
      setTimeout(() => setShowFloatingHeart(false), 1500);
      
      // 更新当前文章的点赞数
      setCurrentArticle({
        ...currentArticle,
        likes: (currentArticle.likes || 0) + 1
      });
      
      toast.success(t('articleDetail.toast.likeSuccess'));
    } catch (err) {
      console.error('Error liking article:', err);
      toast.error(t('articleDetail.toast.likeFailed'));
    }
  };

  // 处理分享功能
  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        toast.success(t('articleDetail.toast.shareSuccess'));
      })
      .catch(() => {
        toast.error(t('articleDetail.toast.shareFailed'));
      });
  };

  // 处理导航到其他文章
  const navigateToArticle = (articleId: string) => {
    window.location.hash = `article-detail?id=${articleId}`;
  };

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
          PreTag="pre"
          className="rounded-lg my-4"
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

  // 404页面
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{error}</p>
          <motion.a
              href="#articles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t('articleDetail.backToArticles')}
            </motion.a>
        </div>
      </div>
    );
  }

  // 加载状态
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('articleDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (!currentArticle) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.a
          href="#article-list"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('articleDetail.backButton')}
        </motion.a>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden relative"
        >
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={currentArticle.imageUrl}
              alt={currentArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-4 py-1 bg-indigo-600 text-white rounded-full mb-4"
              >
                {currentArticle.category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl text-white mb-4"
              >
                {currentArticle.title}
              </motion.h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{currentArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{currentArticle.formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{currentArticle.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors relative cursor-pointer"
                >
                  <Heart className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{currentArticle.likes || 0}</span>
                  
                  {/* Floating Heart Animation */}
                  <AnimatePresence>
                    {showFloatingHeart && (
                      <motion.div
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: -50, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 pointer-events-none"
                      >
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <Share2 className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {currentArticle.excerpt}
            </p>
            {processContent(currentArticle.content)}
          </div>

          {/* Article Navigation */}
          <div className="p-8 bg-gray-50 dark:bg-gray-900">
            <h3 className="text-2xl mb-6 text-gray-900 dark:text-white">{t('articleDetail.navigation.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Previous Article */}
              {prevArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigateToArticle(prevArticle.id)}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center mb-3">
                    <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                      {t('articleDetail.navigation.previous')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {prevArticle.category}
                  </p>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {prevArticle.title}
                  </h4>
                </motion.div>
              )}

              {/* Next Article */}
              {nextArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigateToArticle(nextArticle.id)}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                      {t('articleDetail.navigation.next')}
                    </span>
                    <svg className="w-5 h-5 ml-2 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {nextArticle.category}
                  </p>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {nextArticle.title}
                  </h4>
                </motion.div>
              )}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
