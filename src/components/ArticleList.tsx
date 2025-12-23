import { motion } from "motion/react";
import { Search, Filter, Clock, Heart, ArrowLeft } from "lucide-react";
import { useState } from "react";

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
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              >
                <option value="all">所有分类</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            找到 {filteredArticles.length} 篇文章
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
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

        {filteredArticles.length === 0 && (
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
