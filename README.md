# 个人博客项目

这是一个使用现代前端技术栈构建的个人博客网站，项目代码托管在`blog`仓库，已成功部署到`wjf5673.github.io`域名进行访问。

## 🌐 在线访问

博客已成功部署，可通过以下地址访问：
**[https://wjf5673.github.io/blog/](https://wjf5673.github.io/blog/)**

## 项目概述

本项目是一个响应式个人博客网站，提供博客文章展示、动态交互效果和美观的用户界面。网站采用现代化设计，支持流畅的动画过渡和良好的用户体验。

## 技术栈

- **前端框架**: React 19.1.1
- **编程语言**: TypeScript
- **构建工具**: Vite (rolldown-vite)
- **动画库**: GSAP 3.13.0
- **代码规范**: ESLint
- **类型检查**: TypeScript

## 项目结构

```
src/
├── components/        # React组件
│   ├── BlogList.tsx   # 博客文章列表组件
│   ├── Footer.tsx     # 页脚组件
│   ├── Hero.tsx       # 主页英雄区域组件
│   ├── Navbar.tsx     # 导航栏组件
│   └── ScrollSwitch.tsx # 滚动切换组件
├── hooks/             # 自定义React Hook
│   ├── useScrollSwitch.ts
│   └── useSparkEffect.ts
├── types/             # TypeScript类型定义
│   └── blog.ts        # 博客相关类型
├── utils/             # 工具函数
│   ├── animationUtils.ts # 动画工具函数
│   └── mockData.ts    # 模拟数据
├── assets/            # 静态资源
├── App.tsx            # 应用主组件
└── main.tsx           # 应用入口文件
```

## 主要功能

1. **博客文章展示**：展示博客文章列表，支持文章预览和详细信息
2. **动态动画效果**：使用GSAP实现流畅的页面加载和滚动动画
3. **响应式设计**：适配各种屏幕尺寸，提供良好的移动端体验
4. **交互式导航**：支持滚动监听和动态导航效果

## 🚀 部署配置

### 重要：Vite配置中的base路径

为了确保网站在GitHub Pages上正确运行，项目在`vite.config.ts`中配置了重要的base路径：

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/blog/',  // ⚠️ 重要：配置GitHub Pages子路径
})
```

**为什么需要这个配置？**
- GitHub Pages将网站部署到子路径`/blog/`下
- `base: '/blog/'`确保所有静态资源路径正确
- 避免404错误和资源加载失败

### GitHub Actions自动化部署

项目已配置GitHub Actions自动化部署流程，当代码推送到main分支时，会自动：

1. 构建项目
2. 部署到`wjf5673.github.io`仓库的`/blog/`路径
3. 更新网站内容

部署流程配置在`.github/workflows/deploy.yml`文件中。

## 博客文章数据结构

博客文章包含以下字段：
- `id`: 文章唯一标识符
- `title`: 文章标题
- `excerpt`: 文章摘要
- `content`: 文章内容
- `author`: 作者
- `date`: 发布日期
- `tags`: 标签数组
- `readTime`: 阅读时长
- `imageUrl`: 封面图片URL

## 安装与运行

### 环境要求

- Node.js (推荐最新LTS版本)
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
```

启动后，可以通过 http://localhost:5173 访问开发服务器。

### 构建项目

```bash
npm run build
# 或
yarn build
```

构建产物将生成在 `dist` 目录中，可以部署到GitHub Pages或其他静态网站托管服务。

### 预览构建

```bash
npm run preview
# 或
yarn preview
```

预览构建后的网站效果。

## 代码规范

项目使用ESLint进行代码规范检查：

```bash
npm run lint
# 或
yarn lint
```

## 📝 部署注意事项

1. **base路径配置**：确保`vite.config.ts`中的`base`设置为`'/blog/'`
2. **GitHub Actions权限**：确保仓库有正确的Actions权限设置
3. **目标仓库**：确保`wjf5673.github.io`仓库存在并可访问

## 许可证

该项目仅供个人学习和使用。

---

感谢访问本博客项目！如有任何问题或建议，欢迎提出。