import { motion } from "motion/react";
import { Search, Filter, Clock, Heart, ArrowLeft, ChevronDown, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { getArticles, getArticleCategories } from "../utils/apiService";
import { getRandomArticleImage } from "../utils/articleImageUtils";
import { toast } from "sonner";
import { ArticleSkeleton } from "./ArticleSkeleton";
import { SearchFilterSkeleton } from "./SearchFilterSkeleton";

export function ArticleList() {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  // API数据状态
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 重置分页当搜索或筛选改变时
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
  }, [searchQuery, selectedCategory]);

  // 获取文章和分类数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsInitialLoading(true);
        setError(null);
        
        // 获取文章数据
        const articlesResponse = await getArticles();
        if (articlesResponse.error) {
          setError(articlesResponse.error);
          toast.error(articlesResponse.error);
        } else if (articlesResponse.data) {
          // 为每篇文章添加随机图片
          const articlesWithImages = articlesResponse.data.map(article => ({
            ...article,
            image: getRandomArticleImage()
          }));
          setArticles(articlesWithImages);
          
          // 初始化分页状态
          const totalPages = Math.ceil(articlesWithImages.length / ITEMS_PER_PAGE);
          setHasMore(totalPages > 1);
        }
        
        // 获取分类数据
        const categoriesResponse = await getArticleCategories();
        if (categoriesResponse.error) {
          console.error('Failed to fetch categories:', categoriesResponse.error);
        } else if (categoriesResponse.data) {
          setCategories(["all", ...categoriesResponse.data]);
        }
      } catch (err) {
        const errorMessage = 'Failed to fetch data';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Error fetching data:', err);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  // 处理语言变化时重新获取数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取文章数据
        const articlesResponse = await getArticles();
        if (articlesResponse.data) {
          // 为每篇文章添加随机图片
          const articlesWithImages = articlesResponse.data.map(article => ({
            ...article,
            image: getRandomArticleImage()
          }));
          setArticles(articlesWithImages);
          
          // 更新分页状态
          const totalPages = Math.ceil(articlesWithImages.length / ITEMS_PER_PAGE);
          setHasMore(totalPages > 1);
        }
        
        // 获取分类数据
        const categoriesResponse = await getArticleCategories();
        if (categoriesResponse.data) {
          setCategories(["all", ...categoriesResponse.data]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [i18n.language]);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 计算是否有更多数据
  useEffect(() => {
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    setHasMore(currentPage < totalPages);
  }, [currentPage, filteredArticles.length]);

  // 滚动加载更多
  const loadMoreArticles = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // 模拟异步加载
    setTimeout(() => {
      setCurrentPage(prev => {
        const newPage = prev + 1;
        // 计算新页面后是否还有更多数据
        const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
        setHasMore(newPage < totalPages);
        return newPage;
      });
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore, filteredArticles.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    // 只有在不是初始加载且有更多数据时才设置观察器
    if (isInitialLoading || !hasMore) {
      return;
    }
    
    // 延迟执行，确保 DOM 已经渲染
    const timer = setTimeout(() => {
      if (!loadMoreRef.current) {
        return;
      }
      
      const observer = new IntersectionObserver(
        (entries) => {
          const target = entries[0];
          if (target.isIntersecting && hasMore && !isLoading) {
            loadMoreArticles();
          }
        },
        {
          threshold: 0.1,
          rootMargin: '100px',
        }
      );

      observer.observe(loadMoreRef.current);

      return () => {
        if (loadMoreRef.current) {
          observer.unobserve(loadMoreRef.current);
        }
      };
    }, 500);
    
    return () => {
      clearTimeout(timer);
    };
  }, [loadMoreArticles, hasMore, isLoading, isInitialLoading]);

  // 获取当前页显示的文章
  const displayedArticles = filteredArticles.slice(0, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.a
          href="#tech"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          {t('articleList.backButton')}
        </motion.a>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4 text-gray-900 dark:text-white">{t('articleList.title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('articleList.subtitle')}
          </p>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg p-4 mb-8"
          >
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {isInitialLoading ? (
          <>
            <SearchFilterSkeleton />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <ArticleSkeleton key={index} />
              ))}
            </div>
            {/* 初始加载时也渲染 loadMoreRef，但隐藏 */}
            <div 
              ref={loadMoreRef} 
              className="flex justify-center py-8"
              style={{ visibility: 'hidden', height: 0 }}
            />
          </>
        ) : (
          <>
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-12"
            >
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('articleList.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2 relative">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <div className="relative" ref={selectRef}>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setIsSelectOpen(false);
                      }}
                      onMouseDown={() => setIsSelectOpen(!isSelectOpen)}
                      className="pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="all">{t('articleList.allCategories')}</option>
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <motion.div
                      animate={{ rotate: isSelectOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-gray-600 dark:text-gray-400">
                {t('articleList.resultsCount', { 
                  displayed: displayedArticles.length, 
                  total: filteredArticles.length 
                })}
              </div>
            </motion.div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedArticles.map((article) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <span>{article.formattedDate}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-gray-900 dark:text-white line-clamp-2 leading-6">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{article.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <motion.a
                        href={`#article-detail?id=${article.id}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                      >
                        {t('articleList.readMore')} →
                      </motion.a>

                      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <Heart className="w-4 h-4" />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* 加载更多触发器 */}
            <div 
              ref={loadMoreRef} 
              className="flex justify-center py-8"
            >
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{t('articleList.loading')}</span>
                </motion.div>
              )}
              {!isLoading && hasMore && (
                <div className="h-8 w-full flex items-center justify-center">
                  <span className="text-xs text-gray-400">Scroll for more</span>
                </div>
              )}
            </div>

            {/* 没有更多数据提示 */}
            {!hasMore && displayedArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-500 dark:text-gray-400"
              >
                <p>{t('articleList.allArticlesLoaded')}</p>
              </motion.div>
            )}

            {displayedArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-xl text-gray-400 dark:text-gray-500">{t('articleList.noArticlesFound')}</p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}