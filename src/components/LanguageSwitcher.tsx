import React from 'react';
import { useTranslation } from 'react-i18next';

// 语言切换组件
const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  // 切换语言的函数
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  // 获取当前语言
  const currentLanguage = i18n.language;

  return (
    <div className="language-switcher">
      <button
        className={`language-btn ${currentLanguage === 'zh-CN' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('zh-CN')}
        aria-label={t('language.chinese')}
        title={t('language.chinese')}
      >
        中
      </button>
      <span className="language-divider">|</span>
      <button
        className={`language-btn ${currentLanguage === 'en-US' ? 'active' : ''}`}
        onClick={() => handleLanguageChange('en-US')}
        aria-label={t('language.english')}
        title={t('language.english')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;