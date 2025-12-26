import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calendar, Clock, User, Heart, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getNews, likeContent } from "../utils/apiService";
import { toast } from "sonner";

interface NewsItem {
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

export function NewsDetail() {
  const { t, i18n } = useTranslation();
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [prevNews, setPrevNews] = useState<NewsItem | null>(null);
  const [nextNews, setNextNews] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFloatingHeart, setShowFloatingHeart] = useState(false);

  // 从URL获取ID参数
  const getNewsIdFromUrl = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]);
    return params.get('id');
  };

  // 获取新闻数据
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setIsLoading(true);
        const newsId = getNewsIdFromUrl();
        
        if (!newsId) {
          setError(t('newsDetail.errors.missingId'));
          setIsLoading(false);
          return;
        }

        const { data, error } = await getNews();
        
        if (error) {
          setError(t('newsDetail.errors.fetchFailed'));
          setIsLoading(false);
          return;
        }

        if (!data || data.length === 0) {
          setError(t('newsDetail.errors.noData'));
          setIsLoading(false);
          return;
        }

        console.log('Fetched news data:', data);

        // 找到当前新闻
        const currentIndex = data.findIndex(news => news.id === newsId);
        
        if (currentIndex === -1) {
          setError(t('newsDetail.errors.notFound', { id: newsId }));
          setIsLoading(false);
          return;
        }

        // 设置当前新闻和相邻新闻
        setCurrentNews(data[currentIndex]);
        setPrevNews(currentIndex > 0 ? data[currentIndex - 1] : null);
        setNextNews(currentIndex < data.length - 1 ? data[currentIndex + 1] : null);
        setError(null);
      } catch (err) {
        setError(t('newsDetail.errors.fetchError'));
        console.error('Error fetching news data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, [i18n.language]);

  // 处理点赞功能
  const handleLike = async () => {
    if (!currentNews) return;
    
    try {
      const { error } = await likeContent(currentNews.id);
      
      if (error) {
        toast.error(t('newsDetail.toast.likeFailed'));
        return;
      }

      // 显示飘心动画
      setShowFloatingHeart(true);
      setTimeout(() => setShowFloatingHeart(false), 1500);
      
      // 更新当前新闻的点赞数
      if (currentNews) {
        setCurrentNews({
          ...currentNews,
          likes: (currentNews.likes || 0) + 1
        });
      }
      
      toast.success(t('newsDetail.toast.likeSuccess'));
    } catch (err) {
      console.error('Error liking news:', err);
      toast.error(t('newsDetail.toast.likeFailed'));
    }
  };

  // 处理分享功能
  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        toast.success(t('newsDetail.toast.shareSuccess'));
      })
      .catch(() => {
        toast.error(t('newsDetail.toast.shareFailed'));
      });
  };

  // 处理导航到其他新闻
  const navigateToNews = (newsId: string) => {
    window.location.hash = `news-detail?id=${newsId}`;
  };

  // 404页面
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">{error}</p>
          <motion.a
              href="#news"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t('newsDetail.backToNews')}
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
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('newsDetail.loading')}</p>
        </div>
      </div>
    );
  }

  if (!currentNews) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.a
          href="#news"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('newsDetail.backToNews')}
        </motion.a>

        {/* News Article */}
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
              src={currentNews.imageUrl}
              alt={currentNews.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full mb-4"
              >
                {currentNews.category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl text-white mb-4"
              >
                {currentNews.title}
              </motion.h1>
            </div>
          </div>

          {/* Meta Info */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{currentNews.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{currentNews.formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{currentNews.readTime}</span>
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
                  <span className="text-sm text-gray-600 dark:text-gray-400">{currentNews.likes || 0}</span>
                  
                  {/* 飘心动画 */}
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

          {/* Content */}
          <div className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentNews.excerpt}
            </p>
            <div dangerouslySetInnerHTML={{ __html: currentNews.content }} />
          </div>

          {/* Related News */}
          <div className="p-8 bg-gray-50 dark:bg-gray-900">
            <h3 className="text-2xl mb-6 text-gray-900 dark:text-white">{t('newsDetail.navigation.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Previous News */}
              {prevNews && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigateToNews(prevNews.id)}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center mb-3">
                    <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                       {t('newsDetail.navigation.previous')}
                     </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {prevNews.category}
                  </p>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {prevNews.title}
                  </h4>
                </motion.div>
              )}

              {/* Next News */}
              {nextNews && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigateToNews(nextNews.id)}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                       {t('newsDetail.navigation.next')}
                     </span>
                    <svg className="w-5 h-5 ml-2 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {nextNews.category}
                  </p>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {nextNews.title}
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
