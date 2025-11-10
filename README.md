# 个人博客项目

这是一个使用现代前端技术栈构建的个人博客网站，项目代码托管在`blog`仓库，打包后的静态文件可部署到`wjf5673.github.io`域名进行访问。

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

## 部署说明

1. 构建项目：`npm run build`
2. 将`dist`目录中的内容上传到`wjf5673.github.io`仓库
3. 确保GitHub Pages已正确配置，指向主分支

## 代码规范

项目使用ESLint进行代码规范检查：

```bash
npm run lint
# 或
yarn lint
```

## 许可证

该项目仅供个人学习和使用。

---

感谢访问本博客项目！如有任何问题或建议，欢迎提出。
