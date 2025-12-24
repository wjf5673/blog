import { motion } from "motion/react";
import { Menu, X, Code2, Sparkles, Sun, Moon, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { name: t("header.home"), href: "#home" },
    { name: t("header.news"), href: "#news" },
    { name: t("header.tech"), href: "#tech" },
    { name: t("header.funZone"), href: "#fun-zone" },
    { name: t("header.messages"), href: "#messages" },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Code2 className="w-8 h-8 text-indigo-600" />
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </motion.div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tech Blog
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 items-center">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, color: "#4f46e5" }}
                className="text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
            
            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative group"
            >
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.button>
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                {theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')}
              </motion.div>
            </motion.div>

            {/* Language Toggle */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="relative group"
            >
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </motion.button>
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              >
                {t('language.switchTo')} {i18n.language === 'zh-CN' ? 'English' : '中文'}
              </motion.div>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pb-4"
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            
            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                {theme === 'light' ? (
                    <Sun className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  )}
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {t('theme.currentTheme')}: {theme === 'light' ? t('theme.light') : t('theme.dark')}
                </span>
              </div>
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                {theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')}
              </motion.button>
            </div>
            
            {/* Mobile Language Toggle */}
            <div className="flex items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-200">
                  {t('language.currentLang')}: {i18n.language === 'zh-CN' ? '中文' : 'English'}
                </span>
              </div>
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                {t('language.switchTo')} {i18n.language === 'zh-CN' ? 'English' : '中文'}
              </motion.button>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
}