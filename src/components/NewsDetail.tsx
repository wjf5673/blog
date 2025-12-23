import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, User, Heart, Share2, Bookmark } from "lucide-react";
import { useState } from "react";

export function NewsDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.a
          href="#news"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          返回行业动态
        </motion.a>

        {/* News Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden">
            <motion.img
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjYzNTM1MDd8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="React 19"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full mb-4"
              >
                前端
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl text-white mb-4"
              >
                React 19 正式发布
              </motion.h1>
            </div>
          </div>

          {/* Meta Info */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>React 团队</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>2025年12月20日</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>5 分钟阅读</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isLiked ? "fill-red-500 text-red-500" : "text-gray-400"
                    }`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      isBookmarked ? "fill-indigo-500 text-indigo-500" : "text-gray-400"
                    }`}
                  />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed">
              React 团队今天正式发布了 React 19，这是 React 历史上最重要的更新之一。
              新版本带来了全新的编译器优化、并发特性增强以及开发者体验的全面提升。
            </p>

            <h2>主要新特性</h2>

            <h3>1. React 编译器</h3>
            <p>
              React 19 引入了全新的编译器，能够自动优化组件渲染性能。开发者不再需要手动使用
              useMemo、useCallback 等优化 Hooks，编译器会智能地为你完成这些工作。
            </p>

            <h3>2. 服务器组件增强</h3>
            <p>
              服务器组件（Server Components）得到了大幅增强，现在支持更复杂的数据流和状态管理。
              这使得构建高性能的服务端渲染应用变得更加简单。
            </p>

            <h3>3. 并发渲染改进</h3>
            <p>
              React 19 进一步优化了并发渲染机制，提供了更细粒度的控制。新的 startTransition API
              让开发者能够更好地控制用户界面的优先级更新。
            </p>

            <h3>4. 表单处理简化</h3>
            <p>
              新版本引入了原生的表单处理能力，大大简化了表单状态管理和验证。内置的表单 Actions
              让数据提交变得更加直观和类型安全。
            </p>

            <h2>性能提升</h2>
            <p>
              根据 React 团队的基准测试，React 19 在多个方面都有显著的性能提升：
            </p>
            <ul>
              <li>首次渲染速度提升 40%</li>
              <li>重渲染性能提升 30%</li>
              <li>包体积减小 25%</li>
              <li>内存占用降低 20%</li>
            </ul>

            <h2>迁移指南</h2>
            <p>
              React 团队承诺保持向后兼容性，大多数应用可以无缝升级到 React 19。
              对于使用了弃用 API 的项目，团队提供了详细的迁移工具和文档。
            </p>

            <h2>开发者反馈</h2>
            <p>
              社区对 React 19 的反馈非常积极。许多开发者表示，新的编译器大大减少了他们在性能优化上花费的时间，
              而服务器组件的改进让构建全栈应用变得更加愉快。
            </p>

            <h2>总结</h2>
            <p>
              React 19 是一个里程碑式的版本，它不仅带来了强大的新特性，还保持了 React 一贯的简洁和优雅。
              对于前端开发者来说，这是一个值得兴奋的更新，也是学习和掌握现代 Web 开发的绝佳机会。
            </p>
          </div>

          {/* Related News */}
          <div className="p-8 bg-gray-50">
            <h3 className="text-2xl mb-6">相关资讯</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Tailwind CSS 4.0 发布", category: "前端" },
                { title: "AI 编程助手新标准", category: "AI" },
              ].map((news, index) => (
                <motion.a
                  key={index}
                  href="#news-detail"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <span className="text-sm text-indigo-600 mb-2 block">
                    {news.category}
                  </span>
                  <h4 className="text-lg">{news.title}</h4>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
