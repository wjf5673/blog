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
  
  // 增加火花数量使其更明显
  const sparkCount = 20;
  const sparks = [];
  
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    // 增大火花粒子大小
    const size = Math.random() * 6 + 3;
    // 改进颜色生成逻辑，使在亮色背景下更明显
    // 扩展色调范围，增加红、蓝等色彩，并调整亮度以提高对比度
    const hue = Math.random() * 360; // 全色轮范围
    // 50%的概率生成高对比度颜色
    const saturation = Math.random() > 0.5 ? 100 : Math.random() * 30 + 70; // 70-100%饱和度
    // 亮度调整：一部分亮一些，一部分暗一些，增强对比度
    const lightness = Math.random() > 0.3 ? 
      Math.random() * 20 + 50 : // 50-70% 暗一些的颜色，在亮色背景上更明显
      Math.random() * 20 + 80;  // 80-100% 亮一些的颜色
      
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    spark.style.position = 'absolute';
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.background = color;
    spark.style.borderRadius = '50%';
    // 增强发光效果，添加多层阴影
    spark.style.boxShadow = `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}40, 0 0 ${size * 6}px ${color}20`;
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
    // 随机角度微调，使火花分布更自然
    const angleVariation = (Math.random() - 0.5) * 0.5;
    // 增加飞行距离
    const distance = Math.random() * 70 + 30;
    
    gsap.timeline()
      .to(spark, {
        opacity: 1,
        // 增大初始缩放
        scale: 2,
        duration: 0.15
      })
      .to(spark, {
        x: Math.cos(angle + angleVariation) * distance,
        y: Math.sin(angle + angleVariation) * distance,
        opacity: 0,
        scale: 0,
        // 延长动画时间
        duration: 0.8,
        ease: 'power2.out'
      });
  });
  
  // 增加容器移除延迟时间
  setTimeout(() => {
    document.body.removeChild(sparkContainer);
  }, 1000);
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