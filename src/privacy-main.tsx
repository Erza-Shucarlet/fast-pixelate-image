import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { PrivacyPolicy } from './components/PrivacyPolicy'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <PrivacyPolicy />
    </ThemeProvider>
  </StrictMode>,
)
