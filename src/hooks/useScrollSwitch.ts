import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

interface ScrollSwitchOptions {
  itemWidth: number;
  transitionDuration?: number;
  easing?: string;
}

// 自定义Hook：处理水平滚动切换效果
export const useScrollSwitch = (
  itemCount: number,
  options: ScrollSwitchOptions
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { itemWidth, transitionDuration = 0.5, easing = 'power2.inOut' } = options;
  
  // 切换到指定索引
  const goToIndex = useCallback((index: number) => {
    if (index < 0 || index >= itemCount || !containerRef.current) return;
    
    setCurrentIndex(index);
    
    // 使用GSAP进行平滑动画
    gsap.to(containerRef.current, {
      x: -index * itemWidth,
      duration: transitionDuration,
      ease: easing
    });
  }, [itemCount, itemWidth, transitionDuration, easing]);
  
  // 下一个
  const next = useCallback(() => {
    if (currentIndex < itemCount - 1) {
      goToIndex(currentIndex + 1);
    }
  }, [currentIndex, itemCount, goToIndex]);
  
  // 上一个
  const prev = useCallback(() => {
    if (currentIndex > 0) {
      goToIndex(currentIndex - 1);
    }
  }, [currentIndex, goToIndex]);
  
  // 处理鼠标滚轮事件
  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    
    // 检测滚轮方向
    if (event.deltaY > 0) {
      // 向下滚动，显示下一个
      next();
    } else if (event.deltaY < 0) {
      // 向上滚动，显示上一个
      prev();
    }
  }, [next, prev]);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // 添加滚轮事件监听器
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // 清理函数
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);
  
  return {
    containerRef,
    currentIndex,
    goToIndex,
    next,
    prev,
    hasNext: currentIndex < itemCount - 1,
    hasPrev: currentIndex > 0
  };
};