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

## 🔧 管理员功能

### 便签墙管理员模式

便签墙支持管理员模式，用于管理留言内容：

1. **开启方式**：
   - 访问便签墙页面
   - 连续点击页面顶部的"便签墙"标题3次
   - 成功进入管理员模式（无需密码）

2. **管理员权限**：
   - 删除不当留言

### 发布新闻/文章

系统支持发布和编辑新闻、文章功能：

#### 发布新内容

1. **访问方式**：
   - 直接访问路由：`/#publish`

2. **发布流程**：
   - 选择内容类型（新闻或文章）
   - 填写中英文标题、作者、摘要和类别
   - 在正文文本框中输入内容（支持HTML富文本格式）
   - 系统自动计算阅读时长
   - 点击"预览"查看内容效果
   - 确认无误后点击"发布"提交

#### 编辑已有内容

1. **访问方式**：
   - 直接访问路由：`/#publish?mode=edit`

2. **编辑流程**：
   - 在"内容ID"输入框中输入要编辑的内容ID
   - 点击"查询"按钮获取内容数据
   - 修改需要更新的字段
   - 点击"预览"查看修改后的效果
   - 确认无误后点击"更新"提交
   - 如需删除内容，查询成功后可点击"删除"按钮

3. **注意事项**：
   - 只有查询成功后才能进行更新或删除操作
   - 查询失败时会自动清空表单数据
   - 更新和删除操作都需要提供正确的内容ID

#### 正文格式说明

- 正文支持HTML富文本格式
- 可使用HTML标签进行格式化（如`<p>`、`<strong>`、`<em>`等）
- 如需从其他富文本编辑器复制内容，请确保包含完整的HTML标签
- 支持常见HTML标签：`<h1>`至`<h6>`、`<p>`、`<br>`、`<strong>`、`<em>`、`<ul>`、`<ol>`、`<li>`等

## 许可证

该项目仅供个人学习和使用。

---

感谢访问本博客项目！如有任何问题或建议，欢迎提出。