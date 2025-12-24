import { motion } from "motion/react";
import { Search, Filter, Clock, Heart, ArrowLeft, ChevronDown, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  likes: number;
  date: string;
  image: string;
}

export function ArticleList() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
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

  const articles: Article[] = [
    {
      id: 1,
      title: t('articleList.articles.hooks.title'),
      excerpt: t('articleList.articles.hooks.excerpt'),
      category: t('articleList.articles.hooks.category'),
      readTime: t('articleList.articles.hooks.readTime'),
      likes: 234,
      date: "2025-12-20",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400",
    },
    {
      id: 2,
      title: t('articleList.articles.web3.title'),
      excerpt: t('articleList.articles.web3.excerpt'),
      category: t('articleList.articles.web3.category'),
      readTime: t('articleList.articles.web3.readTime'),
      likes: 189,
      date: "2025-12-19",
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?w=400",
    },
    {
      id: 3,
      title: t('articleList.articles.performance.title'),
      excerpt: t('articleList.articles.performance.excerpt'),
      category: t('articleList.articles.performance.category'),
      readTime: t('articleList.articles.performance.readTime'),
      likes: 567,
      date: "2025-12-18",
      image: "https://images.unsplash.com/photo-1595623654300-b27329804025?w=400",
    },
    {
      id: 4,
      title: t('articleList.articles.ai.title'),
      excerpt: t('articleList.articles.ai.excerpt'),
      category: t('articleList.articles.ai.category'),
      readTime: t('articleList.articles.ai.readTime'),
      likes: 423,
      date: "2025-12-17",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=400",
    },
    {
      id: 5,
      title: t('articleList.articles.typescript.title'),
      excerpt: t('articleList.articles.typescript.excerpt'),
      category: t('articleList.articles.typescript.category'),
      readTime: t('articleList.articles.typescript.readTime'),
      likes: 312,
      date: "2025-12-16",
      image: "https://images.unsplash.com/photo-1595623654300-b27329804025?w=400",
    },
    {
      id: 6,
      title: t('articleList.articles.article6.title'),
      excerpt: t('articleList.articles.article6.excerpt'),
      category: t('articleList.articles.article6.category'),
      readTime: t('articleList.articles.article6.readTime'),
      likes: 278,
      date: "2025-12-15",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400",
    },
    {
      id: 7,
      title: t('articleList.articles.article13.title'),
      excerpt: t('articleList.articles.article13.excerpt'),
      category: t('articleList.articles.article13.category'),
      readTime: t('articleList.articles.article13.readTime'),
      likes: 198,
      date: "2025-12-14",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
    },
    {
      id: 8,
      title: t('articleList.articles.article7.title'),
      excerpt: t('articleList.articles.article7.excerpt'),
      category: t('articleList.articles.article7.category'),
      readTime: t('articleList.articles.article7.readTime'),
      likes: 445,
      date: "2025-12-13",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    },
    {
      id: 9,
      title: t('articleList.articles.article8.title'),
      excerpt: t('articleList.articles.article8.excerpt'),
      category: t('articleList.articles.article8.category'),
      readTime: t('articleList.articles.article8.readTime'),
      likes: 321,
      date: "2025-12-12",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
    },
    {
      id: 10,
      title: t('articleList.articles.article9.title'),
      excerpt: t('articleList.articles.article9.excerpt'),
      category: t('articleList.articles.article9.category'),
      readTime: t('articleList.articles.article9.readTime'),
      likes: 512,
      date: "2025-12-11",
      image: "https://images.unsplash.com/photo-1603380404222-149f2b80daca?w=400",
    },
    {
      id: 11,
      title: t('articleList.articles.article11.title'),
      excerpt: t('articleList.articles.article11.excerpt'),
      category: t('articleList.articles.article11.category'),
      readTime: t('articleList.articles.article11.readTime'),
      likes: 289,
      date: "2025-12-10",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    },
    {
      id: 12,
      title: t('articleList.articles.article12.title'),
      excerpt: t('articleList.articles.article12.excerpt'),
      category: t('articleList.articles.article12.category'),
      readTime: t('articleList.articles.article12.readTime'),
      likes: 367,
      date: "2025-12-09",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400",
    },
    {
      id: 13,
      title: t('articleList.articles.article19.title'),
      excerpt: t('articleList.articles.article19.excerpt'),
      category: t('articleList.articles.article19.category'),
      readTime: t('articleList.articles.article19.readTime'),
      likes: 434,
      date: "2025-12-08",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
    },
    {
      id: 14,
      title: t('articleList.articles.article14.title'),
      excerpt: t('articleList.articles.article14.excerpt'),
      category: t('articleList.articles.article14.category'),
      readTime: t('articleList.articles.article14.readTime'),
      likes: 256,
      date: "2025-12-07",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
    },
    {
      id: 15,
      title: t('articleList.articles.article16.title'),
      excerpt: t('articleList.articles.article15.excerpt'),
      category: t('articleList.articles.article15.category'),
      readTime: t('articleList.articles.article15.readTime'),
      likes: 178,
      date: "2025-12-06",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    },
    {
      id: 16,
      title: t('articleList.articles.article17.title'),
      excerpt: t('articleList.articles.article17.excerpt'),
      category: t('articleList.articles.article17.category'),
      readTime: t('articleList.articles.article17.readTime'),
      likes: 203,
      date: "2025-12-05",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
    },
    {
      id: 17,
      title: t('articleList.articles.article20.title'),
      excerpt: t('articleList.articles.article20.excerpt'),
      category: t('articleList.articles.article20.category'),
      readTime: t('articleList.articles.article20.readTime'),
      likes: 389,
      date: "2025-12-04",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    },
    {
      id: 18,
      title: t('articleList.articles.article18.title'),
      excerpt: t('articleList.articles.article18.excerpt'),
      category: t('articleList.articles.article18.category'),
      readTime: t('articleList.articles.article18.readTime'),
      likes: 145,
      date: "2025-12-03",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece453e6d4?w=400",
    },
    {
      id: 19,
      title: t('articleList.articles.article10.title'),
      excerpt: t('articleList.articles.article10.excerpt'),
      category: t('articleList.articles.article10.category'),
      readTime: t('articleList.articles.article10.readTime'),
      likes: 298,
      date: "2025-12-02",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
    },
    {
      id: 20,
      title: t('articleList.articles.article20.title'),
      excerpt: t('articleList.articles.article20.excerpt'),
      category: t('articleList.articles.article20.category'),
      readTime: t('articleList.articles.article20.readTime'),
      likes: 412,
      date: "2025-12-01",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    }
  ];

  const categories = ["all", ...Array.from(new Set(articles.map((a) => a.category)))];

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
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          loadMoreArticles();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreArticles, hasMore, isLoading]);

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
                  <span>{article.date}</span>
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
                    href="#article-detail"
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
        <div ref={loadMoreRef} className="flex justify-center py-8">
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
      </div>
    </div>
  );
}
