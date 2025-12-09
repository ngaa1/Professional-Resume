
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { copyFileSync } from 'fs'
import { mkdirSync } from 'fs'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-pdf',
      buildEnd() {
        // Create doc directory in dist if it doesn't exist
        const distDocDir = resolve(__dirname, 'dist', 'doc')
        if (!existsSync(distDocDir)) {
          mkdirSync(distDocDir, { recursive: true })
        }
        
        // Copy PDF file
        const srcPdf = resolve(__dirname, 'doc', '简历.pdf')
        const distPdf = resolve(distDocDir, '简历.pdf')
        if (existsSync(srcPdf)) {
          copyFileSync(srcPdf, distPdf)
          console.log('Copied 简历.pdf to dist/doc/')
        }
      }
    }
  ],
  base: './',
  define: {
    // Polyfill process.env for local development to prevent "process is not defined" errors
    'process.env': {}
  }
})
