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

// 英文版本的博客文章数据
export const mockBlogPostsEn: BlogPost[] = [
  {
    id: 1,
    title: '5 Key Strategies for Modern React Performance Optimization',
    excerpt: 'Explore practical tips for React application performance optimization, from component design to state management, to enhance your app performance and user experience.',
    content: 'This is the complete article content...',
    author: 'John Smith',
    date: '2024-01-15',
    tags: ['React', 'Performance', 'Frontend Development'],
    readTime: '5 min',
    imageUrl: 'https://picsum.photos/seed/react1/800/500'
  },
  {
    id: 2,
    title: 'GSAP Animation Library in Action: Creating Smooth User Interfaces',
    excerpt: 'Deep dive into the powerful features of GSAP animation library, learn how to create engaging animation effects and enhance user experience.',
    content: 'This is the complete article content...',
    author: 'Sarah Johnson',
    date: '2024-01-10',
    tags: ['GSAP', 'Animation', 'UI Design'],
    readTime: '7 min',
    imageUrl: 'https://picsum.photos/seed/gsap1/800/500'
  },
  {
    id: 3,
    title: 'Responsive Design: Perfect Adaptation from Mobile to Desktop',
    excerpt: 'Learn modern responsive design principles and techniques to ensure your website provides excellent user experience on any device.',
    content: 'This is the complete article content...',
    author: 'Mike Wilson',
    date: '2024-01-05',
    tags: ['Responsive Design', 'CSS', 'Mobile'],
    readTime: '6 min',
    imageUrl: 'https://picsum.photos/seed/responsive1/800/500'
  },
  {
    id: 4,
    title: 'Advanced TypeScript: Type System and Best Practices',
    excerpt: 'Master advanced TypeScript type features, learn how to write type-safe code to improve development efficiency and code quality.',
    content: 'This is the complete article content...',
    author: 'Emily Davis',
    date: '2024-01-01',
    tags: ['TypeScript', 'Type System', 'Best Practices'],
    readTime: '8 min',
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

// 英文版本的滚动切换项目数据
export const mockScrollItemsEn: ScrollItem[] = [
  {
    id: 1,
    title: 'Creative Design Trends',
    description: 'Explore the most cutting-edge web design and UI/UX trends of 2024, learn how to create eye-catching user experiences.',
    imageUrl: 'https://picsum.photos/id/1/800/600'
  },
  {
    id: 2,
    title: 'Frontend Development Tips',
    description: 'Master advanced techniques for modern frontend frameworks like React and Vue to improve development efficiency and code quality.',
    imageUrl: 'https://picsum.photos/id/2/800/600'
  },
  {
    id: 3,
    title: 'Responsive Design Practice',
    description: 'Learn how to create responsive websites that adapt to various devices, providing consistent user experience.',
    imageUrl: 'https://picsum.photos/id/3/800/600'
  },
  {
    id: 4,
    title: 'Performance Optimization Strategies',
    description: 'Deep dive into website performance optimization best practices to improve page loading speed and user experience.',
    imageUrl: 'https://picsum.photos/id/4/800/600'
  },
  {
    id: 5,
    title: 'Color Theory and Application',
    description: 'Master color psychology and color schemes to inject emotion and professionalism into your designs.',
    imageUrl: 'https://picsum.photos/id/5/800/600'
  },
  {
    id: 6,
    title: 'Micro-interaction Design',
    description: 'Learn how to design effective micro-interactions to enhance user engagement and product experience.',
    imageUrl: 'https://picsum.photos/id/6/800/600'
  },
  {
    id: 7,
    title: 'Accessibility Design Guide',
    description: 'Create websites that everyone can use, understand accessibility design standards and best practices.',
    imageUrl: 'https://picsum.photos/id/7/800/600'
  },
  {
    id: 8,
    title: 'Animation Effect Principles',
    description: 'Deeply understand animation principles to add smooth and natural animation effects to your website.',
    imageUrl: 'https://picsum.photos/id/8/800/600'
  }
];