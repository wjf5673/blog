// 从mock数据中随机选择图片作为封面
export const getRandomArticleImage = (): string => {
  const mockImages = [
    "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400",
    "https://images.unsplash.com/photo-1590286162167-70fb467846ae?w=400",
    "https://images.unsplash.com/photo-1595623654300-b27329804025?w=400",
    "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=400",
    "https://images.unsplash.com/photo-1595623654300-b27329804025?w=400",
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400",
    "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
    "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
    "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400"
  ];
  
  const randomIndex = Math.floor(Math.random() * mockImages.length);
  return mockImages[randomIndex];
};