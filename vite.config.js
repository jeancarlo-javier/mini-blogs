import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import process from 'process'

dotenv.config()

export default defineConfig({
  plugins: [vuePlugin()],
  define: {
    'process.env': {
      VITE_BACKEND_URL: {
        VITE_BACKEND_URL: JSON.stringify(process.env.VITE_BACKEND_URL)
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: `${process.env.VITE_BACKEND_URL}/`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
