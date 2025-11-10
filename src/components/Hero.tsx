import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // 页面加载动画
  useEffect(() => {
    if (heroRef.current) {
      // 创建动画序列
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3')
      .from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3')
      // 安全地检查并使用子元素
      if (decorRef.current && decorRef.current.children.length > 0) {
        tl.from(Array.from(decorRef.current.children), {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=0.5');
      } else {
        tl.from({}, { duration: 0.1 }); // 占位动画，确保时间线正常
      }
      
      // 自动播放的循环动画 - 装饰圆脉动效果
      const pulseAnimation = gsap.timeline({
        repeat: -1,
        repeatType: 'reverse',
        delay: 2
      });
      
      pulseAnimation.to(circleRefs.current.filter(Boolean), {
        scale: 1.1,
        opacity: 0.8,
        duration: 3,
        stagger: 0.5,
        ease: 'power2.inOut'
      });
      
      // 网格线动画
      const gridElement = decorRef.current?.querySelector('.decor-grid');
      const gridAnimation = gridElement ? gsap.to(gridElement, {
        // 使用gsap.to的from/to形式而不是数组
        backgroundPositionX: '50px',
        backgroundPositionY: '50px',
        duration: 20,
        repeat: -1,
        ease: 'linear'
      }) : null;
      
      // 标题文字动画
      const titleAnimation = gsap.timeline({
        repeat: -1,
        repeatDelay: 5,
        delay: 1
      });
      
      const highlightElement = titleRef.current?.querySelector('.hero-highlight');
      if (highlightElement) {
        titleAnimation.to(highlightElement, {
          color: '#4cc9f0',
          duration: 1,
          ease: 'power2.inOut'
        })
        .to(highlightElement, {
          color: '#4361ee',
          duration: 1,
          ease: 'power2.inOut'
        });
      }
      
      return () => {
        tl.kill();
        pulseAnimation.kill();
        gridAnimation?.kill();
        titleAnimation.kill();
      };
    }
  }, []);
  
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  const handleHeroHover = () => {
    // Hover效果 - 装饰圆扩散
    gsap.to(circleRefs.current.filter(Boolean), {
      scale: 1.2,
      opacity: 0.9,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    // 标题放大效果
    gsap.to(titleRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  
  const handleHeroLeave = () => {
    // 鼠标离开恢复效果
    gsap.to(circleRefs.current.filter(Boolean), {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in'
    });
    
    gsap.to(titleRef.current, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in'
    });
  };
  
  return (
    <section 
      className="hero" 
      ref={heroRef}
      onMouseEnter={handleHeroHover}
      onMouseLeave={handleHeroLeave}
    >
      <div className="hero-container">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">
            探索 <span className="hero-highlight">创意</span> 的无限可能
          </h1>
          
          <p ref={subtitleRef} className="hero-subtitle">
            欢迎来到我的个人博客，这里记录着我的思考、学习和创作。
            一起探索前端开发、UI/UX设计和技术创新的精彩世界。
          </p>
          
          <button 
            ref={buttonRef}
            className="hero-button"
            onClick={handleScrollDown}
          >
            开始探索
            <span className="button-arrow">→</span>
          </button>
        </div>
        
        <div ref={decorRef} className="hero-decoration">
          <div 
            className="decor-circle decor-circle-1" 
            ref={(el) => {
              circleRefs.current[0] = el;
            }}
          ></div>
          <div 
            className="decor-circle decor-circle-2" 
            ref={(el) => {
              circleRefs.current[1] = el;
            }}
          ></div>
          <div 
            className="decor-circle decor-circle-3" 
            ref={(el) => {
              circleRefs.current[2] = el;
            }}
          ></div>
          <div className="decor-grid"></div>
        </div>
      </div>
      
      {/* 滚动提示 */}
      <div className="scroll-indicator">
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;