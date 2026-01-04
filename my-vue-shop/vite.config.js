// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://10.60.83.120:8080', 
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
      '/goodsimage': {
        target: 'http://10.60.83.120:8080',
        changeOrigin: true
      }
    }
  }
});
