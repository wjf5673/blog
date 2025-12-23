import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Trash2, User, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  name: string;
  content: string;
  timestamp: Date;
  color: string;
}

const avatarColors = [
  "from-red-400 to-pink-500",
  "from-blue-400 to-indigo-500",
  "from-green-400 to-emerald-500",
  "from-yellow-400 to-orange-500",
  "from-purple-400 to-pink-500",
  "from-cyan-400 to-blue-500",
];

const MESSAGES_PER_PAGE = 5;

export function MessageWall() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "张三",
      content: "这个博客设计得太棒了！动效很流畅，内容也很有深度。",
      timestamp: new Date("2025-12-22T10:30:00"),
      color: avatarColors[0],
    },
    {
      id: 2,
      name: "李四",
      content: "期待更多关于 Web3 的技术分享，这个领域太有趣了！",
      timestamp: new Date("2025-12-22T11:15:00"),
      color: avatarColors[1],
    },
    {
      id: 3,
      name: "王五",
      content: "React Hooks 那篇文章写得非常好，帮我解决了很多疑惑。",
      timestamp: new Date("2025-12-22T12:00:00"),
      color: avatarColors[2],
    },
    {
      id: 4,
      name: "赵六",
      content: "留言墙的分页功能做得很棒，用户体验很好！",
      timestamp: new Date("2025-12-22T13:00:00"),
      color: avatarColors[3],
    },
    {
      id: 5,
      name: "孙七",
      content: "视差效果真的很酷，让页面更有层次感了。",
      timestamp: new Date("2025-12-22T14:00:00"),
      color: avatarColors[4],
    },
    {
      id: 6,
      name: "周八",
      content: "趣味玩法模块很有创意，期待更多互动功能！",
      timestamp: new Date("2025-12-22T15:00:00"),
      color: avatarColors[5],
    },
  ]);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Admin mode states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef<number | null>(null);

  const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
  const endIndex = startIndex + MESSAGES_PER_PAGE;
  const currentMessages = messages.slice(startIndex, endIndex);

  // Admin mode click handler
  const handleTitleClick = () => {
    setClickCount(prev => prev + 1);
    
    // Clear existing timer
    if (clickTimerRef.current) {
      window.clearTimeout(clickTimerRef.current);
    }
    
    // Set new timer to reset click count after 2 seconds
    clickTimerRef.current = window.setTimeout(() => {
      setClickCount(0);
    }, 2000);
    
    // Check if clicked 3 times
    if (clickCount + 1 >= 3) {
      setIsAdminMode(!isAdminMode);
      setClickCount(0);
      if (!isAdminMode) {
        toast.success("管理员模式已激活 🔧");
      } else {
        toast.info("管理员模式已退出");
      }
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        window.clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim()) {
      toast.error("请填写姓名和留言内容");
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      name: name.trim(),
      content: content.trim(),
      timestamp: new Date(),
      color: avatarColors[Math.floor(Math.random() * avatarColors.length)],
    };

    setMessages([newMessage, ...messages]);
    setName("");
    setContent("");
    setCurrentPage(1);
    toast.success("留言成功！");
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
    
    // Adjust current page if needed
    const newTotalPages = Math.ceil((messages.length - 1) / MESSAGES_PER_PAGE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
    
    toast.success("留言已删除");
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    return `${days}天前`;
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to messages section
    document.getElementById('messages-list')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <section id="messages" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div 
            className="flex items-center justify-center gap-2 mb-4 cursor-pointer select-none"
            onClick={handleTitleClick}
          >
            <MessageCircle className={`w-8 h-8 ${isAdminMode ? 'text-red-600' : 'text-indigo-600'}`} />
            <h2 className="text-4xl">
              {isAdminMode ? "🔧 留言墙 (管理员模式)" : "留言墙"}
            </h2>
            {isAdminMode && <Settings className="w-6 h-6 text-red-600" />}
          </div>
          <p className="text-xl text-gray-600">
            {isAdminMode ? "管理员模式：您可以删除任何留言" : "分享你的想法，与其他开发者交流"}
          </p>
        </motion.div>

        {/* Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="你的昵称"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                maxLength={20}
              />
            </div>
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="写下你的想法..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                maxLength={200}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {content.length}/200
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              发送留言
            </motion.button>
          </form>
        </motion.div>

        {/* Messages List */}
        <div id="messages-list" className="space-y-6 mb-8">
          <AnimatePresence mode="wait">
            {currentMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group ${
                  isAdminMode ? 'border-2 border-red-200' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${message.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <User className="w-6 h-6 text-white" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold">{message.name}</h4>
                        <span className="text-sm text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      
                      {isAdminMode && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            if (window.confirm(`确定要删除 "${message.name}" 的留言吗？`)) {
                              deleteMessage(message.id);
                            }
                          }}
                          className="opacity-100 text-red-500 hover:text-red-600 transition-colors"
                          title="删除留言"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      )}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    currentPage === page
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            还没有留言，快来留下第一条消息吧！
          </motion.div>
        )}
      </div>
    </section>
  );
}