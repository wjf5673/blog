import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// 内联SVG组件
interface BlogLogoProps {
  className?: string;
}

const BlogLogo: React.FC<BlogLogoProps> = ({ className = '' }) => (
  <svg width="40" height="40" viewBox="0 0 60 60" fill="none" className={className}>
    <circle cx="30" cy="30" r="28" fill="#4361ee" fillOpacity="0.1"/>
    <path d="M18 20H42M18 30H42M18 40H36" stroke="#4361ee" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="30" cy="20" r="3" fill="#4361ee"/>
    <circle cx="30" cy="30" r="3" fill="#4361ee"/>
    <circle cx="30" cy="40" r="3" fill="#4361ee"/>
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // 监听滚动事件，改变导航栏样式
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        // 滚动时logo缩小动画
        gsap.to(logoRef.current, {
          scale: 0.9,
          duration: 0.3,
          ease: 'power2.inOut',
          transformOrigin: '0% 0%' // 设置缩放原点为左上角，防止间距变化
        });
      } else {
        setIsScrolled(false);
        // 回到顶部时logo恢复动画
        gsap.to(logoRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut',
          transformOrigin: '0% 0%' // 保持缩放原点一致
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 动画效果
  useEffect(() => {
    if (isOpen) {
      // 打开菜单动画
      gsap.from('.navbar-menu', {
        opacity: 0,
        y: -20,
        duration: 0.3
      });
    }
  }, [isOpen]);
  
  const navItems = [
    { name: '首页', path: '/' },
    { name: '文章', path: '/articles' },
    { name: '关于', path: '/about' },
    { name: '联系', path: '/contact' }
  ];
  
  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" ref={logoRef}>
          <a href="/" className="logo-link" aria-label="返回首页">
            <div className="logo-container">
              <BlogLogo className="logo-icon" />
              <h1>
                <span className="logo-text">BlogSpark</span>
              </h1>
            </div>
          </a>
        </div>
        
        {/* 桌面导航 */}
        <div className="navbar-desktop">
          <ul className="navbar-list">
            {navItems.map((item, index) => (
              <li key={index} className="navbar-item">
                <a 
                  href={item.path} 
                  className="navbar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    // 这里可以添加导航逻辑
                    console.log(`Navigate to ${item.path}`);
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* 移动端导航按钮 */}
        <button 
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? '关闭菜单' : '打开菜单'}
        >
          <span className={`toggle-icon ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>
      
      {/* 移动端菜单 */}
      {isOpen && (
        <div className="navbar-menu">
          <ul className="navbar-mobile-list">
            {navItems.map((item, index) => (
              <li key={index} className="navbar-mobile-item">
                <a 
                  href={item.path} 
                  className="navbar-mobile-link"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    // 这里可以添加导航逻辑
                    console.log(`Navigate to ${item.path}`);
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;