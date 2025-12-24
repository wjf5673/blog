import { motion } from "motion/react";
import { Search, Filter, Clock, Heart, ArrowLeft, ChevronDown, Loader2 } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  likes: number;
  date: string;
  image: string;
}

export function ArticleList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 重置分页当搜索或筛选改变时
  useEffect(() => {
    setCurrentPage(1);
    setHasMore(true);
  }, [searchQuery, selectedCategory]);

  const articles: Article[] = [
    {
      id: 1,
      title: "深入理解 React Hooks 设计原理",
      excerpt: "从源码角度解析 Hooks 的实现机制，理解 useState、useEffect 等核心 API 的工作原理。",
      category: "React",
      readTime: "8 分钟",
      likes: 234,
      date: "2025-12-20",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400",
    },
    {
      id: 2,
      title: "Web3 智能合约开发实战",
      excerpt: "手把手教你使用 Solidity 开发第一个 DApp，包含完整的合约部署和前端交互代码。",
      category: "Web3",
      readTime: "15 分钟",
      likes: 189,
      date: "2025-12-19",
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?w=400",
    },
    {
      id: 3,
      title: "打造高性能前端应用的 10 个技巧",
      excerpt: "从代码分割、懒加载到性能监控，全面提升你的 Web 应用性能。",
      category: "性能优化",
      readTime: "12 分钟",
      likes: 567,
      date: "2025-12-18",
      image: "https://images.unsplash.com/photo-1595623654300-b27329804025?w=400",
    },
    {
      id: 4,
      title: "AI 辅助编程：提升开发效率的新范式",
      excerpt: "探索 AI 工具如何改变传统的编程工作流，让开发者专注于创造性工作。",
      category: "人工智能",
      readTime: "10 分钟",
      likes: 423,
      date: "2025-12-17",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=400",
    },
    {
      id: 5,
      title: "TypeScript 高级类型系统详解",
      excerpt: "掌握 TypeScript 的高级类型特性，让你的代码更加类型安全。",
      category: "TypeScript",
      readTime: "15 分钟",
      likes: 312,
      date: "2025-12-16",
      image: "https://images.unsplash.com/photo-1595623654300-b27329804025?w=400",
    },
    {
      id: 6,
      title: "CSS Grid 布局完全指南",
      excerpt: "从基础到高级，全面掌握 CSS Grid 布局系统。",
      category: "CSS",
      readTime: "10 分钟",
      likes: 278,
      date: "2025-12-15",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400",
    },
    {
      id: 7,
      title: "Vue 3 Composition API 最佳实践",
      excerpt: "深入了解 Vue 3 的 Composition API，学习如何构建可维护的大型应用。",
      category: "Vue",
      readTime: "12 分钟",
      likes: 198,
      date: "2025-12-14",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
    },
    {
      id: 8,
      title: "Node.js 微服务架构设计",
      excerpt: "使用 Node.js 构建可扩展的微服务架构，包含服务发现、负载均衡等核心概念。",
      category: "Node.js",
      readTime: "18 分钟",
      likes: 445,
      date: "2025-12-13",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    },
    {
      id: 9,
      title: "GraphQL vs REST API 对比分析",
      excerpt: "深入比较 GraphQL 和 REST API 的优缺点，帮助你选择合适的 API 设计方案。",
      category: "API设计",
      readTime: "14 分钟",
      likes: 321,
      date: "2025-12-12",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
    },
    {
      id: 10,
      title: "Docker 容器化部署完整指南",
      excerpt: "从 Docker 基础到生产环境部署，掌握容器化技术的方方面面。",
      category: "DevOps",
      readTime: "20 分钟",
      likes: 512,
      date: "2025-12-11",
      image: "https://images.unsplash.com/photo-1603380404222-149f2b80daca?w=400",
    },
    {
      id: 11,
      title: "React Native 跨平台开发实战",
      excerpt: "使用 React Native 开发 iOS 和 Android 应用，一套代码多端运行。",
      category: "React",
      readTime: "16 分钟",
      likes: 289,
      date: "2025-12-10",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    },
    {
      id: 12,
      title: "Kubernetes 集群管理详解",
      excerpt: "学习如何在 Kubernetes 中部署、管理和扩展容器化应用程序。",
      category: "DevOps",
      readTime: "22 分钟",
      likes: 367,
      date: "2025-12-09",
      image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400",
    },
    {
      id: 13,
      title: "JavaScript 异步编程进阶",
      excerpt: "深入理解 Promise、async/await 和事件循环机制。",
      category: "JavaScript",
      readTime: "11 分钟",
      likes: 434,
      date: "2025-12-08",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
    },
    {
      id: 14,
      title: "以太坊智能合约安全最佳实践",
      excerpt: "学习如何编写安全的智能合约，避免常见的安全漏洞。",
      category: "Web3",
      readTime: "17 分钟",
      likes: 256,
      date: "2025-12-07",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
    },
    {
      id: 15,
      title: "Webpack 5 模块联邦详解",
      excerpt: "探索 Webpack 5 的模块联邦功能，实现微前端架构。",
      category: "工程化",
      readTime: "13 分钟",
      likes: 178,
      date: "2025-12-06",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    },
    {
      id: 16,
      title: "Flutter 状态管理解决方案对比",
      excerpt: "比较 Provider、Bloc、Riverpod 等状态管理方案的优缺点。",
      category: "Flutter",
      readTime: "15 分钟",
      likes: 203,
      date: "2025-12-05",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
    },
    {
      id: 17,
      title: "Redis 性能优化实战技巧",
      excerpt: "学习如何优化 Redis 性能，包括内存管理、持久化和集群配置。",
      category: "数据库",
      readTime: "14 分钟",
      likes: 389,
      date: "2025-12-04",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    },
    {
      id: 18,
      title: "Svelte 4 新特性深度解析",
      excerpt: "了解 Svelte 4 的最新特性，包括性能改进和开发体验提升。",
      category: "Svelte",
      readTime: "9 分钟",
      likes: 145,
      date: "2025-12-03",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece453e6d4?w=400",
    },
    {
      id: 19,
      title: "MongoDB 聚合管道完全指南",
      excerpt: "掌握 MongoDB 聚合管道的使用方法，实现复杂的数据分析查询。",
      category: "数据库",
      readTime: "16 分钟",
      likes: 298,
      date: "2025-12-02",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
    },
    {
      id: 20,
      title: "Next.js 13 App Router 迁移指南",
      excerpt: "从 Pages Router 迁移到 App Router，了解新的路由系统和服务器组件。",
      category: "React",
      readTime: "19 分钟",
      likes: 412,
      date: "2025-12-01",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    }
  ];

  const categories = ["all", ...Array.from(new Set(articles.map((a) => a.category)))];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 计算是否有更多数据
  useEffect(() => {
    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    setHasMore(currentPage < totalPages);
  }, [currentPage, filteredArticles.length]);

  // 滚动加载更多
  const loadMoreArticles = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // 模拟异步加载
    setTimeout(() => {
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
          loadMoreArticles();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreArticles, hasMore, isLoading]);

  // 获取当前页显示的文章
  const displayedArticles = filteredArticles.slice(0, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.a
          href="#tech"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          返回首页
        </motion.a>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl mb-4">技术文章</h1>
          <p className="text-xl text-gray-600">
            探索最新的前端、Web3 和 AI 技术
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 relative">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="relative" ref={selectRef}>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setIsSelectOpen(false);
                  }}
                  onMouseDown={() => setIsSelectOpen(!isSelectOpen)}
                  className="pl-4 pr-10 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="all">所有分类</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <motion.div
                  animate={{ rotate: isSelectOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none z-10"
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            显示 {displayedArticles.length} / {filteredArticles.length} 篇文章
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedArticles.map((article) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{
                duration: 0.2,
                ease: "easeOut"
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                  {article.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>{article.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </div>
                </div>

                <h3 className="text-xl mb-2 group-hover:text-indigo-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>

                <div className="flex items-center justify-between">
                  <motion.a
                    href="#article-detail"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    阅读更多 →
                  </motion.a>

                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span>{article.likes}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* 加载更多触发器 */}
        <div ref={loadMoreRef} className="flex justify-center py-8">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-indigo-600"
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>加载中...</span>
            </motion.div>
          )}
        </div>

        {/* 没有更多数据提示 */}
        {!hasMore && displayedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500"
          >
            <p>已显示全部文章</p>
          </motion.div>
        )}

        {displayedArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-400">没有找到匹配的文章</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
