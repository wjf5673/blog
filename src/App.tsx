import { useSparkEffect } from './hooks/useSparkEffect';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlogList from './components/BlogList';
import ScrollSwitch from './components/ScrollSwitch';
import Footer from './components/Footer';
import { mockBlogPosts, mockScrollItems } from './utils/mockData';
import './App.css';

function App() {
  // 添加鼠标点击火花效果
  useSparkEffect();

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
                <h2 className="section-title">关于这个博客</h2>
                <p>
                  这是一个专注于前端开发、UI/UX设计和技术创新的个人博客。
                  我希望通过分享我的知识和经验，帮助更多的开发者成长。
                </p>
                <p>
                  无论你是初学者还是有经验的开发者，这里都有适合你的内容。
                  欢迎订阅我的博客，获取最新的技术动态和开发技巧。
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
