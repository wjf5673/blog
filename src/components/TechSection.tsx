import { motion } from "motion/react";
import { BookOpen, GitBranch, Lightbulb, Rocket, Heart } from "lucide-react";
import { useState } from "react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  likes: number;
  gradient: string;
  icon: typeof BookOpen;
}

export function TechSection() {
  const [likedArticles, setLikedArticles] = useState<Set<number>>(new Set());

  const articles: Article[] = [
    {
      id: 1,
      title: "深入理解 React Hooks 设计原理",
      excerpt: "从源码角度解析 Hooks 的实现机制，理解 useState、useEffect 等核心 API 的工作原理。",
      category: "React",
      readTime: "8 分钟",
      likes: 234,
      gradient: "from-blue-500 to-cyan-500",
      icon: GitBranch,
    },
    {
      id: 2,
      title: "Web3 智能合约开发实战",
      excerpt: "手把手教你使用 Solidity 开发第一个 DApp，包含完整的合约部署和前端交互代码。",
      category: "Web3",
      readTime: "15 分钟",
      likes: 189,
      gradient: "from-purple-500 to-pink-500",
      icon: Rocket,
    },
    {
      id: 3,
      title: "打造高性能前端应用的 10 个技巧",
      excerpt: "从代码分割、懒加载到性能监控，全面提升你的 Web 应用性能。",
      category: "性能优化",
      readTime: "12 分钟",
      likes: 567,
      gradient: "from-orange-500 to-red-500",
      icon: Lightbulb,
    },
    {
      id: 4,
      title: "AI 辅助编程：提升开发效率的新范式",
      excerpt: "探索 AI 工具如何改变传统的编程工作流，让开发者专注于创造性工作。",
      category: "人工智能",
      readTime: "10 分钟",
      likes: 423,
      gradient: "from-green-500 to-emerald-500",
      icon: BookOpen,
    },
  ];

  const toggleLike = (articleId: number) => {
    setLikedArticles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  return (
    <section id="tech" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
      {/* Parallax Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5"
        style={{ y: 0 }}
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-4 border-indigo-300 rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 border-4 border-purple-300 rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 border-4 border-pink-300 rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h2 className="text-4xl">技术分享</h2>
          </div>
          <p className="text-xl text-gray-600">
            深度技术文章，助你成为更好的开发者
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {articles.map((article, index) => {
            const Icon = article.icon;
            const isLiked = likedArticles.has(article.id);
            const displayLikes = article.likes + (isLiked ? 1 : 0);

            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className={`h-2 bg-gradient-to-r ${article.gradient}`} />
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`p-3 rounded-xl bg-gradient-to-br ${article.gradient}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-6">{article.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <motion.a
                      href="#article-detail"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                    >
                      阅读文章
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleLike(article.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <motion.div
                        animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isLiked
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400"
                          }`}
                        />
                      </motion.div>
                      <span className={isLiked ? "text-red-500" : "text-gray-600"}>
                        {displayLikes}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#article-list"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
          >
            查看更多文章
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}