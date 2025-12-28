import { motion } from "motion/react";
import { BookOpen, GitBranch, Lightbulb, Rocket, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getArticles } from "../utils/apiService";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  likes: number;
  gradient: string;
  icon: typeof BookOpen;
}

export function TechSection() {
  const { t, i18n } = useTranslation();

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // 可用的渐变色和图标
  const gradients = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500"
  ];

  const icons = [GitBranch, Rocket, Lightbulb, BookOpen];

  // 获取文章数据
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const result = await getArticles();
        
        if (result.error) {
          console.error('Failed to fetch articles:', result.error);
          return;
        }
        
        if (result.data && result.data.length > 0) {
          // 为每篇文章随机分配渐变色和图标
          const processedArticles = result.data.map((article: any, index: number) => {
            // 使用索引确保每次渲染时保持相同的随机值
            const gradientIndex = index % gradients.length;
            const iconIndex = index % icons.length;
            
            return {
              id: article.id,
              title: article.title,
              excerpt: article.excerpt,
              category: article.category,
              readTime: article.readTime, // 已经在apiService中格式化
              likes: article.likes || 0,
              gradient: gradients[gradientIndex],
              icon: icons[iconIndex],
            };
          });
          
          setArticles(processedArticles);
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [i18n.language]); // 添加语言依赖，当语言变化时重新获取数据



  return (
    <section id="tech" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Parallax Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5"
        style={{ y: 0 }}
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-indigo-300 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 border-4 border-purple-300 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 border-4 border-pink-300 rounded-full" />
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
            <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-4xl text-gray-900 dark:text-white">{t('techSection.title')}</h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('techSection.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {loading ? (
            // 加载状态
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse w-12 h-12" />
                    <div className="flex items-center gap-4">
                      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20 animate-pulse" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1 w-full animate-pulse" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-6 w-5/6 animate-pulse" />
                  <div className="flex items-center justify-between">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-24 animate-pulse" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-16 animate-pulse" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            articles?.slice(0, 4)?.map((article, index) => {
              const Icon = article.icon;
              const displayLikes = article.likes;

              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className={`h-2 bg-gradient-to-r ${article.gradient}`} />
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`p-3 rounded-xl bg-gradient-to-br ${article.gradient}`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300">
                          {article.category}
                        </span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <h3 
                      className="text-2xl mb-3 text-gray-900 dark:text-white overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >{article.title}</h3>
                    <p 
                      className="text-gray-600 dark:text-gray-300 mb-6 overflow-hidden"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >{article.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <motion.a
                        href={`#article-detail?id=${article.id}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                      >
                        {t('techSection.readArticle')}
                      </motion.a>

                      <div className="flex items-center gap-2 px-4 py-2">
                        <Heart className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {displayLikes}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })
          )}
          
          {/* 空状态提示 */}
          {!loading && articles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-full flex flex-col items-center justify-center py-16"
            >
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                <BookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                {t('techSection.noArticles')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                {t('techSection.noArticlesDescription')}
              </p>
            </motion.div>
          )}
        </div>

        {/* 只有文章数量大于4时才显示查看更多按钮 */}
        {!loading && articles.length > 0 && articles.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <motion.a
              href="#article-list"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-400 dark:hover:text-white transition-all"
            >
              {t('techSection.viewMoreArticles')}
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}