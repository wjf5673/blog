import { get, post, del } from './api';
import { getImageUrl } from './imageUtils';
import { formatRelativeTime, formatReadTime, formatDate } from './timeUtils';


// 获取当前语言设置
const getCurrentLanguage = (): string => {
  // 这里可以从localStorage、context或其他地方获取当前语言
  return localStorage.getItem('i18nextLng') || 'zh-CN';
};

// 处理国际化内容数据
const processI18nContent = (item: any, language: string) => {
  const translation = item.translations?.[language] || item.translations?.['zh-CN'] || {};
  
  return {
    id: item.id,
    type: item.type,
    language: item.language,
    category: translation.category || '',
    author: translation.author || '',
    date: item.date,
    formattedDate: formatDate(item.date),
    readTime: formatReadTime(item.readTime || 0),
    likes: item.likes,
    title: translation.title || '',
    excerpt: translation.excerpt || '',
    content: translation.content || '',
    tags: translation.tags || [],
    // 添加图片URL
    imageUrl: getImageUrl(translation.category || '默认', item.type)
  };
};

// 处理留言数据
const processMessage = (item: any) => {
  return {
    id: item.id,
    name: item.name,
    content: item.content,
    timestamp: item.timestamp,
    formattedTimestamp: formatRelativeTime(item.timestamp)
  };
};

// API业务接口函数

// 获取文章列表
export const getArticles = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    const language = getCurrentLanguage();
    
    // MockAPI.io 不支持查询参数过滤，需要获取所有数据然后在前端过滤
    const response = await get('/content');
    
    // 处理国际化数据
    if (response.data && Array.isArray(response.data)) {
      // 首先过滤出文章类型的数据
      let filteredData = response.data.filter((item: any) => item.type === 'article');
      
      // 处理国际化数据
      const processedData = filteredData.map((item: any) => 
        processI18nContent(item, language)
      );
      
      // 按时间戳倒序排列（最新的在最前面）
      processedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      // 如果提供了分页参数，在前端进行分页处理
      if (params?.page && params?.limit) {
        const startIndex = (params.page - 1) * params.limit;
        const endIndex = startIndex + params.limit;
        const paginatedData = processedData.slice(startIndex, endIndex);
        return { data: paginatedData, error: null };
      }
      
      return { data: processedData, error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return { data: null, error: 'Failed to fetch articles' };
  }
};

// 获取所有文章数据（用于计算总页数）
export const getAllArticles = async (): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    const language = getCurrentLanguage();
    
    // MockAPI.io 不支持查询参数过滤，需要获取所有数据然后在前端过滤
    const response = await get('/content');
    
    if (response.data && Array.isArray(response.data)) {
      // 首先过滤出文章类型的数据
      let filteredData = response.data.filter((item: any) => item.type === 'article');
      
      // 处理国际化数据
      const processedData = filteredData.map((item: any) => 
        processI18nContent(item, language)
      );
      // 按时间戳倒序排列
      processedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      return { data: processedData, error: null };
    }
    
    return { data: [], error: null };
  } catch (error) {
    console.error('Failed to fetch all articles:', error);
    return { data: null, error: 'Failed to fetch all articles' };
  }
};

// 获取文章详情
export const getArticleDetail = async (id: string): Promise<{ data: any | null; error: string | null }> => {
  try {
    const language = getCurrentLanguage();
    const response = await get(`/content/${id}`);
    
    // 处理国际化数据
    if (response.data) {
      const processedData = processI18nContent(response.data, language);
      return { data: processedData, error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to fetch article detail:', error);
    return { data: null, error: 'Failed to fetch article detail' };
  }
};

// 获取新闻列表
export const getNews = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    const language = getCurrentLanguage();
    
    // MockAPI.io 不支持查询参数过滤，需要获取所有数据然后在前端过滤
    const response = await get('/content');
    
    // 处理国际化数据
    if (response.data && Array.isArray(response.data)) {
      // 首先过滤出新闻类型的数据
      let filteredData = response.data.filter((item: any) => item.type === 'news');
      
      // 处理国际化数据
      const processedData = filteredData.map((item: any) => 
        processI18nContent(item, language)
      );
      
      // 按时间戳倒序排列（最新的在最前面）
      processedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      // 如果提供了分页参数，在前端进行分页处理
      if (params?.page && params?.limit) {
        const startIndex = (params.page - 1) * params.limit;
        const endIndex = startIndex + params.limit;
        const paginatedData = processedData.slice(startIndex, endIndex);
        return { data: paginatedData, error: null };
      }
      
      return { data: processedData, error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to fetch news:', error);
    return { data: null, error: 'Failed to fetch news' };
  }
};

// 获取新闻详情
export const getNewsDetail = async (id: string): Promise<{ data: any | null; error: string | null }> => {
  try {
    const language = getCurrentLanguage();
    const response = await get(`/content/${id}`);
    
    // 处理国际化数据
    if (response.data) {
      const processedData = processI18nContent(response.data, language);
      return { data: processedData, error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to fetch news detail:', error);
    return { data: null, error: 'Failed to fetch news detail' };
  }
};

// 获取留言列表
export const getMessages = async (params?: {
  page?: number;
  limit?: number;
}): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    // 不传递分页参数，获取所有留言数据
    const response = await get('/messages');
    
    // 处理留言数据
    if (response.data && Array.isArray(response.data)) {
      const processedData = response.data.map(processMessage);
      
      // 按时间戳倒序排列（最新的在最前面）
      processedData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      // 如果提供了分页参数，在前端进行分页处理
      if (params?.page && params?.limit) {
        const startIndex = (params.page - 1) * params.limit;
        const endIndex = startIndex + params.limit;
        const paginatedData = processedData.slice(startIndex, endIndex);
        return { data: paginatedData, error: null };
      }
      
      return { data: processedData, error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return { data: null, error: 'Failed to fetch messages' };
  }
};

// 获取所有留言数据（用于计算总页数）
export const getAllMessages = async (): Promise<{ data: any[] | null; error: string | null }> => {
  try {
    const response = await get('/messages');
    
    if (response.data && Array.isArray(response.data)) {
      const processedData = response.data.map(processMessage);
      // 按时间戳倒序排列
      processedData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      return { data: processedData, error: null };
    }
    
    return { data: [], error: null };
  } catch (error) {
    console.error('Failed to fetch all messages:', error);
    return { data: null, error: 'Failed to fetch all messages' };
  }
};

// 提交留言
export const submitMessage = async (message: {
  name: string;
  content: string;
}): Promise<{ data: any | null; error: string | null }> => {
  try {
    const response = await post('/messages', {
      ...message,
      timestamp: new Date().toISOString()
    });
    
    // 处理返回的留言数据
    if (response.data) {
      const processedData = processMessage(response.data);
      return { data: processedData, error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to submit message:', error);
    return { data: null, error: 'Failed to submit message' };
  }
};

// 点赞内容
export const likeContent = async (id: string): Promise<{ data: any | null; error: string | null }> => {
  try {
    const response = await post(`/content/${id}/like`);
    
    // 直接返回API响应，但确保格式一致
    if (response.data) {
      return { data: response.data, error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to like content:', error);
    return { data: null, error: 'Failed to like content' };
  }
};

// 删除留言
export const deleteMessage = async (id: string): Promise<{ data: any | null; error: string | null }> => {
  try {
    const response = await del(`/messages/${id}`);
    
    // 返回成功响应
    if (response.data) {
      return { data: response.data, error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to delete message:', error);
    return { data: null, error: 'Failed to delete message' };
  }
};

// 获取文章分类
export const getArticleCategories = async (): Promise<{ data: string[] | null; error: string | null }> => {
  try {
    const language = getCurrentLanguage();
    const response = await get(`/content/categories?type=article&language=${language}`);
    
    // 确保返回格式一致
    if (response.data && Array.isArray(response.data)) {
      return { data: response.data as string[], error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to fetch article categories:', error);
    return { data: null, error: 'Failed to fetch article categories' };
  }
};

// 获取新闻分类
export const getNewsCategories = async (): Promise<{ data: string[] | null; error: string | null }> => {
  try {
    const language = getCurrentLanguage();
    const response = await get(`/content/categories?type=news&language=${language}`);
    
    // 确保返回格式一致
    if (response.data && Array.isArray(response.data)) {
      return { data: response.data as string[], error: null };
    }
    
    return { data: null, error: null };
  } catch (error) {
    console.error('Failed to fetch news categories:', error);
    return { data: null, error: 'Failed to fetch news categories' };
  }
};