import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 导入语言资源
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

// 语言资源配置
const resources = {
  'zh-CN': {
    translation: zhCN
  },
  'en-US': {
    translation: enUS
  }
};

i18n
  // 检测用户当前使用的语言
  // 文档: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // 传递 i18n 实例给 react-i18next
  .use(initReactI18next)
  // 初始化 i18next
  // 配置选项: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'zh-CN', // 默认语言为中文
    debug: false, // 开发环境可以设为true查看调试信息

    interpolation: {
      escapeValue: false, // React 已经默认转义了
    },

    detection: {
      // 语言检测的优先级顺序
      order: ['localStorage', 'navigator', 'htmlTag'],
      // 缓存用户语言选择
      caches: ['localStorage'],
      // localStorage中存储语言的key
      lookupLocalStorage: 'i18nextLng',
    }
  });

export default i18n;