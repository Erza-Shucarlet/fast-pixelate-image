import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index'  // 初始化 i18n（必须在 App 之前导入）
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
