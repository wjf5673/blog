import { useState, useEffect, useRef, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  once?: boolean;
}

// 自定义Hook：检测元素是否进入可视区域
export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>(
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    once = false
  } = options;
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useRef<T>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const unobserveRef = useRef<(() => void) | null>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    // 使用IntersectionObserver API
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
        
        // 如果只需要触发一次且已经进入可视区域，则取消观察
        if (once && entry.isIntersecting) {
          cleanup();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observerRef.current = observer;

    // 如果元素已经挂载，则开始观察
    if (ref.current) {
      observer.observe(ref.current);
    }

    // 设置取消观察的函数
    unobserveRef.current = () => {
      if (ref.current && observerRef.current) {
        observerRef.current.unobserve(ref.current);
      }
    };

    return cleanup;
  }, [threshold, rootMargin, once, cleanup]);

  return {
    ref,
    isIntersecting,
    entry,
    unobserve: unobserveRef.current
  };
};