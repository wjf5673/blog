import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();
  const words = [t('hero.subtitle.words.frontend'), t('hero.subtitle.words.web3'), t('hero.subtitle.words.ai')];
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400 dark:bg-indigo-600 rounded-full opacity-20 dark:opacity-30"
            animate={{
              y: [0, -1000],
              x: Math.random() * 100 - 50,
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `100%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl mb-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="block mb-2"
            >
              {t('hero.title.line1')}
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent inline-block"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}
            >
              {t('hero.title.line2')}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
          >
            {t('hero.subtitle.prefix')}
            {words.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.6 + index * 0.2,
                  duration: 0.5,
                }}
                className="mx-2 text-indigo-600 dark:text-indigo-400"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <motion.a
              href="#news"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
            >
              {t('hero.buttons.explore')}
            </motion.a>
            <motion.a
              href="#messages"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/30 transition-colors"
            >
              {t('hero.buttons.messages')}
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-gray-400 dark:text-gray-500">{t('hero.scrollIndicator')}</span>
            <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}