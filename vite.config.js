import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendUrl = process.env.VITE_API_BASE || 'https://busiback.onrender.com'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true
      }
    }
  }
})
