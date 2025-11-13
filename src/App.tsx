import { useEffect } from 'react';
import { useSparkEffect } from './hooks/useSparkEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlogList from './components/BlogList';
import ScrollSwitch from './components/ScrollSwitch';
import Footer from './components/Footer';
import { mockBlogPosts, mockScrollItems } from './utils/mockData';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import gsap from 'gsap';
import './App.css';

function App() {
  // 添加鼠标点击火花效果
  useSparkEffect();
  // 使用IntersectionObserver来检测元素是否可见，指定HTMLHeadingElement类型
  const { ref: titleRef, isIntersecting } = useIntersectionObserver<HTMLHeadingElement>({ threshold: 0.1, once: true });

  // 当元素进入可视区域时触发动画
  useEffect(() => {
    if (isIntersecting && titleRef.current) {
      // 为了避免下划线跟随动画，我们创建一个span来包裹文本内容
      const titleElement = titleRef.current;
      const originalText = titleElement.textContent;
      
      // 创建一个span来包裹文本内容，只对文本应用动画
      const textSpan = document.createElement('span');
      textSpan.textContent = originalText;
      textSpan.style.display = 'inline-block';
      textSpan.style.position = 'relative';
      
      // 清空原元素内容并添加span
      titleElement.textContent = '';
      titleElement.appendChild(textSpan);
      
      // 使用GSAP的timeline功能创建流畅的动画序列
      // timeline可以确保动画之间平滑过渡，避免卡顿
      const tl = gsap.timeline();
      
      // 1. 从左上角掉落
      tl.fromTo(
        textSpan,
        {
          // 起始状态：位于左上角，不可见
          x: -100,
          y: -100,
          opacity: 0,
          rotation: -5
        },
        {
          // 中间状态：掉落超过目标位置
          x: 0,
          y: 40,  // 增加掉落距离以增强弹跳效果
          opacity: 1,
          rotation: 0,
          duration: 0.8,  // 调整时间使动画更流畅
          ease: 'power2.out'  // 平滑的缓动函数
        }
      );
      
      // 2. 自然弹跳动画 - 使用bounce.out缓动实现连续弹跳
      // 直接使用单个bounce.out缓动函数可以创建更自然的弹跳效果
      tl.to(
        textSpan,
        {
          y: 0,
          duration: 1.2,  // 延长弹跳时间使效果更明显
          ease: 'bounce.out(1.2, 0.3)'  // 参数调整使弹跳更自然：1.2是强度，0.3是弹性
        }
      );
      
      // 可以选择性地添加一些微妙的旋转效果来增强自然感
      // 使用keyframes属性来实现多步旋转，这是GSAP中正确的方式
      tl.to(
        textSpan,
        {
          keyframes: [
            { rotation: 0, duration: 0.2 },
            { rotation: 2, duration: 0.2 },
            { rotation: -2, duration: 0.2 },
            { rotation: 0, duration: 0.2 }
          ],
          ease: 'power2.inOut'
        },
        0.8  // 与弹跳动画同时开始
      );
    }
  }, [isIntersecting, titleRef]);

  return (
    <div className="app">
      <Navbar />
      
      <main className="main-content">
        <Hero />
        
        <section className="featured-section">
          <div className="container">
            <h2 className="section-title">精选项目</h2>
            <ScrollSwitch items={mockScrollItems} height="500px" />
          </div>
        </section>
        
        <section className="blog-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">最新文章</h2>
              <p className="section-description">
                探索最新的技术文章和开发技巧
              </p>
            </div>
            <BlogList posts={mockBlogPosts} />
          </div>
        </section>
        
        <section className="about-section">
          <div className="container">
            <div className="about-content">
              <div className="about-text">
                <h2 className="section-title" ref={titleRef}>关于这个博客</h2>
                <p>
                  这是一个专注于前端开发及行业趋势的分享平台。
                  在这里，我将与大家共同探索前端技术的深度，分享AI、Web3等领域的最新动态，并记录我的学习与创作历程。
                </p>
                <p>
                  无论你是初学者还是有经验的开发者，这里都有适合你的内容。
                  欢迎收藏我的博客，获取最新的技术洞察和实用的开发技巧，同时也欢迎你在便签墙上留下你的足迹和问题，让我们一起成长。
                </p>
                <button className="about-button">了解更多</button>
              </div>
              <div className="about-image">
                <img 
                  src="https://picsum.photos/seed/about/600/400" 
                  alt="关于博客" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
