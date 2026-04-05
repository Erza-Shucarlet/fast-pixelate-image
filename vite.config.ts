import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readFileSync } from 'fs'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'))

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
  plugins: [react()],
  worker: {
    // 使用 ES module 格式的 Worker（支持 import）
    format: 'es',
  },
  build: {
    rollupOptions: {
      input: {
        main:    resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
  },
})
