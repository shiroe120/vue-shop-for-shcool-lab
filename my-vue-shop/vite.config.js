// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // 接口代理
      '/api': {
        target: 'http://10.60.83.120:8080', // 后端真实地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // /api/goods/list -> /goods/list
      },
      // 图片代理
      '/goodsimage': {
        target: 'http://10.60.83.120:8080',
        changeOrigin: true
      }
    }
  }
});
