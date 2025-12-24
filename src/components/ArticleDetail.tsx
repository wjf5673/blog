import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, User, Heart, Share2, Bookmark } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function ArticleDetail() {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.a
          href="#tech"
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjYzNTM1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Article cover"
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
                {t('articleDetail.category')}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl text-white mb-4"
              >
                {t('articleDetail.title')}
              </motion.h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{t('articleDetail.author')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{t('articleDetail.date')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{t('articleDetail.readTime')}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                      }`}
                  />
                  <span className={isLiked ? "text-red-500" : "text-gray-600"}>
                    {isLiked ? "235" : "234"}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Bookmark
                    className={`w-5 h-5 ${isBookmarked ? "fill-indigo-500 text-indigo-500" : "text-gray-400"
                      }`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8 md:p-12 prose prose-lg dark:prose-invert max-w-none">
            <h2>{t('articleDetail.content.hooksNeeded.title')}</h2>
            <p>
              {t('articleDetail.content.hooksNeeded.paragraph1')}
            </p>

            <p>
              {t('articleDetail.content.hooksNeeded.paragraph2')}
            </p>

            <h2>{t('articleDetail.content.useState.title')}</h2>
            <p>
              {t('articleDetail.content.useState.description')}
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
              {t('articleDetail.content.useState.code')}
            </pre>

            <h2>{t('articleDetail.content.useEffect.title')}</h2>
            <p>
              {t('articleDetail.content.useEffect.paragraph1')}
            </p>

            <p>
              {t('articleDetail.content.useEffect.paragraph2')}
            </p>

            <h2>{t('articleDetail.content.customHooks.title')}</h2>
            <p>
              {t('articleDetail.content.customHooks.paragraph1')}
            </p>

            <p>
              {t('articleDetail.content.customHooks.paragraph2')}
            </p>

            <h2>{t('articleDetail.content.conclusion.title')}</h2>
            <p>
              {t('articleDetail.content.conclusion.description')}
            </p>
          </div>

          {/* Article Navigation */}
          <div className="p-8 bg-gray-50 dark:bg-gray-900">
            <h3 className="text-2xl mb-6 text-gray-900 dark:text-white">{t('articleDetail.navigation.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Previous Article */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
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
                  {t('articleDetail.relatedArticles.articles.0.category')}
                </p>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t('articleDetail.relatedArticles.articles.0.title')}
                </h4>
              </motion.div>

              {/* Next Article */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
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
                  {t('articleDetail.relatedArticles.articles.1.category')}
                </p>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t('articleDetail.relatedArticles.articles.1.title')}
                </h4>
              </motion.div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
