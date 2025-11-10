import gsap from 'gsap';

// 生成鼠标点击火花效果
export const createSparkEffect = (x: number, y: number) => {
  // 创建火花容器
  const sparkContainer = document.createElement('div');
  sparkContainer.style.position = 'fixed';
  sparkContainer.style.left = `${x}px`;
  sparkContainer.style.top = `${y}px`;
  sparkContainer.style.pointerEvents = 'none';
  sparkContainer.style.zIndex = '9999';
  
  // 创建多个火花粒子
  const sparkCount = 12;
  const sparks = [];
  
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const color = `hsl(${Math.random() * 60 + 50}, 100%, ${Math.random() * 40 + 60}%)`;
    
    spark.style.position = 'absolute';
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.background = color;
    spark.style.borderRadius = '50%';
    spark.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    spark.style.opacity = '0';
    spark.style.left = '0';
    spark.style.top = '0';
    
    sparkContainer.appendChild(spark);
    sparks.push(spark);
  }
  
  document.body.appendChild(sparkContainer);
  
  // 使用GSAP为每个火花添加动画
  sparks.forEach((spark, index) => {
    const angle = (index / sparkCount) * Math.PI * 2;
    const distance = Math.random() * 40 + 20;
    
    gsap.timeline()
      .to(spark, {
        opacity: 1,
        scale: 1.5,
        duration: 0.1
      })
      .to(spark, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
  });
  
  // 动画结束后移除容器
  setTimeout(() => {
    document.body.removeChild(sparkContainer);
  }, 800);
};

// 淡入动画函数
export const fadeIn = (element: HTMLElement, duration: number = 0.5) => {
  gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration, ease: 'power2.out' }
  );
};

// 缩放动画函数
export const scaleIn = (element: HTMLElement, duration: number = 0.4) => {
  gsap.fromTo(
    element,
    { scale: 0.9, opacity: 0 },
    { scale: 1, opacity: 1, duration, ease: 'back.out(1.7)' }
  );
};

// 视差滚动效果
export const parallax = (element: HTMLElement, speed: number = 0.1) => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const offset = scrollY * speed;
    gsap.set(element, { y: offset });
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // 返回清理函数
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};