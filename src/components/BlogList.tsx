import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { BlogPost } from '../types/blog';
import { fadeIn } from '../utils/animationUtils';

interface BlogListProps {
  posts: BlogPost[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  const { t } = useTranslation();
  // 使用ref来引用每个文章卡片，用于动画
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // 监听文章卡片进入视口，添加动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            fadeIn(entry.target, 0.5);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    // 观察所有文章卡片
    postRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });
    
    return () => {
      observer.disconnect();
    };
  }, [posts]);
  
  // 更新ref数组
  const updateRef = (el: HTMLDivElement | null, index: number) => {
    postRefs.current[index] = el;
  };
  
  return (
    <div className="blog-list">
      {posts.map((post, index) => (
        <div 
          key={post.id}
          className="blog-post"
          ref={(el) => updateRef(el, index)}
          style={{ opacity: 0 }} // 初始状态为透明
        >
          <div className="blog-post-image">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              loading="lazy"
              className="post-image"
            />
          </div>
          
          <div className="blog-post-content">
            
            <h2 className="blog-post-title">
              {post.title}
            </h2>
            
            <p className="blog-post-excerpt">
              {post.excerpt}
            </p>
            
            <div className="blog-post-tags">
              {post.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="post-tag">
                  {tag}
                </span>
              ))}
            </div>
            
            <a 
                href={`/blog/${post.id}`} 
                className="blog-post-link"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`Navigate to post ${post.id}`);
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('blog.readMore')}
                <svg className="link-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;