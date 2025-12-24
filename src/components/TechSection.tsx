import { motion } from "motion/react";
import { BookOpen, GitBranch, Lightbulb, Rocket, Heart } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [likedArticles, setLikedArticles] = useState<Set<number>>(new Set());

  const articles: Article[] = [
    {
      id: 1,
      title: t('techSection.articles.hooks.title'),
      excerpt: t('techSection.articles.hooks.excerpt'),
      category: t('techSection.articles.hooks.category'),
      readTime: t('techSection.articles.hooks.readTime'),
      likes: 234,
      gradient: "from-blue-500 to-cyan-500",
      icon: GitBranch,
    },
    {
      id: 2,
      title: t('techSection.articles.web3.title'),
      excerpt: t('techSection.articles.web3.excerpt'),
      category: t('techSection.articles.web3.category'),
      readTime: t('techSection.articles.web3.readTime'),
      likes: 189,
      gradient: "from-purple-500 to-pink-500",
      icon: Rocket,
    },
    {
      id: 3,
      title: t('techSection.articles.performance.title'),
      excerpt: t('techSection.articles.performance.excerpt'),
      category: t('techSection.articles.performance.category'),
      readTime: t('techSection.articles.performance.readTime'),
      likes: 567,
      gradient: "from-orange-500 to-red-500",
      icon: Lightbulb,
    },
    {
      id: 4,
      title: t('techSection.articles.ai.title'),
      excerpt: t('techSection.articles.ai.excerpt'),
      category: t('techSection.articles.ai.category'),
      readTime: t('techSection.articles.ai.readTime'),
      likes: 423,
      gradient: "from-green-500 to-emerald-500",
      icon: BookOpen,
    },
  ];

  const toggleLike = (articleId: number) => {
    setLikedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

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
          {articles.map((article, index) => {
            const Icon = article.icon;
            const isLiked = likedArticles.has(article.id);
            const displayLikes = article.likes + (isLiked ? 1 : 0);

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

                  <h3 className="text-2xl mb-3 text-gray-900 dark:text-white">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{article.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <motion.a
                      href="#article-detail"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                    >
                      {t('techSection.readArticle')}
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(article.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <motion.div
                        animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isLiked
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.div>
                      <span className={isLiked ? "text-red-500" : "text-gray-600 dark:text-gray-400"}>
                        {displayLikes}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

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
      </div>
    </section>
  );
}