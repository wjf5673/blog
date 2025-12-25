import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Trash2, User, ChevronLeft, ChevronRight, Settings, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { getMessages, submitMessage, deleteMessage as deleteMessageApi, getAllMessages } from '../utils/apiService';
import { getRandomAvatarColor } from '../utils/imageUtils';

const MESSAGES_PER_PAGE = 5;

export function MessageWall() {
  const { t, i18n } = useTranslation();
  
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  
  // Admin mode states
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef<number | null>(null);
  
  // 存储用户名到颜色的映射，确保同一用户始终使用相同颜色
  const [userColorMap, setUserColorMap] = useState<Record<string, string>>({});

  // Fetch messages from API
  const fetchMessages = async (page: number) => {
    setLoading(true);
    try {
      // 获取分页的留言数据
      const result = await getMessages({ 
        page, 
        limit: MESSAGES_PER_PAGE
      });
      
      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      if (result.data) {
        setMessages(result.data);
        
        // 为所有没有颜色的用户生成并保存颜色
        const newUserColors: Record<string, string> = {};
        result.data.forEach((message: any) => {
          if (!message.color && !userColorMap[message.name]) {
            newUserColors[message.name] = getRandomAvatarColor();
          }
        });
        
        if (Object.keys(newUserColors).length > 0) {
          setUserColorMap(prev => ({
            ...prev,
            ...newUserColors
          }));
        }
        
        // 获取所有留言数据以计算总页数
        const allMessagesResult = await getAllMessages();
        if (allMessagesResult.data) {
          const totalMessages = allMessagesResult.data.length;
          const calculatedTotalPages = Math.ceil(totalMessages / MESSAGES_PER_PAGE);
          setTotalPages(calculatedTotalPages || 1); // 确保至少为1
        }
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast.error(t('messageWall.errors.fetchFailed'));
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and when page changes
  useEffect(() => {
    fetchMessages(currentPage);
  }, [currentPage, i18n.language]);

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
        toast.success(t('messageWall.adminMode.activated'));
      } else {
        toast.info(t('messageWall.adminMode.deactivated'));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim()) {
      toast.error(t('messageWall.validation.required'));
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitMessage({
        name: name.trim(),
        content: content.trim()
      });
      
      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      if (result.data) {
        // 为新用户生成并保存颜色
        if (!userColorMap[name.trim()]) {
          setUserColorMap(prev => ({
            ...prev,
            [name.trim()]: getRandomAvatarColor()
          }));
        }
        
        // 提交成功后，回到第一页并重新获取数据
        setCurrentPage(1);
        await fetchMessages(1);
        
        setName("");
        setContent("");
        toast.success(t('messageWall.success.posted'));
      }
    } catch (error) {
      console.error('Failed to submit message:', error);
      toast.error(t('messageWall.errors.submitFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMessage = async (id: string, name: string) => {
    if (!window.confirm(t('messageWall.adminMode.deleteConfirm', { name }))) {
      return;
    }
    
    try {
      const result = await deleteMessageApi(id);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      // 从列表中移除消息
      setMessages(messages.filter((msg) => msg.id !== id));
      
      // 如果当前页没有消息了且不是第一页，返回上一页
      if (messages.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        // 否则重新获取当前页数据
        fetchMessages(currentPage);
      }
      
      toast.success(t('messageWall.success.deleted'));
    } catch (error) {
      console.error('Failed to delete message:', error);
      toast.error(t('messageWall.errors.deleteFailed'));
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to messages section
    document.getElementById('messages-list')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  // Get avatar color for a message
  const getAvatarColor = (message: any) => {
    // 如果API返回了color属性，使用它
    if (message.color) {
      return message.color;
    }
    
    // 否则根据name生成一个固定的颜色
    if (!userColorMap[message.name]) {
      // 为新用户生成一个颜色并保存到映射中
      setUserColorMap(prev => ({
        ...prev,
        [message.name]: getRandomAvatarColor()
      }));
      return getRandomAvatarColor(); // 返回新生成的颜色
    }
    
    // 返回已保存的颜色
    return userColorMap[message.name];
  };

  return (
    <section id="messages" className="py-20 bg-white dark:bg-gray-900">
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
              {isAdminMode ? `🔧 ${t('messageWall.title')} (${t('messageWall.adminMode.title')})` : t('messageWall.title')}
            </h2>
            {isAdminMode && <Settings className="w-6 h-6 text-red-600" />}
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {isAdminMode ? t('messageWall.adminMode.description') : t('messageWall.subtitle')}
          </p>
        </motion.div>

        {/* Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-12"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('messageWall.form.namePlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/30 outline-none transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                maxLength={20}
                disabled={submitting}
              />
            </div>
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t('messageWall.form.messagePlaceholder')}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/30 outline-none transition-all resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                maxLength={200}
                disabled={submitting}
              />
              <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                {content.length}/200
              </div>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="w-full py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('messageWall.form.submitting')}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t('messageWall.form.submit')}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Messages List */}
        <div id="messages-list" className="space-y-6 mb-8">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all group ${
                    isAdminMode ? 'border-2 border-red-200 dark:border-red-800' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(message)} flex items-center justify-center flex-shrink-0`}
                    >
                      <User className="w-6 h-6 text-white" />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{message.name}</h4>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {message.formattedTimestamp}
                          </span>
                        </div>
                        
                        {isAdminMode && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteMessage(message.id.toString(), message.name)}
                            className="opacity-100 text-red-500 hover:text-red-600 transition-colors"
                            title={t('messageWall.adminMode.deleteButton')}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
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
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
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
                      ? "bg-indigo-600 dark:bg-indigo-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
                  ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
                  : "text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {!loading && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400 dark:text-gray-500"
          >
            {t('messageWall.empty')}
          </motion.div>
        )}
      </div>
    </section>
  );
}