/**
 * API请求工具函数
 * 提供统一的HTTP请求接口，包含错误处理和国际化支持
 */

// API基础URL
const API_BASE = 'https://6916a388a7a34288a27de75d.mockapi.io/api/v1';

// 请求配置接口
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

// API响应接口
interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  status: number;
  success: boolean;
}

// 错误类型枚举
enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  CLIENT_ERROR = 'CLIENT_ERROR',
  PARSE_ERROR = 'PARSE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// 自定义错误类
class ApiError extends Error {
  public type: ErrorType;
  public status?: number;
  public response?: unknown;

  constructor(message: string, type: ErrorType, status?: number, response?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
    this.response = response;
  }
}

/**
 * 获取国际化错误消息
 * @param type 错误类型
 * @param status HTTP状态码
 * @param language 当前语言
 * @returns 本地化的错误消息
 */
const getErrorMessage = (type: ErrorType, status?: number, language: string = 'zh-CN'): string => {
  const isEnglish = language.startsWith('en');
  
  const messages: Record<string, Record<string, string>> = {
    'zh-CN': {
      [ErrorType.NETWORK_ERROR]: '网络连接失败，请检查网络设置',
      [ErrorType.TIMEOUT_ERROR]: '请求超时，请稍后重试',
      [ErrorType.SERVER_ERROR]: '服务器内部错误，请稍后重试',
      [ErrorType.CLIENT_ERROR]: '请求参数错误',
      [ErrorType.PARSE_ERROR]: '数据解析失败',
      [ErrorType.UNKNOWN_ERROR]: '未知错误，请稍后重试'
    },
    'en-US': {
      [ErrorType.NETWORK_ERROR]: 'Network connection failed, please check your network settings',
      [ErrorType.TIMEOUT_ERROR]: 'Request timeout, please try again later',
      [ErrorType.SERVER_ERROR]: 'Server internal error, please try again later',
      [ErrorType.CLIENT_ERROR]: 'Request parameter error',
      [ErrorType.PARSE_ERROR]: 'Data parsing failed',
      [ErrorType.UNKNOWN_ERROR]: 'Unknown error, please try again later'
    }
  };

  const langMessages = messages[isEnglish ? 'en-US' : 'zh-CN'];
  
  // 针对特定状态码返回更具体的错误信息
  if (status) {
    if (status === 401) {
      return isEnglish ? 'Unauthorized access' : '未授权访问';
    }
    if (status === 403) {
      return isEnglish ? 'Access denied' : '访问被拒绝';
    }
    if (status === 404) {
      return isEnglish ? 'Resource not found' : '资源未找到';
    }
    if (status === 429) {
      return isEnglish ? 'Too many requests, please try again later' : '请求过于频繁，请稍后重试';
    }
  }

  return langMessages[type] || langMessages[ErrorType.UNKNOWN_ERROR];
};

/**
 * 创建带超时的fetch请求
 * @param url 请求URL
 * @param options 请求选项
 * @param timeout 超时时间（毫秒）
 * @returns Promise<Response>
 */
const fetchWithTimeout = (url: string, options: RequestInit, timeout: number = 10000): Promise<Response> => {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      reject(new ApiError(
        getErrorMessage(ErrorType.TIMEOUT_ERROR),
        ErrorType.TIMEOUT_ERROR
      ));
    }, timeout);

    fetch(url, {
      ...options,
      signal: controller.signal
    })
      .then(response => {
        clearTimeout(timeoutId);
        resolve(response);
      })
      .catch(error => {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          reject(new ApiError(
            getErrorMessage(ErrorType.TIMEOUT_ERROR),
            ErrorType.TIMEOUT_ERROR
          ));
        } else {
          reject(new ApiError(
            getErrorMessage(ErrorType.NETWORK_ERROR),
            ErrorType.NETWORK_ERROR
          ));
        }
      });
  });
};

/**
 * 通用API请求函数
 * @param endpoint API端点
 * @param config 请求配置
 * @returns Promise<ApiResponse<T>>
 */
export const apiRequest = async <T = unknown>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  try {
    // 获取当前语言（从localStorage或默认值）
    const language = localStorage.getItem('i18nextLng') || 'zh-CN';
    
    // 构建完整URL
    const url = `${API_BASE}${endpoint}`;
    
    // 默认请求头
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': language
    };
    
    // 合并请求头
    const headers = {
      ...defaultHeaders,
      ...config.headers
    };
    
    // 请求选项
    const options: RequestInit = {
      method: config.method || 'GET',
      headers,
      body: config.body ? JSON.stringify(config.body) : undefined
    };
    
    // 发送请求
    const response = await fetchWithTimeout(url, options, config.timeout);
    
    // 获取响应数据
    let responseData: unknown;
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }
    
    // 处理HTTP错误状态码
    if (!response.ok) {
      let errorType: ErrorType;
      
      if (response.status >= 500) {
        errorType = ErrorType.SERVER_ERROR;
      } else if (response.status >= 400) {
        errorType = ErrorType.CLIENT_ERROR;
      } else {
        errorType = ErrorType.UNKNOWN_ERROR;
      }
      
      throw new ApiError(
        getErrorMessage(errorType, response.status, language),
        errorType,
        response.status,
        responseData
      );
    }
    
    // 返回成功响应
    return {
      data: responseData as T,
      status: response.status,
      success: true
    };
    
  } catch (error) {
    // 如果是自定义API错误，直接抛出
    if (error instanceof ApiError) {
      throw error;
    }
    
    // 处理JSON解析错误
    if (error instanceof SyntaxError) {
      throw new ApiError(
        getErrorMessage(ErrorType.PARSE_ERROR),
        ErrorType.PARSE_ERROR
      );
    }
    
    // 处理其他未知错误
    throw new ApiError(
      getErrorMessage(ErrorType.UNKNOWN_ERROR),
      ErrorType.UNKNOWN_ERROR
    );
  }
};

/**
 * GET请求
 * @param endpoint API端点
 * @param config 请求配置
 * @returns Promise<ApiResponse<T>>
 */
export const get = <T = unknown>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { ...config, method: 'GET' });
};

/**
 * POST请求
 * @param endpoint API端点
 * @param data 请求数据
 * @param config 请求配置
 * @returns Promise<ApiResponse<T>>
 */
export const post = <T = unknown>(
  endpoint: string,
  data?: unknown,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { ...config, method: 'POST', body: data });
};

/**
 * PUT请求
 * @param endpoint API端点
 * @param data 请求数据
 * @param config 请求配置
 * @returns Promise<ApiResponse<T>>
 */
export const put = <T = unknown>(
  endpoint: string,
  data?: unknown,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { ...config, method: 'PUT', body: data });
};

/**
 * DELETE请求
 * @param endpoint API端点
 * @param config 请求配置
 * @returns Promise<ApiResponse<T>>
 */
export const del = <T = unknown>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { ...config, method: 'DELETE' });
};

/**
 * PATCH请求
 * @param endpoint API端点
 * @param data 请求数据
 * @param config 请求配置
 * @returns Promise<ApiResponse<T>>
 */
export const patch = <T = unknown>(
  endpoint: string,
  data?: unknown,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { ...config, method: 'PATCH', body: data });
};

// 导出错误类型和错误类，供外部使用
export { ApiError, ErrorType };
export type { ApiResponse, RequestConfig };