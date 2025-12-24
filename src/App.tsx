import { useState, useEffect } from 'react';
import { useSparkEffect } from './hooks/useSparkEffect';
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import NewsSection from "./components/NewsSection";
import { TechSection } from "./components/TechSection";
import { MessageWall } from "./components/MessageWall";
import { FunZone } from "./components/FunZone";
import { Footer } from "./components/Footer";
import { ArticleDetail } from "./components/ArticleDetail";
import { ArticleList } from "./components/ArticleList";
import { NewsDetail } from "./components/NewsDetail";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  // 添加鼠标点击火花效果
  useSparkEffect();

  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    // Handle hash changes for navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      
      // Immediately scroll to top before page change
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use instant to avoid animation delay
      });
      
      // Then update the page state
      if (hash.startsWith("article-detail") || hash.startsWith("news-detail") || hash.startsWith("article-list")) {
        setCurrentPage(hash);
      } else {
        setCurrentPage("home");
      }
    };

    // Listen to hash changes
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Render different pages based on currentPage
  const renderPage = () => {
    if (currentPage === "article-detail") {
      return <ArticleDetail />;
    }
    if (currentPage === "article-list") {
      return <ArticleList />;
    }
    if (currentPage === "news-detail") {
      return <NewsDetail />;
    }
    
    // Default home page
    return (
      <>
        <Hero />
        <NewsSection />
        <TechSection />
        <FunZone />
        <MessageWall />
      </>
    );
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          {renderPage()}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </ThemeProvider>
  );
}

export default App;
