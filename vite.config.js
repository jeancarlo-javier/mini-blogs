import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import process from 'process'

dotenv.config()

export default defineConfig({
  plugins: [vuePlugin()],
  define: {
    'process.env': process.env
  }
})
