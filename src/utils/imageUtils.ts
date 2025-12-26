// 图片匹配工具函数
export const getImageUrl = (category: string, type: 'article' | 'news'): string => {
  // 文章分类图片映射 - 基于项目中现有的图片资源
  const articleImages: Record<string, string[]> = {
    'React': [
      'https://picsum.photos/seed/react1/800/500',
      'https://picsum.photos/seed/react2/800/500',
      'https://picsum.photos/seed/react3/800/500'
    ],
    'Vue': [
      'https://picsum.photos/seed/vue1/800/500',
      'https://picsum.photos/seed/vue2/800/500',
      'https://picsum.photos/seed/vue3/800/500'
    ],
    'Web3': [
      'https://picsum.photos/seed/web3-1/800/500',
      'https://picsum.photos/seed/web3-2/800/500',
      'https://picsum.photos/seed/web3-3/800/500'
    ],
    'AI': [
      'https://picsum.photos/seed/ai-1/800/500',
      'https://picsum.photos/seed/ai-2/800/500',
      'https://picsum.photos/seed/ai-3/800/500'
    ],
    'CSS': [
      'https://picsum.photos/seed/css-1/800/500',
      'https://picsum.photos/seed/css-2/800/500',
      'https://picsum.photos/seed/css-3/800/500'
    ],
    'Node.js': [
      'https://picsum.photos/seed/nodejs-1/800/500',
      'https://picsum.photos/seed/nodejs-2/800/500',
      'https://picsum.photos/seed/nodejs-3/800/500'
    ],
    'GSAP': [
      'https://picsum.photos/seed/gsap1/800/500',
      'https://picsum.photos/seed/gsap2/800/500',
      'https://picsum.photos/seed/gsap3/800/500'
    ],
    '响应式设计': [
      'https://picsum.photos/seed/responsive1/800/500',
      'https://picsum.photos/seed/responsive2/800/500',
      'https://picsum.photos/seed/responsive3/800/500'
    ],
    'TypeScript': [
      'https://picsum.photos/seed/typescript1/800/500',
      'https://picsum.photos/seed/typescript2/800/500',
      'https://picsum.photos/seed/typescript3/800/500'
    ],
    '默认': [
      'https://picsum.photos/seed/default1/800/500',
      'https://picsum.photos/seed/default2/800/500',
      'https://picsum.photos/seed/default3/800/500'
    ]
  };
  
  // 新闻分类图片映射 - 基于项目中现有的图片资源
  const newsImages: Record<string, string[]> = {
    '前端': [
      'https://picsum.photos/id/4/800/600',
      'https://picsum.photos/id/5/800/600',
      'https://picsum.photos/id/6/800/600'
    ],
    'Web3': [
      'https://picsum.photos/id/16/800/600',
      'https://picsum.photos/id/17/800/600',
      'https://picsum.photos/id/18/800/600'
    ],
    'AI': [
      'https://picsum.photos/id/19/800/600',
      'https://picsum.photos/id/20/800/600',
      'https://picsum.photos/id/21/800/600'
    ],
    '创意设计': [
      'https://picsum.photos/id/1/800/600',
      'https://picsum.photos/id/2/800/600',
      'https://picsum.photos/id/3/800/600'
    ],
    '前端开发': [
      'https://picsum.photos/id/4/800/600',
      'https://picsum.photos/id/5/800/600',
      'https://picsum.photos/id/6/800/600'
    ],
    '响应式设计': [
      'https://picsum.photos/id/7/800/600',
      'https://picsum.photos/id/8/800/600',
      'https://picsum.photos/id/9/800/600'
    ],
    '性能优化': [
      'https://picsum.photos/id/10/800/600',
      'https://picsum.photos/id/11/800/600',
      'https://picsum.photos/id/12/800/600'
    ],
    '默认': [
      'https://picsum.photos/id/13/800/600',
      'https://picsum.photos/id/14/800/600',
      'https://picsum.photos/id/15/800/600'
    ]
  };
  
  // 根据类型选择图片集合
  const imageMap = type === 'article' ? articleImages : newsImages;
  
  // 获取对应分类的图片数组，如果没有则使用默认
  const categoryImages = imageMap[category] || imageMap['默认'];
  
  // 随机选择一张图片
  const randomIndex = Math.floor(Math.random() * categoryImages.length);
  
  return categoryImages[randomIndex];
};

// 留言头像颜色生成函数
export const getRandomAvatarColor = (): string => {
  const colorPairs = [
    'from-red-400 to-pink-500',
    'from-blue-400 to-indigo-500',
    'from-green-400 to-teal-500',
    'from-yellow-400 to-orange-500',
    'from-purple-400 to-pink-500',
    'from-indigo-400 to-purple-500',
    'from-teal-400 to-cyan-500',
    'from-orange-400 to-red-500'
  ];
  
  const randomIndex = Math.floor(Math.random() * colorPairs.length);
  return colorPairs[randomIndex];
};