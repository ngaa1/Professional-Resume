import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    // Polyfill process.env for local development to prevent "process is not defined" errors
    'process.env': {}
  }
})