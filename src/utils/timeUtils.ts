// 获取当前语言设置
const getCurrentLanguage = (): string => {
  // 这里可以从localStorage、context或其他地方获取当前语言
  return localStorage.getItem('i18nextLng') || 'zh-CN';
};

// 将秒数转换为分钟数，支持国际化
export const formatReadTime = (seconds: number): string => {
  const language = getCurrentLanguage();
  const minutes = Math.ceil(seconds / 60); // 向上取整
  
  // 国际化文本
  const i18nTexts = {
    'zh-CN': {
      minute: '分钟',
      minutes: '分钟',
      readTime: (min: number) => `${min}分钟`
    },
    'en-US': {
      minute: 'minute',
      minutes: 'minutes',
      readTime: (min: number) => `${min} ${min === 1 ? 'minute' : 'minutes'}`
    }
  };
  
  const texts = i18nTexts[language as keyof typeof i18nTexts] || i18nTexts['zh-CN'];
  return texts.readTime(minutes);
};

// 时间格式化函数，支持国际化
export const formatRelativeTime = (dateString: string): string => {
  const language = getCurrentLanguage();
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // 计算天数差
  const diffInDays = Math.floor(diffInSeconds / (24 * 60 * 60));
  
  // 国际化文本
  const i18nTexts = {
    'zh-CN': {
      today: '今天',
      daysAgo: (days: number) => `${days}天前`,
      dateFormat: (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    },
    'en-US': {
      today: 'Today',
      daysAgo: (days: number) => `${days} day${days > 1 ? 's' : ''} ago`,
      dateFormat: (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      }
    }
  };
  
  const texts = i18nTexts[language as keyof typeof i18nTexts] || i18nTexts['zh-CN'];
  
  // 根据时间差返回不同的格式
  if (diffInDays === 0) {
    return texts.today;
  } else if (diffInDays <= 3) {
    return texts.daysAgo(diffInDays);
  } else {
    return texts.dateFormat(date);
  }
};

// 直接格式化日期为 yyyy-MM-dd HH:mm:ss 格式
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};