# OpenEI 具身智能开源社区官网

## Auto-deployment Status
This project is configured for automatic deployment from GitHub to Vercel.

## 项目简介

OpenEI具身智能开源社区官网是一个展示具身智能技术、汇聚创新者和生态伙伴的综合性平台。网站旨在为具身智能创业者提供技术资源、经验分享和合作机会，推动具身智能技术的产业化应用。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **路由管理**: React Router DOM
- **开发语言**: TypeScript

## 项目结构

```
openei-website/
├── public/                 # 静态资源目录
│   ├── images/            # 图片资源
│   ├── icons/             # 图标文件
│   └── favicon.svg        # 网站图标
├── src/                   # 源代码目录
│   ├── components/        # 可复用组件
│   │   ├── Header/        # 头部导航组件
│   │   ├── Footer/        # 底部组件
│   │   ├── Hero/          # 首页Hero区域组件
│   │   └── PartnerGrid/   # 合作伙伴网格组件
│   ├── pages/             # 页面组件
│   │   ├── Home/          # 首页
│   │   ├── Platform/      # 公共平台页面
│   │   ├── Projects/      # 开源项目页面
│   │   ├── Marketplace/   # 应用市场页面
│   │   ├── Guide/         # 使用指南页面
│   │   └── Partners/      # 生态伙伴页面
│   ├── styles/            # 样式文件
│   ├── utils/             # 工具函数
│   ├── types/             # TypeScript类型定义
│   ├── App.tsx            # 主应用组件
│   ├── main.tsx           # 应用入口文件
│   └── router.tsx         # 路由配置
├── package.json           # 项目依赖配置
├── vite.config.ts         # Vite配置文件
├── tailwind.config.js     # Tailwind CSS配置
├── tsconfig.json          # TypeScript配置
└── README.md              # 项目说明文档
```

## 功能特性

### 核心页面

1. **首页** - 品牌展示、核心理念介绍、导航入口
2. **公共平台** - 平台功能和服务介绍
3. **开源项目** - 开源项目展示和资源下载
4. **应用市场** - 应用案例和解决方案展示
5. **玩转OpenEI** - 使用指南和最佳实践
6. **生态伙伴** - 合作伙伴展示和介绍

### 设计特色

- 🎨 现代化深色主题设计
- 📱 完全响应式布局
- ⚡ 基于Vite的快速构建
- 🎯 TypeScript类型安全
- 🎪 流畅的动画效果
- 🔧 组件化架构设计

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0 或 pnpm >= 6.0.0

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看网站

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

### 预览生产版本

```bash
npm run preview
# 或
pnpm preview
```

## 部署方案

### 阿里云部署

项目支持部署到阿里云ECS，具体部署方案包括：

1. **环境准备**
   - 阿里云ECS实例（推荐2核4G配置）
   - Nginx Web服务器
   - SSL证书配置

2. **CDN加速**
   - 阿里云CDN服务
   - 静态资源缓存优化
   - HTTPS加速配置

3. **性能优化**
   - Gzip/Brotli压缩
   - 图片懒加载
   - 代码分割

## 开发指南

### 添加新页面

1. 在 `src/pages/` 目录下创建新的页面组件
2. 在 `src/router.tsx` 中添加路由配置
3. 在 `src/components/Header/Header.tsx` 中添加导航链接

### 样式开发

项目使用Tailwind CSS，支持：
- 原子化CSS类
- 响应式设计
- 深色主题
- 自定义颜色系统

### 类型定义

在 `src/types/index.ts` 中定义TypeScript类型，确保类型安全。

## 贡献指南

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系我们

- 官网：[https://openei.org](https://openei.org)
- 邮箱：contact@openei.org
- GitHub：[https://github.com/openei](https://github.com/openei)

---

© 2024 OpenEI具身智能开源社区. All rights reserved.
