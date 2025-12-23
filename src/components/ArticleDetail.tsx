import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, User, Heart, Share2, Bookmark } from "lucide-react";
import { useState } from "react";

export function ArticleDetail() {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.a
          href="#tech"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          返回文章列表
        </motion.a>

        {/* Article Header */}
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
              alt="Article cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block px-4 py-1 bg-indigo-600 text-white rounded-full mb-4"
              >
                React
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl text-white mb-4"
              >
                深入理解 React Hooks 设计原理
              </motion.h1>
            </div>
          </div>

          {/* Article Meta */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>技术博主</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>2025年12月20日</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>8 分钟阅读</span>
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
                  <span className={isLiked ? "text-red-500" : "text-gray-600"}>
                    {isLiked ? "235" : "234"}
                  </span>
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

          {/* Article Content */}
          <div className="p-8 md:p-12 prose prose-lg max-w-none">
            <h2>为什么需要 Hooks？</h2>
            <p>
              在 React 16.8 之前，函数组件被称为"无状态组件"，它们无法拥有自己的状态，也无法使用生命周期方法。
              这意味着如果你需要在组件中使用状态或副作用，就必须将函数组件改写为类组件。
            </p>

            <p>
              这种限制带来了诸多不便：类组件的代码往往更加冗长，this 的绑定问题让新手困惑，
              而且在大型应用中，逻辑复用变得困难。Hooks 的出现就是为了解决这些问题。
            </p>

            <h2>useState 的实现原理</h2>
            <p>
              useState 是最基础也是最常用的 Hook。它的核心思想是在函数组件中维护一个状态数组，
              每次调用 useState 时，React 会按照调用顺序在数组中存储和读取状态。
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
{`function useState(initialValue) {
  const currentIndex = hookIndex++;
  hooks[currentIndex] = hooks[currentIndex] || initialValue;
  
  const setState = (newValue) => {
    hooks[currentIndex] = newValue;
    render();
  };
  
  return [hooks[currentIndex], setState];
}`}
            </pre>

            <h2>useEffect 的工作机制</h2>
            <p>
              useEffect 允许你在函数组件中执行副作用操作。它在组件渲染到屏幕之后异步执行，
              这样不会阻塞浏览器的绘制过程。
            </p>

            <p>
              React 会比较依赖数组中的值是否发生变化，如果发生变化就会执行 effect。
              这个比较是浅比较，使用 Object.is 来判断。
            </p>

            <h2>自定义 Hooks</h2>
            <p>
              自定义 Hooks 是 React Hooks 最强大的特性之一。通过提取组件逻辑到可复用的函数中，
              我们可以在不同组件之间共享状态逻辑。
            </p>

            <p>
              自定义 Hook 本质上就是一个函数，它的名字以 "use" 开头，内部可以调用其他 Hooks。
              这种模式让代码复用变得优雅而自然。
            </p>

            <h2>总结</h2>
            <p>
              React Hooks 彻底改变了我们编写 React 组件的方式。它让函数组件拥有了类组件的所有能力，
              同时保持了函数式编程的简洁性。理解 Hooks 的设计原理，能够帮助我们写出更好的 React 代码。
            </p>
          </div>

          {/* Related Articles */}
          <div className="p-8 bg-gray-50">
            <h3 className="text-2xl mb-6">相关文章</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "打造高性能前端应用的 10 个技巧", category: "性能优化" },
                { title: "Web3 智能合约开发实战", category: "Web3" },
              ].map((article, index) => (
                <motion.a
                  key={index}
                  href="#article-detail"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <span className="text-sm text-indigo-600 mb-2 block">
                    {article.category}
                  </span>
                  <h4 className="text-lg">{article.title}</h4>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
