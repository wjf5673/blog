import { useEffect } from 'react';
import { createSparkEffect } from '../utils/animationUtils';

// 自定义Hook：为整个页面添加鼠标点击火花效果
export const useSparkEffect = () => {
  useEffect(() => {
    // 处理点击事件
    const handleClick = (event: MouseEvent) => {
      // 获取点击位置
      const x = event.clientX;
      const y = event.clientY;
      
      // 创建火花效果
      createSparkEffect(x, y);
    };
    
    // 添加点击事件监听器
    document.addEventListener('click', handleClick);
    
    // 清理函数
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};