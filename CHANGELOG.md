# Changelog

All notable changes to this project are documented here.
Format: `## [version] - date`

---

## [1.0.0] - 2026-04-05

**Quick Start preset panel / 快速开始预设面板**
- Added `QuickStartPanel`: after uploading, display 4 preset thumbnail previews (32px / 16px / 8px / 4px) before entering the custom control view
- 新增 `QuickStartPanel`：上传后展示 4 张预设缩略图，点击即进入自定义调整

**Brand & UX refinements / 品牌与细节优化**
- Renamed `FastPixelateImage` → `Fast Pixelate Image` across all files
- Header logo is now a `<a href="/">` link
- Removed "Custom" color palette option
- Grid overlay defaults to on
- 品牌名改为 `Fast Pixelate Image`；Logo 改为首页链接；删除自定义调色板；网格线默认开启

**Dark mode / 暗黑模式**
- `ThemeContext` with localStorage persistence + system preference detection; all components updated with `dark:` classes; moon/sun toggle in Header
- 新增暗黑模式，所有组件适配 `dark:` 样式，Header 增加切换按钮

**i18n expansion / 多语言扩展**
- Added Traditional Chinese (`zh-TW`) and Russian (`ru`); Header updated to 4 language buttons
- 新增繁体中文和俄语，语言切换改为 4 个按钮

**SEO InfoSection / SEO 内容区**
- New `InfoSection`: "What is Pixelate Image", 6 advantages, 5 FAQ — all 4 languages
- 新增 `InfoSection` 组件，含介绍、优势、FAQ，4 语言全部翻译

**Privacy Policy page (MPA) / 隐私政策页**
- New `privacy.html` MPA entry, `PrivacyPolicy.tsx`, dual Vite input, `_redirects` routing
- `_redirects` adds 301 redirect for `/privacy.html` → `/privacy` to prevent duplicate pages
- 新增隐私政策 MPA 页；`_redirects` 增加 301 防重复页面

**Domain & SEO / 域名与 SEO**
- Updated canonical, `robots.txt`, `sitemap.xml` to `fast-pixelate-image.com`
- Added `privacy` entry to sitemap; canonical tag added to `privacy.html`
- 全站域名更新；sitemap 新增 privacy 条目；privacy.html 补充 canonical

**Core pixelator features / 核心像素化功能**
- Canvas API + Web Worker pixelation; grid overlay; `commitOnRelease` sliders; manual number inputs; redesigned divider handle
- Canvas + Worker 像素化；网格叠层；松手触发渲染；滑块手动输入；分隔条手柄重设计

**Project bootstrap / 项目初始化**
- React 19 + TypeScript 5 + Vite 8 + Tailwind CSS 3; i18n (EN/ZH); AdSense placeholder slots
- 项目初始化，基础技术栈与广告占位
