# Fast Pixelate Image

**Free, instant, privacy-first image pixelation — runs entirely in your browser.**

🌐 [fast-pixelate-image.com](https://fast-pixelate-image.com)

![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)

---

## Features

- **Quick Start** — Upload a photo and instantly preview 4 preset pixel styles (32 / 16 / 8 / 4 px)
- **Custom Controls** — Fine-tune pixel size (2–64 px), color palette (Original / Grayscale / 8-bit), brightness, and contrast
- **Split Preview** — Drag the divider to compare original vs. pixelated side by side
- **Grid Overlay** — Toggle pixel grid lines in the preview; optionally include them in the export
- **Multiple Formats** — Download as PNG (lossless), JPEG, or WebP at full original resolution
- **100% Private** — All processing is done locally via Canvas API + Web Worker. Nothing is ever uploaded.
- **Dark Mode** — Follows system preference, with a manual toggle in the header
- **Multi-Language** — English, Simplified Chinese, Traditional Chinese, Russian
- **AdSense Ready** — Placeholder slots for left sidebar (160×600), right sidebar (160×600), and bottom banner (728×90)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5 |
| Build | Vite 8 (MPA dual entry) |
| Styling | Tailwind CSS 3 (`darkMode: 'class'`) |
| i18n | i18next + react-i18next + i18next-browser-languagedetector |
| Pixelation Engine | Canvas API + Web Worker |
| Deployment | Cloudflare Pages |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check + production build
npm run build

# Preview build output locally
npm run preview
```

---

## Project Structure

```
pixelcraft/
├── index.html                       # Main entry (static SEO H1 for crawlers)
├── privacy.html                     # Privacy policy MPA entry
├── vite.config.ts                   # MPA dual input + Worker config
├── tailwind.config.js
├── public/
│   ├── _redirects                   # Cloudflare Pages routing rules
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.tsx                     # Main entry, wraps ThemeProvider
    ├── privacy-main.tsx             # Privacy page entry
    ├── App.tsx                      # Page logic: Quick Start → Customize
    ├── context/ThemeContext.tsx     # Dark/light theme (localStorage)
    ├── hooks/usePixelate.ts         # Core hook: load / process / download
    ├── workers/pixelate.worker.ts   # Pixelation algorithm (Web Worker)
    ├── types/index.ts
    ├── components/
    │   ├── layout/                  # Header, Footer
    │   ├── ads/                     # AdSidebar, AdBanner (placeholders)
    │   ├── pixelator/
    │   │   ├── QuickStartPanel.tsx  # 4 preset thumbnail previews
    │   │   ├── UploadZone.tsx
    │   │   ├── ControlPanel.tsx
    │   │   ├── PreviewCanvas.tsx    # Split-view comparison + grid overlay
    │   │   └── DownloadButton.tsx
    │   ├── InfoSection.tsx          # SEO content: What is / Advantages / FAQ
    │   └── PrivacyPolicy.tsx
    └── i18n/locales/                # en / zh / zh-TW / ru
```

---

## Deploying to Cloudflare Pages

1. Push the repo to GitHub
2. Connect to Cloudflare Pages — **Build command**: `npm run build`, **Output**: `dist`
3. The `public/_redirects` file handles routing automatically:
   ```
   /privacy  /privacy.html  200
   /*        /index.html    200
   ```

---

## Activating Google AdSense

1. Uncomment the AdSense `<script>` in `index.html` and replace `ca-pub-XXXXXXXXXX`
2. In `AdSidebar.tsx` and `AdBanner.tsx`, replace the placeholder `<div>` with `<ins class="adsbygoogle">` tags
3. Fill in your `data-ad-slot` values

---

## Privacy

No images are ever uploaded or stored. All processing is done locally in the browser.
Full details: [Privacy Policy](https://fast-pixelate-image.com/privacy)

---

## License

MIT — Free to use, fork, and deploy.

---

## Contact

[shucarlet@gmail.com](mailto:shucarlet@gmail.com)
