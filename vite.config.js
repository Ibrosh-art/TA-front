import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // ⬅️ добавь импорт path
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ⬅️ настройка алиаса
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Ваш сервер
        changeOrigin: true,
      }
    }
  }
})
