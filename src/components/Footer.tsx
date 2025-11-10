import React from 'react';

// 内联SVG组件
const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M5 12l7-7 7 7"/>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'Twitter',
      icon: <TwitterIcon />,
      url: 'https://twitter.com'
    },
    {
      name: 'GitHub',
      icon: <GithubIcon />,
      url: 'https://github.com'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon />,
      url: 'https://linkedin.com'
    }
  ];
  
  const footerLinks = [
    { name: '关于我', path: '/about' },
    { name: '联系方式', path: '/contact' },
    { name: '隐私政策', path: '/privacy' },
    { name: '使用条款', path: '/terms' }
  ];
  
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">
              <span className="logo-text">BlogSpark</span>
            </h2>
            <p className="footer-description">
              记录生活，分享知识，探索创意的无限可能。
            </p>
          </div>
          
          <div className="footer-links">
            <h3 className="footer-heading">快速链接</h3>
            <ul className="footer-link-list">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.path} 
                    className="footer-link"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`Navigate to ${link.path}`);
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-social">
            <h3 className="footer-heading">关注我</h3>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={social.name}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(`Open ${social.name}`);
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} BlogSpark. All rights reserved.</p>
          </div>
          
          <div className="footer-back-to-top">
            <button 
              className="back-to-top-btn"
              onClick={handleBackToTop}
              aria-label="返回顶部"
            >
              <ArrowUpIcon />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;