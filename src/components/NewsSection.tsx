import { motion } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { Cpu, Blocks, Code, TrendingUp, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface NewsItem {
  id: number;
  category: "frontend" | "web3" | "ai";
  title: string;
  description: string;
  image: string;
  date: string;
  link: string;
}

const categoryConfig = {
  frontend: { icon: Code, color: "text-blue-600", bg: "bg-blue-50", label: "前端" },
  web3: { icon: Blocks, color: "text-purple-600", bg: "bg-purple-50", label: "Web3" },
  ai: { icon: Cpu, color: "text-pink-600", bg: "bg-pink-50", label: "AI" },
};

export function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const NEWS_PER_PAGE = 6;

  const newsItems: NewsItem[] = [
    {
      id: 1,
      category: "frontend",
      title: "React 19 正式发布",
      description: "React 19 带来了全新的编译器优化和并发特性，性能提升显著。",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjYzNTM1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-20",
      link: "#news-detail",
    },
    {
      id: 2,
      category: "ai",
      title: "GPT-5 多模态能力突破",
      description: "OpenAI 发布 GPT-5，在图像理解和视频生成方面取得重大突破。",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NjI4OTUwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-19",
      link: "#news-detail",
    },
    {
      id: 3,
      category: "web3",
      title: "以太坊完成重大升级",
      description: "以太坊 2.0 全面部署，Gas 费用降低 80%，交易速度提升 10 倍。",
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvfGVufDF8fHx8MTc2NjM4MzgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-18",
      link: "#news-detail",
    },
    {
      id: 4,
      category: "frontend",
      title: "Tailwind CSS 4.0 发布",
      description: "全新的设计系统和更强大的主题定制能力。",
      image: "https://images.unsplash.com/photo-1595623654300-b27329804025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nfGVufDF8fHx8MTc2NjM0NzI2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-17",
      link: "#news-detail",
    },
    {
      id: 5,
      category: "ai",
      title: "AI 编程助手新标准",
      description: "GitHub Copilot X 集成最新 AI 模型，代码生成准确率达 95%。",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NjI4OTUwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-16",
      link: "#news-detail",
    },
    {
      id: 6,
      category: "web3",
      title: "DeFi 协议安全升级",
      description: "主流 DeFi 协议采用新的安全标准，用户资产保护更上一层楼。",
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvfGVufDF8fHx8MTc2NjM4MzgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-15",
      link: "#news-detail",
    },
    {
      id: 7,
      category: "frontend",
      title: "Vue 4.0 预览版发布",
      description: "Vue 4.0 带来更快的渲染性能和更小的包体积。",
      image: "https://images.unsplash.com/photo-1595623654300-b27329804025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nfGVufDF8fHx8MTc2NjM0NzI2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-14",
      link: "#news-detail",
    },
    {
      id: 8,
      category: "ai",
      title: "Claude 4 推出企业版",
      description: "Anthropic 发布 Claude 4 企业版，支持更长上下文和更强推理能力。",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NjI4OTUwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-13",
      link: "#news-detail",
    },
    {
      id: 9,
      category: "web3",
      title: "Layer 2 解决方案新突破",
      description: "新的 Layer 2 解决方案将交易成本降低至原来的 1/10。",
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvfGVufDF8fHx8MTc2NjM4MzgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-12",
      link: "#news-detail",
    },
    {
      id: 10,
      category: "frontend",
      title: "Next.js 15 性能优化",
      description: "Next.js 15 带来了显著的性能提升和更好的开发体验。",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjYzNTM1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-11",
      link: "#news-detail",
    },
    {
      id: 11,
      category: "ai",
      title: "机器学习模型压缩技术",
      description: "新的模型压缩技术让AI模型在移动设备上运行更加高效。",
      image: "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDF8fHx8MTc2NjI4OTUwNnww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-10",
      link: "#news-detail",
    },
    {
      id: 12,
      category: "web3",
      title: "跨链桥技术新进展",
      description: "新一代跨链桥技术实现了更安全、更快速的价值转移。",
      image: "https://images.unsplash.com/photo-1590286162167-70fb467846ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwY3J5cHRvfGVufDF8fHx8MTc2NjM4MzgzN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2025-12-09",
      link: "#news-detail",
    },
  ];

  // 使用 useMemo 优化筛选逻辑
  const filteredNews = useMemo(() => {
    return selectedCategory
      ? newsItems.filter((item) => item.category === selectedCategory)
      : newsItems;
  }, [selectedCategory]);

  // 计算分页数据
  const { paginatedNews, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(filteredNews.length / NEWS_PER_PAGE);
    const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
    const endIndex = startIndex + NEWS_PER_PAGE;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);
    
    return { paginatedNews, totalPages };
  }, [filteredNews, currentPage]);

  // 当分类改变时重置页码
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 页面切换处理
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到新闻区域顶部
    const newsSection = document.getElementById('news');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="news" className="py-20 bg-white relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.03 }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
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
            <TrendingUp className="w-8 h-8 text-indigo-600" />
            <h2 className="text-4xl">行业动态</h2>
          </div>
          <p className="text-xl text-gray-600">
            追踪前端、Web3、AI 领域的最新发展
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 justify-center mb-12 flex-wrap"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === null
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            全部
          </motion.button>
          {Object.entries(categoryConfig).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(key)}
                className={`px-6 py-2 rounded-full transition-all flex items-center gap-2 ${
                  selectedCategory === key
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {config.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedNews.map((item, index) => {
            const config = categoryConfig[item.category];
            const Icon = config.icon;
            
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
              >
                <div className="relative overflow-hidden h-48">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full ${config.bg} flex items-center gap-1`}>
                    <Icon className={`w-4 h-4 ${config.color}`} />
                    <span className={`text-sm ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                  <h3 className="text-xl mb-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    className="inline-flex items-center gap-2 text-indigo-600 hover:gap-3 transition-all"
                  >
                    阅读更多 <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* 分页控件 */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              上一页
            </motion.button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              下一页
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {/* 显示统计信息 */}
        {filteredNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-gray-600"
          >
            <p>
              共 {filteredNews.length} 条新闻，第 {currentPage} / {totalPages} 页
            </p>
          </motion.div>
        )}

        {/* 无数据提示 */}
        {filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">该分类暂无新闻</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}