// 博客文章类型定义
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  readTime: string;
  imageUrl: string;
}

// 标签类型定义
export interface Tag {
  id: string;
  name: string;
  count: number;
}

// 用户信息类型定义
export interface User {
  name: string;
  bio: string;
  avatar: string;
  socialLinks: {
    twitter: string;
    github: string;
    linkedin: string;
  };
}

// 滚动切换模块的项目类型
export interface ScrollItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}