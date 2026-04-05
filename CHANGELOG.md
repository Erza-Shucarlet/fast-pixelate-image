# Changelog

All notable changes to this project are documented here.
Format: `[date] - description (EN)` / `[日期] - 描述（中文）`

---

## [2026-04-05] — Quick Start preset panel / 快速开始预设面板

**EN**
- Added `QuickStartPanel` component: after uploading an image, display 4 preset thumbnail previews (32px / 16px / 8px / 4px) before entering the custom control view
- Thumbnails are generated client-side using Canvas downscaling (no Worker needed) with `image-rendering: pixelated`
- Selecting a preset sets the pixel size, triggers the Worker, and transitions to the full ControlPanel + PreviewCanvas + DownloadButton view
- Re-uploading a new image resets the flow back to Quick Start
- Added `quickstart.*` i18n keys to all 4 locale files (EN / ZH / ZH-TW / RU)
- Reversed Quick Start card order to 32px → 16px → 8px → 4px

**中文**
- 新增 `QuickStartPanel` 组件：上传图片后先展示 4 张不同像素大小（32px / 16px / 8px / 4px）的预设缩略图，再进入自定义调整
- 缩略图通过 Canvas 降采样渲染，无需 Worker，速度快
- 点击预设卡片后自动设置像素大小、触发 Worker 渲染，并切换到完整控制面板
- 重新上传图片时自动回到快速开始阶段
- 为 4 个语言文件新增 `quickstart.*` 翻译键
- 快速开始卡片顺序调整为 32px → 16px → 8px → 4px

---

## [2026-04-05] — Brand rename & UX refinements / 品牌重命名与细节优化

**EN**
- Renamed brand from `FastPixelateImage` to `Fast Pixelate Image` across all files
- Header logo area is now a link (`<a href="/">`) that navigates back to the homepage
- Removed "Custom" color palette option and its color count slider
- Grid overlay now defaults to **on** (`showGrid` initial state: `true`)

**中文**
- 全项目将品牌名从 `FastPixelateImage` 改为 `Fast Pixelate Image`
- Header Logo 区域改为 `<a href="/">` 链接，点击可返回主页
- 删除调色板中的「自定义」选项及颜色数量滑块
- 网格线开关默认改为**开启**状态

---

## [2026-04-05] — Dark mode, i18n expansion, SEO content, Privacy Policy / 暗黑模式、多语言扩展、SEO 内容、隐私政策

**EN**
- **Dark mode**: Added `ThemeContext` (localStorage + system preference detection); all components updated with `dark:` Tailwind classes; moon/sun toggle button in Header
- **New languages**: Added Traditional Chinese (`zh-TW`) and Russian (`ru`) support; Header language switcher updated to 4 buttons (EN / 中 / 繁 / РУ)
- **SEO InfoSection**: New `InfoSection` component with "What is Pixelate Image", 6 advantages, and 5 FAQ items — all translated in 4 languages
- **Privacy Policy page** (MPA): New `privacy.html` entry, `PrivacyPolicy.tsx` component, `vite.config.ts` dual input, `public/_redirects` for Cloudflare Pages routing
- **Footer**: Privacy Policy link updated to `/privacy`; Contact link added (`mailto:shucarlet@gmail.com`)
- **Domain**: Updated `robots.txt`, `sitemap.xml`, and `index.html` canonical tag to `fast-pixelate-image.com`; added `/privacy` to sitemap

**中文**
- **暗黑模式**：新增 `ThemeContext`（localStorage 持久化 + 系统偏好检测），所有组件添加 `dark:` 样式，Header 增加月亮/太阳切换按钮
- **新增语言**：支持繁体中文（`zh-TW`）和俄语（`ru`），Header 语言按钮更新为 4 个（EN / 中 / 繁 / РУ）
- **SEO 内容区**：新增 `InfoSection` 组件，包含「什么是像素化」、6 条优势、5 条 FAQ，4 语言全部翻译
- **隐私政策页（MPA）**：新增 `privacy.html`、`PrivacyPolicy.tsx`、`vite.config.ts` 双入口配置、`public/_redirects` Cloudflare 路由规则
- **Footer**：隐私政策链接改为 `/privacy`，新增联系方式链接
- **域名**：`robots.txt`、`sitemap.xml`、`index.html` canonical 标签全部更新为 `fast-pixelate-image.com`，sitemap 新增 `/privacy` 条目

---

## [2026-04-05] — Core pixelator features / 核心像素化功能

**EN**
- Replaced brand name `PixelCraft` → `FastPixelateImage` across all files (7 occurrences)
- Removed Circle and Diamond shape options; Square only
- Added grid overlay toggle (preview) and "Export with grid lines" checkbox (download)
- Added manual number input to Pixel Size, Brightness, and Contrast sliders
- Brightness and Contrast use `commitOnRelease` mode — Worker only fires on mouse/touch release to avoid excessive re-renders
- Divider handle redesigned: purple gradient circle with double-arrow icon
- SEO: static `<h1>` and description in `<div id="root">` for crawlers; `robots.txt`; `sitemap.xml`; primary keyword set to `pixelate image`

**中文**
- 全项目品牌名从 `PixelCraft` 改为 `FastPixelateImage`（共 7 处）
- 删除圆形和菱形像素块形状，仅保留方形
- 新增网格线预览开关及「导出时包含网格线」勾选项
- 像素大小、亮度、对比度滑块新增手动数值输入框
- 亮度/对比度改为松开拖动时才触发 Worker（`commitOnRelease` 模式）
- 分隔条手柄重设计：紫色渐变圆形配双箭头图标
- SEO：`<div id="root">` 内嵌静态 H1 和描述供爬虫读取；新增 `robots.txt` 和 `sitemap.xml`；关键词定为 `pixelate image`

---

## [2026-04-04] — Project bootstrap / 项目初始化

**EN**
- Initialized project: React 19 + TypeScript 5 + Vite 8 + Tailwind CSS 3
- Implemented core pixelation via Canvas API + Web Worker with Transferable objects
- 3-column layout: left ad sidebar, main content, right ad sidebar
- `usePixelate` hook: load image → scale preview → Worker process → full-res download
- i18n with i18next: English and Simplified Chinese, browser language auto-detection
- AdSense placeholder slots: left/right sidebar (160×600), bottom banner (728×90)
- Color palettes: Original, Grayscale, 8-bit

**中文**
- 项目初始化：React 19 + TypeScript 5 + Vite 8 + Tailwind CSS 3
- 使用 Canvas API + Web Worker（Transferable objects）实现核心像素化算法
- 三栏布局：左广告栏 + 主内容区 + 右广告栏
- `usePixelate` hook：加载图片 → 缩放预览 → Worker 处理 → 全分辨率下载
- i18next 国际化：英文 + 简体中文，浏览器语言自动检测
- AdSense 占位广告槽：侧边栏（160×600）、底部横幅（728×90）
- 调色板：原色、灰度、8 位色
