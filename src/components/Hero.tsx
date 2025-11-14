import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // 随机颜色动画效果
  useEffect(() => {
    // 生成随机颜色的函数
    const getRandomColor = () => {
      const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
        '#FFEAA7', '#DFF9FB', '#FF7675', '#6C5CE7',
        '#FD79A8', '#FDCB6E', '#6C5CE7', '#00B894',
        '#0984E3', '#E17055', '#A29BFE', '#FF9FF3'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // 为高亮文本创建实时随机颜色变化
    const updateTextColor = () => {
      const highlightElements = subtitleRef.current?.querySelectorAll('.highlight-text');
      if (highlightElements) {
        highlightElements.forEach((element: Element) => {
          const randomColor = getRandomColor();
          (element as HTMLElement).style.color = randomColor;
          
          // 添加发光效果
          (element as HTMLElement).style.textShadow = `0 0 5px ${randomColor}, 0 0 10px ${randomColor}80`;
        });
      }
    };

    // 初始设置颜色
    updateTextColor();
    
    // 每秒更新一次颜色
    const colorInterval = setInterval(updateTextColor, 1000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  // 页面加载动画
  useEffect(() => {
    if (heroRef.current && titleRef.current && subtitleRef.current && buttonRef.current) {
      // 首先确保所有元素可见
      gsap.set([titleRef.current, subtitleRef.current, buttonRef.current], { opacity: 1 });
      
      // 创建动画序列
      const tl = gsap.timeline();
      
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 30 }, // 初始状态
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out' 
        }
      )
      .fromTo(subtitleRef.current, 
        { opacity: 0, y: 20 }, // 初始状态
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out' 
        }, '-=0.3')
      .fromTo(buttonRef.current, 
        { opacity: 0, y: 20 }, // 初始状态
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out' 
        }, '-=0.3')
      // 安全地检查并使用子元素
      if (decorRef.current && decorRef.current.children.length > 0) {
        const decorElements = Array.from(decorRef.current.children);
        // 确保装饰元素可见
        gsap.set(decorElements, { opacity: 1 });
        tl.fromTo(decorElements, 
          { opacity: 0, scale: 0.8 }, // 初始状态
          { 
            opacity: 1, 
            scale: 1, 
            duration: 1, 
            stagger: 0.1, 
            ease: 'power2.out' 
          }, '-=0.5');
      } else {
        tl.to({}, { duration: 0.1 }); // 占位动画，确保时间线正常
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
    
    // 标题放大效果 - 添加空值检查
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };
  
  const handleHeroLeave = () => {
    // 鼠标离开恢复效果
    gsap.to(circleRefs.current.filter(Boolean), {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.in'
    });
    
    // 添加空值检查
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.in'
      });
    }
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
            <span dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
          </h1>
          
          <p ref={subtitleRef} className="hero-subtitle text-gradient">
            <span dangerouslySetInnerHTML={{ __html: t('hero.subtitle') }} />
          </p>
          
          <button 
            ref={buttonRef}
            className="hero-button"
            onClick={handleScrollDown}
          >
            {t('hero.button')}
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