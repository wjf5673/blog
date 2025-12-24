import { motion } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { Cpu, Blocks, Code, TrendingUp, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface NewsItem {
  id: number;
  category: "frontend" | "web3" | "ai";
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

export default function NewsSection() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 使用 useMemo 来确保新闻数据在语言变化时重新计算
  const newsItems: NewsItem[] = useMemo(() => [
    {
      id: 1,
      category: "frontend",
      title: t('newsSection.newsItems.react19.title'),
      description: t('newsSection.newsItems.react19.description'),
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjYzNTM1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-20",
      link: "#news-detail",
    },
    {
      id: 2,
      category: "ai",
      title: t('newsSection.newsItems.gpt5.title'),
      description: t('newsSection.newsItems.gpt5.description'),
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NjI4OTUwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-19",
      link: "#news-detail",
    },
    {
      id: 3,
      category: "web3",
      title: t('newsSection.newsItems.ethereum.title'),
      description: t('newsSection.newsItems.ethereum.description'),
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvfGVufDF8fHx8MTc2NjM4MzgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-18",
      link: "#news-detail",
    },
    {
      id: 4,
      category: "frontend",
      title: t('newsSection.newsItems.tailwind.title'),
      description: t('newsSection.newsItems.tailwind.description'),
      image: "https://images.unsplash.com/photo-1595623654300-b27329804025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nfGVufDF8fHx8MTc2NjM0NzI2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-17",
      link: "#news-detail",
    },
    {
      id: 5,
      category: "ai",
      title: t('newsSection.newsItems.github.title'),
      description: t('newsSection.newsItems.github.description'),
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NjI4OTUwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-16",
      link: "#news-detail",
    },
    {
      id: 6,
      category: "web3",
      title: t('newsSection.newsItems.ethereum.title'),
      description: t('newsSection.newsItems.ethereum.description'),
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvfGVufDF8fHx8MTc2NjM4MzgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-15",
      link: "#news-detail",
    },
    {
      id: 7,
      category: "frontend",
      title: t('newsSection.newsItems.vite.title'),
      description: t('newsSection.newsItems.vite.description'),
      image: "https://images.unsplash.com/photo-1595623654300-b27329804025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nfGVufDF8fHx8MTc2NjM0NzI2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-14",
      link: "#news-detail",
    },
    {
      id: 8,
      category: "ai",
      title: t('newsSection.newsItems.gpt5.title'),
      description: t('newsSection.newsItems.gpt5.description'),
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NjI4OTUwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-13",
      link: "#news-detail",
    },
    {
      id: 9,
      category: "web3",
      title: t('newsSection.newsItems.ethereum.title'),
      description: t('newsSection.newsItems.ethereum.description'),
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvfGVufDF8fHx8MTc2NjM4MzgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-12",
      link: "#news-detail",
    },
    {
      id: 10,
      category: "frontend",
      title: t('newsSection.newsItems.nextjs.title'),
      description: t('newsSection.newsItems.nextjs.description'),
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjYzNTM1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-11",
      link: "#news-detail",
    },
    {
      id: 11,
      category: "ai",
      title: t('newsSection.newsItems.apple.title'),
      description: t('newsSection.newsItems.apple.description'),
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NjI4OTUwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-10",
      link: "#news-detail",
    },
    {
      id: 12,
      category: "web3",
      title: t('newsSection.newsItems.chromium.title'),
      description: t('newsSection.newsItems.chromium.description'),
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvfGVufDF8fHx8MTc2NjM4MzgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-09",
      link: "#news-detail",
    },
  ], [t]);

  const categoryConfig = {
    frontend: { icon: Code, color: "text-blue-600", darkColor: "dark:text-blue-400", bg: "bg-blue-50", darkBg: "dark:bg-blue-900/30" },
    web3: { icon: Blocks, color: "text-purple-600", darkColor: "dark:text-purple-400", bg: "bg-purple-50", darkBg: "dark:bg-purple-900/30" },
    ai: { icon: Cpu, color: "text-pink-600", darkColor: "dark:text-pink-400", bg: "bg-pink-50", darkBg: "dark:bg-pink-900/30" },
  };

  // 使用 useMemo 优化筛选逻辑
  const filteredNews = useMemo(() => {
    return selectedCategory
      ? newsItems.filter((item) => item.category === selectedCategory)
      : newsItems;
  }, [selectedCategory, newsItems]);

  // 计算分页数据
  const { paginatedNews, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);
    
    return { paginatedNews, totalPages };
  }, [filteredNews, currentPage, itemsPerPage]);

  // 当分类改变时重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 页面切换处理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到新闻区域顶部
    const newsSection = document.getElementById('news');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="news" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.03 }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-4xl text-gray-900 dark:text-white">{t('newsSection.title')}</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('newsSection.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 justify-center mb-12 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === null
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {t('newsSection.all')}
          </motion.button>
          {Object.entries(categoryConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                  selectedCategory === key
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t(`newsSection.categories.${key}`)}
              </motion.button>
            );
          })}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedNews.map((item, index) => {
            const config = categoryConfig[item.category];
            const Icon = config.icon;
            
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
              >
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full ${config.bg} ${config.darkBg} flex items-center gap-1`}>
                    <Icon className={`w-4 h-4 ${config.color} ${config.darkColor}`} />
                    <span className={`text-sm ${config.color} ${config.darkColor}`}>
                      {t(`newsSection.categories.${item.category}`)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.date}</div>
                  <h3 className="text-xl mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 leading-6">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 leading-6">{item.description}</p>
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all"
                  >
                    {t('newsSection.readMore')} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* 分页控件 */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 1
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              {t('newsSection.pagination.previous')}
            </motion.button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {t('newsSection.pagination.next')}
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* 显示统计信息 */}
        {filteredNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-gray-600"
          >
            <p>
              {t('newsSection.pagination.stats', { 
                total: filteredNews.length, 
                current: currentPage, 
                totalPages: totalPages 
              })}
            </p>
          </motion.div>
        )}

        {/* 无数据提示 */}
        {filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">{t('newsSection.noNews')}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}