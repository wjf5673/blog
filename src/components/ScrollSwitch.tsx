import React from 'react';
import { useScrollSwitch } from '../hooks/useScrollSwitch';
import type { ScrollItem } from '../types/blog';

interface ScrollSwitchProps {
  items: ScrollItem[];
  height?: string;
}

const ScrollSwitch: React.FC<ScrollSwitchProps> = ({ 
  items, 
  height = '500px' 
}) => {
  // 计算每个项目的宽度 - 考虑响应式
  const calculateItemWidth = () => {
    // 获取容器宽度，减去padding等
    const containerWidth = window.innerWidth * 0.95;
    // 在小屏幕上可能需要调整
    return Math.min(containerWidth, 800);
  };
  
  const itemWidth = calculateItemWidth();
  
  const {
    containerRef,
    currentIndex,
    goToIndex,
    next,
    prev,
    hasNext,
    hasPrev
  } = useScrollSwitch(items.length, {
    itemWidth,
    transitionDuration: 0.6,
    easing: 'power2.inOut'
  });
  
  return (
    <div className="scroll-switch-container">
      <div className="scroll-switch-wrapper">
        {/* 滚动内容区域 */}
        <div 
          ref={containerRef}
          className="scroll-switch-content"
          style={{
            height,
            width: `${itemWidth}px`
          }}
        >
          <div 
            className="scroll-switch-track"
            style={{
              width: `${items.length * itemWidth}px`,
              height: '100%',
              display: 'flex'
            }}
          >
            {items.map((item) => (
              <div 
                key={item.id}
                className="scroll-switch-item"
                style={{
                  width: `${itemWidth}px`,
                  height: '100%'
                }}
              >
                <div className="scroll-item-content">
                  <div className="scroll-item-image">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      loading="lazy"
                    />
                  </div>
                  <div className="scroll-item-info">
                    <h3 className="scroll-item-title">{item.title}</h3>
                    <p className="scroll-item-description">{item.description}</p>
                    <button className="scroll-item-button">
                      了解更多
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 导航按钮 */}
        <button 
          className={`scroll-switch-btn scroll-switch-btn-prev ${!hasPrev ? 'disabled' : ''}`}
          onClick={prev}
          disabled={!hasPrev}
          aria-label="上一个"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button 
          className={`scroll-switch-btn scroll-switch-btn-next ${!hasNext ? 'disabled' : ''}`}
          onClick={next}
          disabled={!hasNext}
          aria-label="下一个"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* 指示器 */}
        <div className="scroll-switch-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              className={`scroll-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToIndex(index)}
              aria-label={`切换到项目 ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="scroll-hint">
        <span>↑↓ 滚动鼠标滚轮切换</span>
      </div>
    </div>
  );
};

export default ScrollSwitch;