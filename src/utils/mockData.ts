import type { BlogPost, ScrollItem } from '../types/blog';

// 模拟博客文章数据
export const mockBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: '现代React性能优化的5个关键策略',
    excerpt: '探索React应用性能优化的实用技巧，从组件设计到状态管理，提升你的应用性能和用户体验。',
    content: '这里是完整的文章内容...',
    author: '张三',
    date: '2024-01-15',
    tags: ['React', '性能优化', '前端开发'],
    readTime: '5分钟',
    imageUrl: 'https://picsum.photos/seed/react1/800/500'
  },
  {
    id: 2,
    title: 'GSAP动画库实战：创建流畅的用户界面',
    excerpt: '深入了解GSAP动画库的强大功能，学习如何创建引人入胜的动画效果，提升用户体验。',
    content: '这里是完整的文章内容...',
    author: '李四',
    date: '2024-01-10',
    tags: ['GSAP', '动画', 'UI设计'],
    readTime: '7分钟',
    imageUrl: 'https://picsum.photos/seed/gsap1/800/500'
  },
  {
    id: 3,
    title: '响应式设计：从移动端到桌面端的完美适配',
    excerpt: '学习现代响应式设计原则和技术，确保你的网站在任何设备上都能提供出色的用户体验。',
    content: '这里是完整的文章内容...',
    author: '王五',
    date: '2024-01-05',
    tags: ['响应式设计', 'CSS', '移动端'],
    readTime: '6分钟',
    imageUrl: 'https://picsum.photos/seed/responsive1/800/500'
  },
  {
    id: 4,
    title: 'TypeScript进阶：类型系统和最佳实践',
    excerpt: '掌握TypeScript的高级类型特性，学习如何编写类型安全的代码，提高开发效率和代码质量。',
    content: '这里是完整的文章内容...',
    author: '赵六',
    date: '2024-01-01',
    tags: ['TypeScript', '类型系统', '最佳实践'],
    readTime: '8分钟',
    imageUrl: 'https://picsum.photos/seed/typescript1/800/500'
  }
];

// 模拟滚动切换项目数据
export const mockScrollItems: ScrollItem[] = [
  {
    id: 1,
    title: '创意设计趋势',
    description: '探索2024年最前沿的网页设计和UI/UX趋势，了解如何打造引人注目的用户体验。',
    imageUrl: 'https://picsum.photos/id/1/800/600'
  },
  {
    id: 2,
    title: '前端开发技巧',
    description: '掌握React、Vue等现代前端框架的高级技巧，提升开发效率和代码质量。',
    imageUrl: 'https://picsum.photos/id/2/800/600'
  },
  {
    id: 3,
    title: '响应式设计实践',
    description: '学习如何创建适配各种设备的响应式网站，提供一致的用户体验。',
    imageUrl: 'https://picsum.photos/id/3/800/600'
  },
  {
    id: 4,
    title: '性能优化策略',
    description: '深入了解网站性能优化的最佳实践，提升页面加载速度和用户体验。',
    imageUrl: 'https://picsum.photos/id/4/800/600'
  },
  {
    id: 5,
    title: '色彩理论与应用',
    description: '掌握色彩心理学和配色方案，为你的设计注入情感和专业感。',
    imageUrl: 'https://picsum.photos/id/5/800/600'
  },
  {
    id: 6,
    title: '微交互设计',
    description: '学习如何设计有效的微交互，提升用户参与度和产品体验。',
    imageUrl: 'https://picsum.photos/id/6/800/600'
  },
  {
    id: 7,
    title: '无障碍设计指南',
    description: '创建人人可用的网站，了解无障碍设计标准和最佳实践。',
    imageUrl: 'https://picsum.photos/id/7/800/600'
  },
  {
    id: 8,
    title: '动画效果原理',
    description: '深入理解动画原理，为你的网站添加流畅自然的动画效果。',
    imageUrl: 'https://picsum.photos/id/8/800/600'
  }
];