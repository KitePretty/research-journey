// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 把 base 改成你的仓库名（前后都要斜杠）
export default defineConfig({
  plugins: [react()],
  base: '/research-journey/',
})
