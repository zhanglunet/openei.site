# OpenEI官网部署指南

## 项目构建

项目已成功构建，生成的静态文件位于 `dist/` 目录中。

```bash
npm run build
```

## 部署选项

### 1. Vercel部署（推荐）

项目已配置 `vercel.json`，支持一键部署到Vercel：

1. 安装Vercel CLI：`npm i -g vercel`
2. 在项目根目录运行：`vercel`
3. 按照提示完成部署

### 2. 阿里云ECS部署

#### 使用Docker部署

1. 构建Docker镜像：
```bash
docker build -t openei-website .
```

2. 运行容器：
```bash
docker run -d -p 80:80 --name openei-site openei-website
```

#### 直接部署

1. 将 `dist/` 目录上传到服务器
2. 配置Nginx（参考 `nginx.conf`）
3. 启动Nginx服务

### 3. 其他静态托管平台

- **Netlify**: 直接拖拽 `dist/` 文件夹到Netlify
- **GitHub Pages**: 推送到GitHub并启用Pages
- **阿里云OSS**: 上传到OSS并开启静态网站托管

## 性能优化建议

1. **CDN加速**: 使用阿里云CDN或其他CDN服务
2. **图片优化**: 使用WebP格式，启用懒加载
3. **缓存策略**: 配置适当的缓存头
4. **HTTPS**: 启用SSL证书

## 监控和维护

- 使用阿里云ARMS进行性能监控
- 配置日志收集和分析
- 定期备份网站文件
- 监控网站可用性和响应时间

## 域名配置

1. 购买域名并完成备案（中国大陆）
2. 配置DNS解析到服务器IP
3.